import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

export const addCategory = async (parentPath: string = '') => {
  const collectionPath = parentPath ? `${parentPath}/categories` : 'categories';

  await addDoc(collection(db, collectionPath), {
    name: 'New category',
    createdAt: serverTimestamp(),
  });
};
