import { changePage } from "bus/anime/actions";
import { useAnime } from "bus/anime/hooks/useAnime";
import { AnimeContainer } from "Elements/animeContainer/AnimeContainer";
import { AnimeList } from "Elements/HomePage/animeList/AnimeList";
import { Header } from "Elements/header";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const AnimePage = () => {
  const { query } = useRouter();
  const page = Number(query?.page || 0);
  const { pageLimit } = useAnime();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changePage({ limit: pageLimit, page }));
  }, []);
  return (
    <>
      <Header />
      <AnimeContainer>
        <AnimeList />
      </AnimeContainer>
    </>
  );
};

export default AnimePage;
