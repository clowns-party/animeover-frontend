import React, { FC, useState } from "react";
import { StarOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import styles from "./anime.module.scss";
import { useAnime } from "../../bus/anime/hooks/useAnime";
import { AnimeContainer } from "../animeContainer/AnimeContainer";
import { Anime as AnimeType } from "../../bus/anime/types";

export const Anime: FC = () => {
  const { anime, isFetching, error } = useAnime();

  // FINISHED, UPCOMING, UNKNOWN, CURRENTLY, UNDEFINED

  // добавить скелетон на страницу
  const [list, changeList] = useState(false);

  return (
    <AnimeContainer>
      <div className={styles.anime_container}>
        <div className={styles.info_container}>
          <div className={styles.picture_and_button}>
            {anime ? (
              <img
                className={styles.anime_picture}
                src={anime?.picture}
                alt="anime"
              />
            ) : (
              <Skeleton.Avatar
                active
                shape="square"
                style={{
                  width: 200,
                  height: 320,
                  borderRadius: 20,
                }}
              />
            )}
            <div className={styles.container_button}>
              {anime ? (
                <ButtonList list={list} changeList={changeList} />
              ) : (
                <Skeleton.Input
                  style={{ width: 200, height: 35, borderRadius: 22 }}
                  active
                />
              )}
            </div>
          </div>
          <div>{anime ? <TitleAnime anime={anime} /> : <TitleSkeleton />}</div>
        </div>
        <div className={styles.star_container}>
          {anime ? (
            <div className={styles.star}>
              <StarOutlined
                style={{ color: "#FFEC44", fontSize: 15, marginRight: 4 }}
              />
              8.6
            </div>
          ) : (
            <Skeleton.Input
              style={{ width: 68, height: 35, borderRadius: 22 }}
              active
            />
          )}
        </div>
      </div>
    </AnimeContainer>
  );
};

// как тут типизировать если по идее функция может принимать разные массивы
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

const TitleSkeleton: FC = () => {
  const stylesDescriprion = { width: 200, height: 27, borderRadius: 6 };
  return (
    <>
      <div className={styles.title}>
        <Skeleton.Input
          style={{ width: 300, height: 40, borderRadius: 6 }}
          active
        />
      </div>
      <div className={styles.item}>
        Tags: <Skeleton.Input style={stylesDescriprion} active />
      </div>
      <div className={styles.item}>
        Type: <Skeleton.Input style={stylesDescriprion} active />
      </div>
      <div className={styles.item}>
        Year: <Skeleton.Input style={stylesDescriprion} active />
      </div>
      <div className={styles.item}>
        Episodes: <Skeleton.Input style={stylesDescriprion} active />
      </div>
      <div className={styles.item}>
        Season: <Skeleton.Input style={stylesDescriprion} active />
      </div>
      <div className={styles.item}>
        Synonyms: <Skeleton.Input style={stylesDescriprion} active />
      </div>
      <div className={styles.item}>
        Status: <Skeleton.Input style={stylesDescriprion} active />
      </div>
    </>
  );
};

const TitleAnime: FC<{ anime: AnimeType }> = ({ anime }) => {
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

  return (
    <>
      <div className={styles.title}>{anime?.title}</div>
      <div className={styles.item}>
        Tags: <span className={styles.text}>{handlerArray(anime?.tags)}</span>
      </div>
      <div className={styles.item}>
        Type: <span className={styles.text}>{anime?.type}</span>
      </div>
      <div className={styles.item}>
        Year: <span className={styles.text}>{anime?.animeSeason?.year}</span>
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
        <span className={styles.text}>{handlerArray(anime?.synonyms)}</span>
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
    </>
  );
};

const ButtonList: FC<{
  list: boolean;
  changeList: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ list, changeList }) => {
  const closeButton = list && "close_button";

  return (
    <>
      <div className={styles.button} onClick={() => changeList(!list)}>
        <div className={`${styles.button_icon} ${styles[`${closeButton}`]}`}>
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
    </>
  );
};
