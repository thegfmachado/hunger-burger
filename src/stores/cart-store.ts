import { ProductProps } from "@/fixture/products";
import { create } from "zustand";

import { add } from "./helpers/cart-in-memory";

interface ProductCartProps extends ProductProps {
  quantity: number;
}

interface StateProps {
  products: ProductCartProps[];
  add: (product: ProductProps) => void;
}

const useCartStore = create<StateProps>((set) => ({
  products: [],
  add: (product: ProductProps) =>
    set((state) => ({
      products: add(state.products, product),
    })),
}));

export { useCartStore };

export type { ProductCartProps };
