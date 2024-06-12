export interface ResponseApiProject {
  ok: boolean;
  status: number;
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
