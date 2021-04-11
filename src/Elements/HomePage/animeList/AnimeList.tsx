import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { FC } from "react";
import Router from "next/router";
import { useAnime } from "../../../bus/anime/hooks/useAnime";
import styles from "./animeList.module.scss";

export const AnimeList: FC = () => {
  const { animeList, ongoing, isFetching, error } = useAnime();

  const cardCliked = (id: string) => {
    Router.push(`/anime/${id}`);
  };

  return (
    <div className={styles.anime_list_container}>
      {animeList?.length &&
        animeList.map((el) => {
          return (
            // если не нужен див, изменить на React.Fragment
            <div key={el._id}>
              <Card
                onClick={() => cardCliked(el._id)}
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
    </div>
  );
};
