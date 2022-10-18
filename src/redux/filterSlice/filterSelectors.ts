import { RootState } from "../store";

const getFilterSlice = (state: RootState) => state.filter;

export const getCategoryId = (state: RootState) => getFilterSlice(state).categoryId;

export const getSortType = (state: RootState) => getFilterSlice(state).sort;

export const getCurrentPage = (state: RootState) => getFilterSlice(state).currentPage;

export const getSearchValue = (state: RootState) => getFilterSlice(state).searchValue;
