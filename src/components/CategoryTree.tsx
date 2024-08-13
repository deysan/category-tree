import { PlusIcon } from '@heroicons/react/24/outline';

import { useStore } from '../store/zustand';
import { addCategory } from '../utils/addCategory';
import { getAllCategories } from '../utils/getAllCategories';
import { CategoryItem } from './CategoryItem';

export function CategoryTree() {
  const categories = useStore((state) => state.categories);
  const setCategories = useStore((state) => state.setCategories);

  const handleAddCategory = async () => {
    try {
      await addCategory();

      const data = await getAllCategories();

      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ul>
        {categories.map((category) => (
          <CategoryItem category={category} key={category.id} />
        ))}
      </ul>

      <hr />

      <div>
        <button
          onClick={handleAddCategory}
          className="flex gap-2 items-center text-lg text-blue-500 px-2"
        >
          <PlusIcon className="size-6" /> Add category
        </button>
      </div>
    </>
  );
}
