import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { ProductProps } from "@/fixture/products";

import { add, remove } from "./helpers/cart-in-memory";

interface ProductCartProps extends ProductProps {
  quantity: number;
}

interface StateProps {
  products: ProductCartProps[];
  add: (product: ProductProps) => void;
  clear: () => void;
  remove: (id: string) => void;
}

const useCartStore = create(
  persist<StateProps>((set) => ({
    products: [],
    add: (product: ProductProps) =>
      set((state) => ({
        products: add(state.products, product),
      })),

    remove: (id: string) =>
      set((state) => ({
        products: remove(state.products, id),
      })),

    clear: () =>
      set(() => ({
        products: [],
      })),
  }), {
    name: "hunger-burger:cart",
    storage: createJSONStorage(() => AsyncStorage),
  })
);

export { useCartStore };

export type { ProductCartProps };
