import { useEffect, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase, type Order } from "../lib/supabase";

const ORDER_STATUSES: Order["order_status"][] = [
  "new",
  "confirmed",
  "preparing",
  "ready",
  "delivered",
  "cancelled",
];

export function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoadingSession(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  if (loadingSession) {
    return (
      <main id="main-content" className="admin-page">
        <p>Loading…</p>
      </main>
    );
  }

  return (
    <main id="main-content" className="admin-page">
      {session ? <OrderDashboard /> : <LoginForm />}
    </main>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setSubmitting(false);
    if (error) setError(error.message);
  }

  return (
    <div className="admin-login">
      <p className="eyebrow">Um Zainab Confectionery</p>
      <h1>Order dashboard</h1>
      <form onSubmit={handleSubmit} className="admin-login-form">
        <label>
          <span>Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error ? <p className="order-form-error">{error}</p> : null}
        <button type="submit" className="button button-primary" disabled={submitting}>
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

function OrderDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | Order["order_status"]>("all");

  async function loadOrders() {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setOrders(data as Order[]);
    setLoading(false);
  }

  useEffect(() => {
    loadOrders();
    const channel = supabase
      .channel("orders-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, () => {
        loadOrders();
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function updateOrder(id: string, patch: Partial<Order>) {
    setOrders((current) => current.map((o) => (o.id === id ? { ...o, ...patch } : o)));
    await supabase.from("orders").update(patch).eq("id", id);
  }

  const visibleOrders = filter === "all" ? orders : orders.filter((o) => o.order_status === filter);

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <div>
          <p className="eyebrow">Um Zainab Confectionery</p>
          <h1>Orders</h1>
        </div>
        <button
          type="button"
          className="text-link"
          onClick={() => supabase.auth.signOut()}
        >
          Sign out
        </button>
      </div>

      <div className="admin-filter-row">
        <button
          className={filter === "all" ? "is-active" : ""}
          onClick={() => setFilter("all")}
        >
          All ({orders.length})
        </button>
        {ORDER_STATUSES.map((status) => (
          <button
            key={status}
            className={filter === status ? "is-active" : ""}
            onClick={() => setFilter(status)}
          >
            {status} ({orders.filter((o) => o.order_status === status).length})
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading orders…</p>
      ) : visibleOrders.length === 0 ? (
        <p>No orders here yet.</p>
      ) : (
        <div className="admin-order-list">
          {visibleOrders.map((order) => (
            <article className="admin-order-card" key={order.id}>
              <div className="admin-order-top">
                <div>
                  <h3>{order.customer_name}</h3>
                  <p className="admin-order-meta">
                    {order.phone} · {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
                <span className={`admin-status-pill status-${order.order_status}`}>
                  {order.order_status}
                </span>
              </div>

              <dl className="admin-order-details">
                <div>
                  <dt>Items</dt>
                  <dd>{order.items_requested}</dd>
                </div>
                {order.occasion ? (
                  <div>
                    <dt>Occasion</dt>
                    <dd>{order.occasion}</dd>
                  </div>
                ) : null}
                {order.needed_by ? (
                  <div>
                    <dt>Needed by</dt>
                    <dd>{order.needed_by}</dd>
                  </div>
                ) : null}
                <div>
                  <dt>Fulfillment</dt>
                  <dd>
                    {order.delivery_method}
                    {order.delivery_address ? ` — ${order.delivery_address}` : ""}
                  </dd>
                </div>
                <div>
                  <dt>Payment</dt>
                  <dd>
                    {order.payment_method} ·{" "}
                    <span className={`payment-pill status-${order.payment_status}`}>
                      {order.payment_status}
                    </span>
                  </dd>
                </div>
                {order.notes ? (
                  <div>
                    <dt>Notes</dt>
                    <dd>{order.notes}</dd>
                  </div>
                ) : null}
              </dl>

              <div className="admin-order-actions">
                <label>
                  <span>Status</span>
                  <select
                    value={order.order_status}
                    onChange={(e) =>
                      updateOrder(order.id, {
                        order_status: e.target.value as Order["order_status"],
                      })
                    }
                  >
                    {ORDER_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Payment</span>
                  <select
                    value={order.payment_status}
                    onChange={(e) =>
                      updateOrder(order.id, {
                        payment_status: e.target.value as Order["payment_status"],
                      })
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                  </select>
                </label>
                <label>
                  <span>Quoted amount (BD)</span>
                  <input
                    type="number"
                    step="0.001"
                    defaultValue={order.quoted_amount_bd ?? ""}
                    onBlur={(e) =>
                      updateOrder(order.id, {
                        quoted_amount_bd: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                  />
                </label>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
