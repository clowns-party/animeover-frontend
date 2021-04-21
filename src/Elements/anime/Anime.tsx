import React, { FC, useState } from "react";
import { StarOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import styles from "./anime.module.scss";
import { useAnime } from "../../bus/anime/hooks/useAnime";
import { AnimeContainer } from "../animeContainer/AnimeContainer";
import { Anime as AnimeType } from "../../bus/anime/types";
import { imgFormatter } from "../../utils/imgFormatter";
import { avatarSize, formatTags } from "./anime.functions";

export const Anime: FC = () => {
  const { anime, isFetching, error } = useAnime();

  // FINISHED, UPCOMING, UNKNOWN, CURRENTLY, UNDEFINED
  const [list, changeList] = useState(false);
  const animePicture = anime && imgFormatter(anime?.picture);

  return (
    <AnimeContainer>
      <div className={styles.anime_container}>
        <div className={styles.info_container}>
          <div className={styles.picture_and_button}>
            {!isFetching ? (
              <img
                className={styles.anime_picture}
                src={animePicture}
                alt={anime?.title || "anime"}
              />
            ) : (
              <Skeleton.Avatar active shape="square" style={avatarSize()} />
            )}
            {!isFetching ? (
              <ButtonList list={list} changeList={changeList} />
            ) : (
              <div className={styles.container_button_skeleton}>
                <Skeleton.Input className={styles.skeleton_button} active />
              </div>
            )}
          </div>
          <div>
            {!isFetching ? <TitleAnime anime={anime} /> : <TitleSkeleton />}
          </div>
        </div>
        <div className={styles.star_container}>
          {!isFetching ? (
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

const TitleSkeleton: FC = () => {
  return (
    <>
      <div className={styles.title}>
        <Skeleton.Input className={styles.skeleton_title} active />
      </div>
      <div className={styles.item}>
        Tags: <Skeleton.Input className={styles.skeleton_element} active />
      </div>
      <div className={styles.item}>
        Type: <Skeleton.Input className={styles.skeleton_element} active />
      </div>
      <div className={styles.item}>
        Year: <Skeleton.Input className={styles.skeleton_element} active />
      </div>
      <div className={styles.item}>
        Episodes: <Skeleton.Input className={styles.skeleton_element} active />
      </div>
      <div className={styles.item}>
        Season: <Skeleton.Input className={styles.skeleton_element} active />
      </div>
      <div className={styles.item}>
        Synonyms: <Skeleton.Input className={styles.skeleton_element} active />
      </div>
      <div className={styles.item}>
        Status: <Skeleton.Input className={styles.skeleton_element} active />
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
      case "ongoing":
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
        Tags: <span className={styles.text}>{formatTags(anime?.tags)}</span>
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
        <span className={styles.text}>{formatTags(anime?.synonyms)}</span>
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
    <div
      className={styles.container_button}
      onMouseEnter={() => changeList(true)}
      onMouseLeave={() => changeList(false)}
    >
      <div className={styles.button}>
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
    </div>
  );
};
