export interface ItemStatistics {
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
}
