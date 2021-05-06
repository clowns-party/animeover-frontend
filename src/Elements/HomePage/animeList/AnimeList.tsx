import { Card, Skeleton } from "antd";
import React, { FC } from "react";
import { useAnime } from "../../../bus/anime/hooks/useAnime";
import styles from "./animeList.module.scss";
import { Pagination } from "./pagination/Pagination";
import { InfiniteScroll } from "./InfiniteScroll";

export const AnimeList: FC = () => {
  const { animeList, pageLimit, totalPages, currentPage } = useAnime();

  return (
    <>
      {animeList?.length ? (
        <InfiniteScroll />
      ) : (
        <div className={styles.anime_list_container}>
          <SkeletonCards />
        </div>
      )}
    </>
  );
};

const SkeletonCards = () => {
  const fakeArray = Array.from(Array(10).keys());

  return (
    <>
      {fakeArray.map((el) => {
        return (
          <Card
            className={styles.card}
            key={el}
            size="small"
            hoverable
            cover={
              <Skeleton.Avatar
                active
                style={{ width: 200, height: 250 }}
                shape="square"
              />
            }
          >
            <Skeleton.Input
              active
              style={{ width: 174, height: 25, borderRadius: 6 }}
            />
            <Skeleton.Input
              active
              style={{ width: 40, height: 25, borderRadius: 6, marginTop: 4 }}
            />
          </Card>
        );
      })}
    </>
  );
};
