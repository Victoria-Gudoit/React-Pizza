import React, {useEffect } from "react";

import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";

import { filterSelectors, filterActions } from "../redux/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchPizzas, productsPageSelectors } from "../redux/productsPageSlice";
import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  const categoryId = useSelector(filterSelectors.getCategoryId);

  const sortType = useSelector(filterSelectors.getSortType);

  const currentPage = useSelector(filterSelectors.getCurrentPage);

  const searchValue = useSelector(filterSelectors.getSearchValue);

  const items = useSelector(productsPageSelectors.getProducts);

  const isLoading = useSelector(productsPageSelectors.isLoading);
  const isError = useSelector(productsPageSelectors.isError);

  const dispatch = useDispatch();

  const onChangeCategory = (index: number) => dispatch(filterActions.setCategoryId(index));

  const onChangePage = (page: number) => {
    dispatch(filterActions.setCurrentPage(page));
  };

  useEffect(() => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch( //@ts-ignore
     fetchPizzas({ category, sortBy, order, currentPage, search }));

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
            : items.map((obj: any) => (
                <Link key={obj.id} to={`/pizza/${obj.id}`}>
                  <PizzaBlock {...obj} />
                </Link>
              ))}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
