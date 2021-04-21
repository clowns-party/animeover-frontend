import React from "react";
import { Anime } from "../../bus/anime/types";
import styles from "./anime.module.scss";

export const formatTags = (array: Anime["synonyms"] | Anime["tags"]) => {
  return array?.length
    ? array?.map(
        (el, index: number) =>
          index <= 5 && (
            <span className={styles.word} key={String(index)}>
              {el}
              {index === array.length - 1 || index <= 5 ? " " : ", "}
            </span>
          )
      )
    : "No tags";
};

export const avatarSize = () => {
  let clientWidth = null;
  if (process && process?.browser) {
    clientWidth = window?.screen?.width;
  }
  if (clientWidth && clientWidth <= 395) {
    return { width: 150, height: 270, borderRadius: 20 };
  }
  return { width: 200, height: 320, borderRadius: 20 };
};
