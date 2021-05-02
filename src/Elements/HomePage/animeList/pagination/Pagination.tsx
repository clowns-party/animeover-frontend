import React, { FC } from "react";
import { useDispatch } from "react-redux";
import styles from "./pagination.module.scss";

import { changePage } from "../../../../bus/anime/actions";

export const Pagination: FC<{
  pageLimit: number;
  totalPages: number;
  currentPage: number;
}> = ({ pageLimit, totalPages, currentPage }) => {
  const dispatch = useDispatch();
  // const pagesCount = totalPages / pageLimit;
  const pages = [];
  for (let i = 1; i <= 10; i += 1) {
    pages.push(i);
  }
  return (
    <div className={styles.pagination_container}>
      {pages?.map((el: number, index) => {
        return (
          // className={`${currentPage === el && styles.currentPage} ${
          //   styles.page
          // }`}
          <div
            className={styles.page}
            key={index.toString()}
            onClick={() => dispatch(changePage({ limit: pageLimit, page: el }))}
          >
            {el}
          </div>
        );
      })}
    </div>
  );
};
