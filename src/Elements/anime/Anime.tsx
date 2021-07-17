import { StarOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import Comments from "bus/comments";
import { UserAnimeListDropdown } from "Elements/user/UserAnimeListDropdown";
import Container from "Elements/layout/Container";
import Picture from "Elements/picture";
import React, { FC, useRef } from "react";
import { BaseButton } from "stories/BaseButton";
import styled from "styled-components";
import { imgFormatter } from "utils/common/imgFormatter";
import { useAnime } from "../../bus/anime/hooks/useAnime";
import { Anime as AnimeType } from "../../bus/anime/types";
import { avatarSize, formatTags } from "./anime.functions";
import styles from "./anime.module.scss";

const StyledBtn = styled(BaseButton)`
  margin-top: 10px;
  margin-bottom: 15px;
`;

const CommentsList = styled.div`
  background-color: #fff;
  padding: 16px 36px 16px 16px;
  margin-top: 35px;
  border-radius: 20px;
  margin-bottom: 15px;
`;

export const Anime: FC = () => {
  const imgRef = useRef(null);
  const { anime, isFetching, rating } = useAnime();

  const animePicture = anime && imgFormatter(anime?.picture);

  const isShiki = anime && anime.sources.includes("shikimori");
  return (
    <Container>
      <div className={styles.anime_container}>
        <div className={styles.info_container}>
          <div className={styles.picture_and_button}>
            {!isFetching ? (
              <Picture
                ref={imgRef}
                className={styles.anime_picture}
                url={animePicture}
                alt={anime?.title || "anime"}
              />
            ) : (
              <Skeleton.Avatar active shape="square" style={avatarSize()} />
            )}
            {!isFetching && isShiki && (
              <a href="https://shikimori.one/" target="_blank" rel="noreferrer">
                <StyledBtn>Go to shiki</StyledBtn>
              </a>
            )}
            {!isFetching ? (
              <UserAnimeListDropdown show={!isShiki} />
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
              {rating}
            </div>
          ) : (
            <Skeleton.Input
              style={{ width: 68, height: 35, borderRadius: 22 }}
              active
            />
          )}
        </div>
      </div>
      <CommentsList>
        <Comments />
      </CommentsList>
    </Container>
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
