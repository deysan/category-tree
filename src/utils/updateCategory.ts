import { doc, updateDoc } from 'firebase/firestore';

import { db } from '../config/firebase';
import { Category } from '../types';

export const updateCategory = async (category: Category) => {
  const categoryDocPath =
    category.parentPath !== 'categories'
      ? `${category.parentPath}/${category.id}`
      : `categories/${category.id}`;

  const categoryDocRef = doc(db, categoryDocPath);

  await updateDoc(categoryDocRef, {
    name: category.name,
  });
};
