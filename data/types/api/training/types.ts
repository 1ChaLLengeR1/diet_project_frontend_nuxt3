export interface ResponseApiTraining {
  data?: {
    collection?: Array<create>;
    error: string;
    status: number;
  };
  ok: boolean;
  status: number;
}

export interface ResponseTraining {
  collection?: Array<create>;
  error?: string;
  status?: number;
}

type create = {
  id: string;
  postId: string;
  type: string;
  time: string;
  kcal: number;
  createdUp: string;
  updateUp: string;
};
