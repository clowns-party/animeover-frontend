import { Card, Skeleton } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { FC } from "react";
import Router from "next/router";
import { useAnime } from "../../../bus/anime/hooks/useAnime";
import styles from "./animeList.module.scss";
import { AnimeList as AnimeListType } from "../../../bus/anime/types";

export const AnimeList: FC = () => {
  const { animeList } = useAnime();

  return (
    <div className={styles.anime_list_container}>
      {animeList?.length ? (
        <AnimeCards animeList={animeList} />
      ) : (
        <SkeletonCards />
      )}
    </div>
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

const AnimeCards: FC<{ animeList: AnimeListType }> = ({ animeList }) => {
  const animeClicked = (id: string) => {
    Router.push(`/anime/${id}`);
  };

  return (
    <>
      {animeList.map((el) => {
        return (
          // если не нужен див, изменить на React.Fragment
          <div key={el._id}>
            <Card
              onClick={() => animeClicked(el._id)}
              className={styles.card}
              size="small"
              hoverable
              cover={
                <img className={styles.anime} alt="anime" src={el.picture} />
              }
            >
              <Meta title={el.title} description={el.type} />
            </Card>
          </div>
        );
      })}
    </>
  );
};
