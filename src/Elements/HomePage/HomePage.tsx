import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAnimeList } from "../../bus/anime/actions";
import { useAnimelist } from "../../bus/anime/hooks/useAnimeList";
import { ListAgnoing } from "./listAngoing/ListAngoing";
import styles from "./home.module.scss";
import { Col, Row } from "antd";
import { Navigation } from './Navigation/Navigation';

export const HomePage: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAnimeList());
  }, []);

  return (
    <div className={styles.backImage}>
      <Row justify={"center"}>
        <div className={styles.container}>
          <div className={styles.component}>
            <ListAgnoing />
          </div>
          <div className={styles.component}>
            <Navigation />
          </div>
        </div>
      </Row>
    </div>
  );
};
