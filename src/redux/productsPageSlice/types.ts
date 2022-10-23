export type Pizza = {
  id: string;
  title: string;
  imageUrl: string;
  sizes: number[];
  price: number;
  types: number[];
};

export enum Status {
  LOADING = "LOADING",
  LOADED = "LOADED",
  ERROR = "ERROR",
  UNKNOWN = "UNKNOWN",
}

export interface PizzaSliceState {
  items: Pizza[];
  loadStatus: Status;
}
