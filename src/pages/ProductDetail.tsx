import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProductBySlug } from "../lib/products";
import { useCart, type CartSelectedOption } from "../lib/cart";
import { formatBD, type Product } from "../lib/supabase";
import { productPhotosBySlug, quantityPresetsBySlug } from "../data/site";
import { Photo } from "../components/Photo";

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addLine } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [customNote, setCustomNote] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetchProductBySlug(slug).then((p) => {
      setProduct(p);
      setLoading(false);
      if (p) {
        const defaults: Record<string, string[]> = {};
        for (const group of p.product_option_groups) {
          if (group.selection_type === "single" && group.product_options.length > 0) {
            defaults[group.id] = [group.product_options[0].id];
          } else {
            defaults[group.id] = [];
          }
        }
        setSelections(defaults);
      }
    });
  }, [slug]);

  const image = product ? productPhotosBySlug[product.slug] : undefined;
  const presets = product ? quantityPresetsBySlug[product.slug] ?? [] : [];
  const isCustomBar = product?.slug === "chocolate-bars";

  const selectedOptionDetails: CartSelectedOption[] = useMemo(() => {
    if (!product) return [];
    const details: CartSelectedOption[] = [];
    for (const group of product.product_option_groups) {
      const chosenIds = selections[group.id] ?? [];
      for (const option of group.product_options) {
        if (chosenIds.includes(option.id)) {
          details.push({
            group: group.name,
            label: option.label,
            price_delta_bd: option.price_delta_bd,
          });
        }
      }
    }
    return details;
  }, [product, selections]);

  const unitPrice = useMemo(() => {
    if (!product) return 0;
    return (
      product.base_price_bd +
      selectedOptionDetails.reduce((sum, o) => sum + o.price_delta_bd, 0)
    );
  }, [product, selectedOptionDetails]);

  function toggleOption(groupId: string, optionId: string, selectionType: "single" | "multiple", max: number) {
    setSelections((current) => {
      const chosen = current[groupId] ?? [];
      if (selectionType === "single") {
        return { ...current, [groupId]: [optionId] };
      }
      if (chosen.includes(optionId)) {
        return { ...current, [groupId]: chosen.filter((id) => id !== optionId) };
      }
      if (chosen.length >= max) return current;
      return { ...current, [groupId]: [...chosen, optionId] };
    });
  }

  function handleAddToCart() {
    if (!product) return;

    const requiredButUnmet = product.product_option_groups.find(
      (group) => (selections[group.id]?.length ?? 0) < group.min_selections
    );
    if (requiredButUnmet) return;

    const options = [...selectedOptionDetails];
    if (isCustomBar && customNote.trim()) {
      options.push({ group: "Custom note", label: customNote.trim(), price_delta_bd: 0 });
    }

    addLine({
      productId: product.id,
      productName: product.name,
      unitLabel: product.unit_label,
      basePriceBd: product.base_price_bd,
      selectedOptions: options,
      quantity,
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2200);
    setQuantity(1);
  }

  if (loading) {
    return (
      <main id="main-content" className="section-shell section-pad">
        <p>Loading…</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main id="main-content" className="section-shell section-pad">
        <p className="eyebrow">Not found</p>
        <h1>We couldn't find that item.</h1>
        <Link className="button button-primary" to="/menu">
          Back to menu
        </Link>
      </main>
    );
  }

  return (
    <main id="main-content" className="product-detail section-shell section-pad">
      <Link className="text-link back-link" to="/menu">
        <span aria-hidden="true">←</span> Back to menu
      </Link>

      <div className={`product-detail-layout ${!image ? "no-photo" : ""}`}>
        {image ? (
          <div className="product-detail-photo">
            <Photo variant="bonbons" image={image} priority />
          </div>
        ) : null}

        <div className="product-detail-copy">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          {product.description ? <p className="product-detail-description">{product.description}</p> : null}
          <p className="product-detail-unit">Sold per {product.unit_label}</p>

          {product.product_option_groups.map((group) => (
            <fieldset className="option-group" key={group.id}>
              <legend>
                {group.name}
                {group.selection_type === "multiple" ? (
                  <span className="option-group-hint">
                    {" "}
                    (choose up to {group.max_selections})
                  </span>
                ) : null}
              </legend>
              <div className="option-choices">
                {group.product_options.map((option) => {
                  const checked = (selections[group.id] ?? []).includes(option.id);
                  return (
                    <label className={`option-chip ${checked ? "is-selected" : ""}`} key={option.id}>
                      <input
                        type={group.selection_type === "single" ? "radio" : "checkbox"}
                        name={group.id}
                        checked={checked}
                        onChange={() =>
                          toggleOption(group.id, option.id, group.selection_type, group.max_selections)
                        }
                      />
                      <span>{option.label}</span>
                      {option.price_delta_bd > 0 ? (
                        <span className="option-chip-delta">+{formatBD(option.price_delta_bd)}</span>
                      ) : null}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}

          {isCustomBar && (selections[product.product_option_groups[0]?.id]?.length
            ? product.product_option_groups[0]?.product_options.find(
                (o) => selections[product.product_option_groups[0].id]?.includes(o.id) && o.label.startsWith("Custom")
              )
            : false) ? (
            <label className="custom-note-field">
              <span>What should the custom bar include?</span>
              <textarea
                rows={2}
                placeholder="e.g. white chocolate shell with dried rose and pistachio"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
              />
            </label>
          ) : null}

          <div className="quantity-row">
            <span>Quantity</span>
            <div className="quantity-stepper">
              <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                −
              </button>
              <span>{quantity}</span>
              <button type="button" onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity">
                +
              </button>
            </div>
          </div>

          {presets.length > 0 ? (
            <div className="quantity-presets">
              {presets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  className={`quantity-preset-chip ${quantity === preset ? "is-selected" : ""}`}
                  onClick={() => setQuantity(preset)}
                >
                  {preset} pieces
                </button>
              ))}
              <span className="quantity-preset-custom-hint">or use +/− above for a custom box size</span>
            </div>
          ) : null}

          <div className="product-detail-price-row">
            <div>
              <span className="product-detail-price-label">Price</span>
              <strong className="product-detail-price">{formatBD(unitPrice * quantity)}</strong>
            </div>
            <button type="button" className="button button-primary" onClick={handleAddToCart}>
              {justAdded ? "Added ✓" : "Add to cart"}
            </button>
          </div>

          {justAdded ? (
            <p className="product-detail-added-note">
              Added to your cart.{" "}
              <button type="button" className="text-link" onClick={() => navigate("/cart")}>
                View cart <span aria-hidden="true">↗</span>
              </button>
            </p>
          ) : null}
        </div>
      </div>
    </main>
  );
}
