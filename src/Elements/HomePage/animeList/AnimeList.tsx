import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { FC } from "react";
import { useAnimelist } from "../../../bus/anime/hooks/useAnimeList";
import styles from "./animeList.module.scss";

export const AnimeList: FC = () => {
  const { anime, ongoing, isFetching, error } = useAnimelist();

  return (
    <div className={styles.anime_list_container}>
      {anime?.length &&
        anime.map((el) => {
          return (
            // если не нужен див, изменить на React.Fragment
            <div key={el._id}>
              <Card
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
