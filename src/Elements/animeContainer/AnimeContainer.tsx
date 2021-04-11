import React, { FC } from "react";
import { Row } from "antd";
import styles from "./animeContainer.module.scss";

export const AnimeContainer: FC = ({ children }) => {
  return (
    <Row justify="center">
      <div className={styles.container}>{children}</div>
    </Row>
  );
};
