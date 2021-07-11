import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAnime } from "bus/anime/actions";
import { Anime } from "Elements/anime/Anime";
import { Header } from "Elements/header";
import Head from "next/head";
import { useAnime } from "bus/anime/hooks/useAnime";

const AnimePage: FC = () => {
  const { anime, isFetching, error } = useAnime();
  const dispatch = useDispatch();
  const {
    query: { id },
  } = useRouter();
  useEffect(() => {
    dispatch(getAnime(id));
  }, [id]);

  return (
    <div>
      <Head>
        <title>
          Animeover | {isFetching || !anime ? "Loading..." : anime?.title}
        </title>
      </Head>
      <Header />
      <Anime />
    </div>
  );
};

export default AnimePage;
