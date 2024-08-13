import { Category } from '../types';
import { CategoryItem } from './CategoryItem';

export function CategoryTree({ categories }: { categories: Category[] }) {
  return (
    <ul>
      {categories.map((category) => (
        <CategoryItem category={category} key={category.name} />
      ))}
    </ul>
  );
}
