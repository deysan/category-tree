import { create } from 'zustand';

import { Category } from '../types';

interface StoreState {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

export const useStore = create<StoreState>()((set) => ({
  categories: [],
  setCategories: (categories) =>
    set({
      categories: [...categories].sort(
        (a, b) => a.createdAt.seconds - b.createdAt.seconds
      ),
    }),
}));
