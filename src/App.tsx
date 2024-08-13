import { useCallback, useEffect, useState } from 'react';

import { ChartBarSquareIcon } from '@heroicons/react/24/outline';

import { CategoryTree } from './components/CategoryTree';
import { useStore } from './store/zustand';
import { getAllCategories } from './utils/getAllCategories';

export default function App() {
  const setCategories = useStore((state) => state.setCategories);

  const [isLoading, setLoading] = useState(false);

  const getCategories = useCallback(async () => {
    try {
      setLoading(true);

      const categories = await getAllCategories();

      setCategories(categories);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setCategories]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <main className="flex flex-col gap-2">
      <h1 className="flex gap-2 text-3xl font-bold">
        Category Tree <ChartBarSquareIcon className="size-6" />
      </h1>

      {isLoading ? (
        <div className="animate-spin rounded-full size-6 border-t-2 border-b-2" />
      ) : (
        <CategoryTree />
      )}
    </main>
  );
}
