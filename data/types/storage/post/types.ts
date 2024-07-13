export interface CollectionOnePost {
  collection: CollectionPost[];
  collectionTraining: collectionTraining[];
}

export interface CollectionPost {
  id: string;
  userId: string;
  projectId: string;
  day: number;
  weight: number;
  kcal: number;
  createdUp: string;
  updateUp: string;
}

export interface CreatePost {
  day: number;
  weight: number;
  kcal: number;
  collectionTraining?: Array<collectionTraining>;
}

export interface ChnagePost {
  day: number;
  weight: number;
  kcal: number;
  selectProject: string;
  collectionTraining?: Array<collectionTraining>;
  collectionTrainingChange?: Array<collectionTraining>;
  removeIds?: Array<string>;
}

export interface BodyCollectionPublicPost {
  userId: string;
  projectId: string;
  idLanguage: string;
  page: string;
}

export type collectionTraining = {
  id?: string;
  type: string;
  time: string;
  kcal: number;
};
