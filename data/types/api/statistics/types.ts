export interface ResponseApiStatistics {
  data?: {
    collection?: Array<statistics>;
    error: string;
    status: number;
  };
  ok: boolean;
  status: number;
}

export interface ResponseStatistics {
  collection?: Array<statistics>;
  error?: string;
  status?: number;
}

type statistics = {
  week: number;
  startWeight: number;
  endWeight: number;
  downWeight: number;
  sumKg: number;
  avgKg: number;
  sumKcal: number;
  training: Array<{
    data: Array<{
      type: string;
      currecnt: number;
      sumKcal: number;
      time: string;
    }>;
  }>;
  sumTime: string;
  createdUp: string;
  updateUp: string;
};
