import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAnime } from "../../bus/anime/hooks/useAnime";
import { getOngoingList, getAnimeList } from "../../bus/anime/actions";
import { ListOngoing } from "./listAngoing/ListOngoing";
import styles from "./home.module.scss";
import { Navigation } from "./Navigation/Navigation";
import { AnimeList } from "./animeList/AnimeList";
import { AnimeContainer } from "../animeContainer/AnimeContainer";

export const HomePage: FC = () => {
  const { pageLimit, currentPage } = useAnime();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOngoingList());
    dispatch(getAnimeList({ limit: pageLimit, page: currentPage }));
  }, []);

  return (
    <AnimeContainer>
      <div className={styles.component}>
        <ListOngoing />
      </div>
      <div className={styles.component}>
        <Navigation />
      </div>
      <div className={styles.component}>
        <AnimeList />
      </div>
    </AnimeContainer>
  );
};
