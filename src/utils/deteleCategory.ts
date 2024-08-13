import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';

import { db } from '../config/firebase';

export const deleteCategory = async (
  categoryId: string,
  parentPath?: string
) => {
  const categoryDocPath = parentPath
    ? `${parentPath}/${categoryId}`
    : `categories/${categoryId}`;

  const subcategoriesCollection = collection(
    db,
    `${categoryDocPath}/categories`
  );
  const subcategoriesSnapshot = await getDocs(subcategoriesCollection);

  for (const subcategoryDoc of subcategoriesSnapshot.docs) {
    await deleteCategory(subcategoryDoc.id, `${categoryDocPath}`);
  }

  const categoryDocRef = doc(db, categoryDocPath);
  await deleteDoc(categoryDocRef);
};
