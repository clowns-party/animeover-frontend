import Container from "Elements/layout/Container";
import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOngoingList } from "../../bus/anime/actions";
import { AnimeList } from "./animeList/AnimeList";
import styles from "./home.module.scss";
import { ListOngoing } from "./listAngoing/ListOngoing";

export const HomePage: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOngoingList());
  }, []);

  return (
    <Container>
      <div className={styles.component}>
        <ListOngoing />
      </div>
      <div className={styles.component}>
        <AnimeList />
      </div>
    </Container>
  );
};
