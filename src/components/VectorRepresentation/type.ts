export interface Connection {
  pos: number;
  modelOutputs: {
    pos: number;
    ratOutputs: {
      pos: number[];
    };
  }[];
}
