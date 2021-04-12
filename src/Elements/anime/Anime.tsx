import React, { FC, useState } from "react";
import { StarOutlined } from "@ant-design/icons";
import styles from "./anime.module.scss";
import { useAnime } from "../../bus/anime/hooks/useAnime";
import { AnimeContainer } from "../animeContainer/AnimeContainer";

export const Anime: FC = () => {
  const { anime, isFetching, error } = useAnime();

  // FINISHED, UPCOMING, UNKNOWN, CURRENTLY, UNDEFINED
  const statusColor = (type: string) => {
    switch (type) {
      case "FINISHED":
        return "green";
      case "UPCOMING":
        return "orange";
      case "CURRENTLY":
        return "blue";
      default:
        return "grey";
    }
  };

  // добавить скелетон на страницу
  const [list, chagenLIst] = useState(false);

  const closeButton = list && "close_button";

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
            <div className={styles.container_button}>
              <div className={styles.button} onClick={() => chagenLIst(!list)}>
                <div
                  className={`${styles.button_icon} ${
                    styles[`${closeButton}`]
                  }`}
                >
                  <span />
                  <span />
                </div>
                {!list && <div className={styles.button_text}>Add To List</div>}
              </div>
              {list && (
                <div className={styles.container_buttons}>
                  <div className={styles.button}>Planned</div>
                  <div className={styles.button}>Watching</div>
                  <div className={styles.button}>Viewed</div>
                </div>
              )}
            </div>
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
              Synonyms:{" "}
              <span className={styles.text}>
                {handlerArray(anime?.synonyms)}
              </span>
            </div>
            <div className={styles.item}>
              Status:{" "}
              <span
                className={` ${styles.item_text} ${
                  styles[`${statusColor(anime?.status)}`]
                }`}
              >
                {anime?.status}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.star_container}>
          <div className={styles.star}>
            <StarOutlined
              style={{ color: "#FFEC44", fontSize: "15px", marginRight: "4px" }}
            />
            8.6
          </div>
        </div>
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
