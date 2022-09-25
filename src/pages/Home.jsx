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

export const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const categoryId = useSelector(filterSelectors.getCategoryId);

  const sortType = useSelector((state) => state.filter.sort.sortProperty);

  const currentPage = useSelector(filterSelectors.getCurrentPage);

  const dispatch = useDispatch();

  const onChangeCategory = (id) => dispatch(filterActions.setCategoryId(id));

  const onChangePage = (number) => {
    dispatch(filterActions.setCurrentPage(number));
  };

  const { searchValue } = React.useContext(SearchContext);

  useEffect(() => {
    setIsLoading(true);
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const search = searchValue ? `&search=${searchValue}` : "";

    axios
      .get(
        `https://6328dc1dd2c97d8c525e3c1f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
