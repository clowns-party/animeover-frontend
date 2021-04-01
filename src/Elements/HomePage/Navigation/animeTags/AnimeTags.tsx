import React, { FC } from "react";
import { Button } from "antd";
import styles from "./animeTags.module.scss";

export const AnimeTags: FC = () => {
  // Сделать мап
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span />
        Аниме
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
