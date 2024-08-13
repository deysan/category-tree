import { useEffect, useState } from 'react';

import { ChartBarSquareIcon } from '@heroicons/react/24/outline';

import { Category } from './types';
import { getAllCategories } from './utils/getAllCategories';
import { CategoryTree } from './components/CategoryTree';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    try {
      setLoading(true);
      const categories = await getAllCategories();
      setCategories(categories);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <main className="flex flex-col gap-2">
      <h1 className="flex gap-2 text-3xl font-bold">
        Category Tree <ChartBarSquareIcon className="size-6" />
      </h1>

      {loading ? (
        <div className="animate-spin rounded-full size-6 border-t-2 border-b-2" />
      ) : (
        <CategoryTree categories={categories} />
      )}
    </main>
  );
}
