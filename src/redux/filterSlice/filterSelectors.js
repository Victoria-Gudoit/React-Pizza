const getFilterSlice = (state) => state.filter;

export const getCategoryId = (state) => getFilterSlice(state).categoryId;

export const getSortType = (state) => getFilterSlice(state).sort;
