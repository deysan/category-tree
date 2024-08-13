import { useState } from 'react';

import {
  CheckCircleIcon,
  ChevronRightIcon,
  DocumentIcon,
  FolderIcon,
  FolderPlusIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';

import { useStore } from '../store/zustand';
import { Category } from '../types';
import { addCategory } from '../utils/addCategory';
import { deleteCategory } from '../utils/deteleCategory';
import { getAllCategories } from '../utils/getAllCategories';
import { updateCategory } from '../utils/updateCategory';

export function CategoryItem({
  category,
  parentPath = '',
}: {
  category: Category;
  parentPath?: string;
}) {
  const [isOpen, setOpen] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [categoryName, setCategoryName] = useState(category.name);

  const setCategories = useStore((state) => state.setCategories);

  const handleUpdateCategory = async () => {
    try {
      await updateCategory({ ...category, name: categoryName });

      const data = await getAllCategories();

      setCategories(data);
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await deleteCategory(category.id, parentPath);

      const data = await getAllCategories();

      setCategories(data);
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCategory = async () => {
    try {
      await addCategory(
        parentPath
          ? `${parentPath}/${category.id}`
          : `categories/${category.id}`
      );

      const data = await getAllCategories();

      setCategories(data);
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li key={category.id}>
      <span className="flex items-center gap-1.5 py-1 text-lg">
        {category.categories && category.categories.length > 0 && (
          <button onClick={() => setOpen(!isOpen)} className="p-1">
            <ChevronRightIcon
              className={`size-5 text-gray-500 ${isOpen ? 'rotate-90' : ''}`}
            />
          </button>
        )}

        {category.categories && category.categories.length > 0 ? (
          <FolderIcon
            className={`size-6 text-sky-500 ${
              category.categories.length === 0 ? 'ml-[22px]' : ''
            }`}
          />
        ) : (
          <DocumentIcon className="ml-[22px] size-6 text-gray-900" />
        )}

        {isEditing ? (
          <>
            <input
              type="text"
              value={categoryName}
              placeholder="Category name"
              onChange={(e) => setCategoryName(e.target.value)}
              className="outline-dotted outline-2 outline-gray-500 rounded-md p-0.5 -m-0.5"
            />

            <button onClick={handleUpdateCategory} className="p-1">
              <CheckCircleIcon className="size-6 text-green-700" />
            </button>

            <button onClick={handleAddCategory} className="p-1">
              <FolderPlusIcon className="size-6 text-gray-500" />
            </button>

            <button onClick={handleDeleteCategory} className="p-1">
              <TrashIcon className="size-6 text-red-700" />
            </button>
          </>
        ) : (
          <>
            {category.name}
            <button onClick={() => setEditing(true)} className="p-1">
              <PencilIcon className="size-6 text-gray-500" />
            </button>
          </>
        )}
      </span>

      {isOpen && (
        <ul className="pl-6">
          {category.categories?.map((category) => (
            <CategoryItem
              category={category}
              parentPath={category.parentPath}
              key={category.id}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
