export interface ResponseApiProject {
  data?: {
    collection?: Array<{
      id: string;
      userId: string;
      ikdLanguage: string;
      title: string;
      description: string;
      createdUp: string;
      updateUp: string;
    }>;
    collectionRemoveId?: Array<string>;
    pagination?: {
      nextPage: number;
      previousPage: number;
      currentPage: number;
      totalPages: number;
      twoAfter: number;
      twoBelow: number;
      offset: number;
    };
    error: string;
    status: number;
  };
  ok: boolean;
  status: number;
}

export interface ResponseProject {
  collection?: Array<{
    id: string;
    userId: string;
    ikdLanguage: string;
    title: string;
    description: string;
    createdUp: string;
    updateUp: string;
  }>;
  collectionRemoveId?: Array<string>;
  pagination?: {
    nextPage: number;
    previousPage: number;
    currentPage: number;
    totalPages: number;
    twoAfter: number;
    twoBelow: number;
    offset: number;
  };
  error?: string;
  status?: number;
}
