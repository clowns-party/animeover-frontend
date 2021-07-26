import Container from "Elements/layout/Container";
import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOngoingList, getShedule } from "../../bus/anime/actions";
import { AnimeList } from "./animeList/AnimeList";
import styles from "./home.module.scss";
import { ListOngoing } from "./listAngoing/ListOngoing";
import { Calendar } from "./calendar/Calendar";

export const HomePage: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOngoingList());
    dispatch(getShedule());
  }, []);

  return (
    <Container>
      <div className={styles.component}>
        <ListOngoing />
        <Calendar />
      </div>
      <div className={styles.component}>
        <AnimeList />
      </div>
    </Container>
  );
};
