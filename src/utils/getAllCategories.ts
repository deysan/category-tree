import { collection, getDocs } from 'firebase/firestore';

import { Category } from '../types';
import { db } from '../config/firebase';

export const getAllCategories = async (
  parentPath: string = ''
): Promise<Category[]> => {
  const collectionPath = parentPath ? `${parentPath}/categories` : 'categories';

  const categoriesCollection = collection(db, collectionPath);
  const categorySnapshots = await getDocs(categoriesCollection);

  const categories: Category[] = [];

  for (const doc of categorySnapshots.docs) {
    const category = doc.data() as Category;
    category.categories = await getAllCategories(`${collectionPath}/${doc.id}`);
    categories.push({
      ...category,
      id: doc.id,
      parentPath: collectionPath,
    });
  }

  return categories;
};
