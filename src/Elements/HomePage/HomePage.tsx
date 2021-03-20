import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAnimeList } from "../../bus/anime/actions";
import { useAnimelist } from "../../bus/anime/hooks/useAnimeList";
import styles from "./home.module.scss";

export const HomePage: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAnimeList());
  }, []);

  const { anime, isFetching, error } = useAnimelist();

  return (
    <div className={styles.container}>
      {anime?.length &&
        anime.map((el) => {
          return (
            <div>
              <img className={styles.list} src={el.picture} alt="sos" />
              <div>{el.title}</div>
            </div>
          );
        })}
    </div>
  );
};
