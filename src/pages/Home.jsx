import React, { useState, useEffect } from "react";
import axios from "axios";

import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Pagination } from "components/Pagination";
import { SearchContext } from "App";

import { filterSelectors, filterActions } from "redux/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchPizzas, productsPageSelectors } from "redux/productsPageSlice";

export const Home = () => {
  const categoryId = useSelector(filterSelectors.getCategoryId);

  const sortType = useSelector((state) => state.filter.sort.sortProperty);

  const currentPage = useSelector(filterSelectors.getCurrentPage);

  const items = useSelector(productsPageSelectors.getProducts);

  const isLoading = useSelector(productsPageSelectors.isLoading);
  const isError = useSelector(productsPageSelectors.isError);

  const dispatch = useDispatch();

  const onChangeCategory = (id) => dispatch(filterActions.setCategoryId(id));

  const onChangePage = (number) => {
    dispatch(filterActions.setCurrentPage(number));
  };

  const { searchValue } = React.useContext(SearchContext);

  useEffect(() => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(fetchPizzas({ category, sortBy, order, search, currentPage }));

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {isError ? (
        <div>
          <h2>Ой, попробуйте позже</h2>
        </div>
      ) : (
        <div className="content__items">
          {isLoading
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
