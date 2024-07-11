export interface CreateTraining {
  trainingCollection: Array<training>;
}

export interface RemoveTraining {
  removeIds: Array<string>;
}

export type training = {
  id?: string;
  type: string;
  time: string;
  kcal: number;
};
