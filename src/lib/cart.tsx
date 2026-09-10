import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { MINIMUM_ORDER_BD } from "./supabase";

export type CartSelectedOption = {
  group: string;
  label: string;
  price_delta_bd: number;
};

export type CartLine = {
  lineId: string;
  productId: string;
  productName: string;
  unitLabel: string;
  basePriceBd: number;
  selectedOptions: CartSelectedOption[];
  quantity: number;
};

const STORAGE_KEY = "uzc-cart-v1";

function unitPrice(line: Pick<CartLine, "basePriceBd" | "selectedOptions">): number {
  return (
    line.basePriceBd + line.selectedOptions.reduce((sum, o) => sum + o.price_delta_bd, 0)
  );
}

function lineTotal(line: CartLine): number {
  return unitPrice(line) * line.quantity;
}

function makeLineId(productId: string, options: CartSelectedOption[]): string {
  const key = options
    .map((o) => o.label)
    .sort()
    .join("|");
  return `${productId}::${key}::${Date.now()}::${Math.random().toString(36).slice(2, 7)}`;
}

type CartContextValue = {
  lines: CartLine[];
  addLine: (line: Omit<CartLine, "lineId">) => void;
  removeLine: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
  meetsMinimum: boolean;
  amountToMinimum: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartLine[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // storage unavailable — cart just won't persist across reloads
    }
  }, [lines]);

  function addLine(line: Omit<CartLine, "lineId">) {
    setLines((current) => [...current, { ...line, lineId: makeLineId(line.productId, line.selectedOptions) }]);
  }

  function removeLine(lineId: string) {
    setLines((current) => current.filter((l) => l.lineId !== lineId));
  }

  function updateQuantity(lineId: string, quantity: number) {
    if (quantity <= 0) {
      removeLine(lineId);
      return;
    }
    setLines((current) => current.map((l) => (l.lineId === lineId ? { ...l, quantity } : l)));
  }

  function clearCart() {
    setLines([]);
  }

  const subtotal = useMemo(() => lines.reduce((sum, l) => sum + lineTotal(l), 0), [lines]);
  const itemCount = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);
  const meetsMinimum = subtotal >= MINIMUM_ORDER_BD;
  const amountToMinimum = Math.max(0, MINIMUM_ORDER_BD - subtotal);

  return (
    <CartContext.Provider
      value={{
        lines,
        addLine,
        removeLine,
        updateQuantity,
        clearCart,
        subtotal,
        itemCount,
        meetsMinimum,
        amountToMinimum,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

export { unitPrice as cartLineUnitPrice, lineTotal as cartLineTotal };
