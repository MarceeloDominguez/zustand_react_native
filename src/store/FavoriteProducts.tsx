import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type State = {
  productFavorite: number[];
};

type Actions = {
  addFavoriteProducts: (id: number) => void;
  removeFavoriteProducts: (id: number) => void;
};

export const useFavoriteProductsStore = create(
  persist<State & Actions>(
    (set) => ({
      productFavorite: [],
      addFavoriteProducts: (id: number) =>
        set((state) => ({ productFavorite: [...state.productFavorite, id] })),
      removeFavoriteProducts: (id: number) =>
        set((state) => ({
          productFavorite: state.productFavorite.filter((item) => item !== id),
        })),
    }),
    { name: "product-favorite", storage: createJSONStorage(() => AsyncStorage) }
  )
);
