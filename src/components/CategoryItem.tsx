import { useState } from 'react';

import { ChevronRightIcon } from '@heroicons/react/16/solid';
import { DocumentIcon, FolderIcon } from '@heroicons/react/24/solid';

import { Category } from '../types';

export function CategoryItem({ category }: { category: Category }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li key={category.name}>
      <span className="flex items-center gap-1.5 py-1 text-lg">
        {category.categories && category.categories.length > 0 && (
          <button onClick={() => setIsOpen(!isOpen)} className="p-1 -m-1">
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
        {category.name}
      </span>

      {isOpen && (
        <ul className="pl-6">
          {category.categories?.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </ul>
      )}
    </li>
  );
}
