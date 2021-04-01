import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOngoingList, getAnimeList } from "../../bus/anime/actions";
import { useAnimelist } from "../../bus/anime/hooks/useAnimeList";
import { ListOngoing } from "./listAngoing/ListOngoing";
import styles from "./home.module.scss";
import { Col, Row } from "antd";
import { Navigation } from "./Navigation/Navigation";
import { AnimeList } from "./animeList/AnimeList";

export const HomePage: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOngoingList());
    dispatch(getAnimeList());
  }, []);

  return (
    <div className={styles.backImage}>
      <Row justify={"center"}>
        <div className={styles.container}>
          <div className={styles.component}>
            <ListOngoing />
          </div>
          <div className={styles.component}>
            <Navigation />
          </div>
          <div className={styles.component}>
            <AnimeList />
          </div>
        </div>
      </Row>
    </div>
  );
};
