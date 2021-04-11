import React, { FC } from "react";
import styles from "./anime.module.scss";
import { useAnime } from "../../bus/anime/hooks/useAnime";
import { AnimeContainer } from "../animeContainer/AnimeContainer";

export const Anime: FC = () => {
  const { anime, isFetching, error } = useAnime();

  return (
    <AnimeContainer>
      <div className={styles.anime_container}>
        <div className={styles.info_container}>
          <div className={styles.picture_and_button}>
            <img
              className={styles.anime_picture}
              src={anime?.picture}
              alt="anime"
            />
            <span>button</span>
          </div>
          <div>
            <div className={styles.title}>{anime?.title}</div>
            <div className={styles.item}>
              Tags:{" "}
              <span className={styles.text}>{handlerArray(anime?.tags)}</span>
            </div>
            <div className={styles.item}>
              Type: <span className={styles.text}>{anime?.type}</span>
            </div>
            <div className={styles.item}>
              Year:{" "}
              <span className={styles.text}>{anime?.animeSeason?.year}</span>
            </div>
            <div className={styles.item}>
              Episodes: <span className={styles.text}>{anime?.episodes}</span>
            </div>
            <div className={styles.item}>
              Season:{" "}
              <span className={styles.text}>
                {anime?.animeSeason?.season === "UNDEFINED"
                  ? "Unknown"
                  : anime?.animeSeason?.season}
              </span>
            </div>
            <div className={styles.item}>
              Synonyms: <span className={styles.text}>{handlerArray(anime?.synonyms)}</span>
            </div>
            <div className={styles.item}>
              Status: <span className={styles.text}>{anime?.status}</span>
            </div>
          </div>
        </div>
        <div className={styles.star_container}>8.6</div>
      </div>
    </AnimeContainer>
  );
};

const handlerArray = (array) => {
  return array?.map(
    (el, index: number) =>
      index <= 5 && (
        <span className={styles.word} key={String(index)}>
          {el}
          {index === array.length - 1 || index <= 5 ? " " : ", "}
        </span>
      )
  );
};
