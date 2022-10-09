import {
  getIsLoadingSeletor,
  getIsLoadedSeletor,
  getIsErrorSeletor,
} from "../common/utils";

const getProductsPage = (state) => state.products;

export const getProducts = (state) => getProductsPage(state).items;

export const getLoadStatus = (state) => state.products.loadStatus;

export const isLoading = getIsLoadingSeletor(getLoadStatus);
export const isLoaded = getIsLoadedSeletor(getLoadStatus);
export const isError = getIsErrorSeletor(getLoadStatus);
