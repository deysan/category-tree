import { Timestamp } from 'firebase/firestore';

export type Category = {
  id: string;
  name: string;
  categories?: Category[];
  parentPath: string;
  createdAt: Timestamp;
};
