import { ChartBarSquareIcon } from '@heroicons/react/24/outline';

import { CategoryTree } from './components/CategoryTree';
import { Category } from './types';

const categories: Category[] = [
  {
    name: 'Home',
    categories: [
      {
        name: 'Movies',
        categories: [
          {
            name: 'Action',
            categories: [
              {
                name: '2000s',
                categories: [
                  { name: 'Gladiator.mp4' },
                  { name: 'The-Dark-Knight.mp4' },
                ],
              },
              { name: '2010s', categories: [] },
            ],
          },
          {
            name: 'Comedy',
            categories: [
              { name: '2000s', categories: [{ name: 'Superbad.mp4' }] },
            ],
          },
          {
            name: 'Drama',
            categories: [
              { name: '2000s', categories: [{ name: 'American-Beauty.mp4' }] },
            ],
          },
        ],
      },
      {
        name: 'Music',
        categories: [
          { name: 'Rock', categories: [] },
          { name: 'Classical', categories: [] },
        ],
      },
      { name: 'Pictures', categories: [] },
      {
        name: 'Documents',
        categories: [],
      },
      { name: 'passwords.txt' },
    ],
  },
];

export default function App() {
  return (
    <main className="flex flex-col gap-2">
      <h1 className="flex gap-2 text-3xl font-bold">
        Category Tree <ChartBarSquareIcon className="size-6" />
      </h1>

      <CategoryTree categories={categories} />
    </main>
  );
}
