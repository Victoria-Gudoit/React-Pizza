import {
  getIsLoadingSeletor,
  getIsLoadedSeletor,
  getIsErrorSeletor,
} from "../common/utils";
import { RootState } from "../store";

const getProductsPage = (state: RootState) => state.products;

export const getProducts = (state: RootState) => getProductsPage(state).items;

export const getLoadStatus = (state: RootState) => state.products.loadStatus;

export const isLoading = getIsLoadingSeletor(getLoadStatus);
export const isLoaded = getIsLoadedSeletor(getLoadStatus);
export const isError = getIsErrorSeletor(getLoadStatus);
