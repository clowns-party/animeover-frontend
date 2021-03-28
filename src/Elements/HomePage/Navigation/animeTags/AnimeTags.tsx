import React from "react";
import styles from "./animeTags.module.scss";
import { Button } from "antd";

export const AnimeTags = () => {
  return (
    <div className={styles.anime_tags_container}>
      <div className={styles.title}>
        <span></span>Аниме
      </div>
      <div className={styles.button}>
        <Button block>ОНГОИНГИ</Button>
      </div>
      <div className={styles.button}>
        <Button block>ЛЕТНИЙ СЕЗОН</Button>
      </div>
      <div className={styles.button}>
        <Button block>ВЕСЕННИЙ СЕЗОН</Button>
      </div>
      <div className={styles.button}>
        <Button block>ЗИМНИЙ СЕЗОН</Button>
      </div>
      <div className={styles.button}>
        <Button block>ОСЕННИЙ СЕЗОН</Button>
      </div>
    </div>
  );
};
