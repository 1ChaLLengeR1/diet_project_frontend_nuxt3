export interface ResponseApiPost {
  data?: {
    collection?: Array<collection>;
    collectionTraining?: Array<collectionTraining>;
    pagination?: pagination;
    error: string;
    status: number;
  };
  ok: boolean;
  status: number;
}

export interface ResponsePost {
  collection?: Array<collection>;
  collectionTraining?: Array<collectionTraining>;
  pagination?: pagination;
  error?: string;
  status?: number;
}

type collection = {
  id: string;
  userId: string;
  projectId: string;
  day: number;
  weight: number;
  kcal: number;
  createdUp: string;
  updateUp: string;
};

type collectionTraining = {
  id: string;
  postId: string;
  type: string;
  time: string;
  kcal: number;
  createdUp: string;
  updateUp: string;
};

type pagination = {
  nextPage: number;
  previousPage: number;
  currentPage: number;
  totalPages: number;
  twoAfter: number;
  twoBelow: number;
  offset: number;
};
