import React from "react";
import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { AnimeList } from "bus/anime/types";
import { Router } from "next/router";
import { FC } from "react";
import styles from "./animeList.module.scss";

export const AnimeCards: FC<{ animeList: AnimeList }> = ({ animeList }) => {
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
