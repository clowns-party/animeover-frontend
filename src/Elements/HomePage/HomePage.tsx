import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOngoingList } from "../../bus/anime/actions";
import { ListOngoing } from "./listAngoing/ListOngoing";
import styles from "./home.module.scss";
import { AnimeList } from "./animeList/AnimeList";
import { AnimeContainer } from "../animeContainer/AnimeContainer";

export const HomePage: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOngoingList());
  }, []);

  return (
    <AnimeContainer>
      <div className={styles.component}>
        <ListOngoing />
      </div>
      <div className={styles.component}>
        <AnimeList />
      </div>
    </AnimeContainer>
  );
};
