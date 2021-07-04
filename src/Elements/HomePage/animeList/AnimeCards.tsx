import React, { FC } from "react";
import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { AnimeList } from "bus/anime/types";
import Router from "next/router";
import Picture from "Elements/picture";
import styles from "./animeList.module.scss";

export const AnimeCards: FC<{ animeList: AnimeList }> = ({ animeList }) => {
  const animeClicked = (id: string) => {
    Router.push(`/anime/${id}`);
  };

  return (
    <>
      {animeList?.length &&
        animeList.map((el) => {
          return (
            // если не нужен див, изменить на React.Fragment
            <div key={el._id}>
              <Card
                onClick={() => animeClicked(el._id)}
                className={styles.card}
                size="small"
                hoverable
                cover={
                  <Picture
                    className={styles.anime}
                    alt="anime"
                    url={el.picture}
                  />
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
