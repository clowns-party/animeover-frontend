import CustomizeAnimePage from "bus/anime";
import { useAnime } from "bus/anime/hooks/useAnime";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { getFiltersByRoute } from "utils/anime/getFiltersByRoute";

const AnimePageWithSeason = () => {
  const { query } = useRouter();
  const { filtered } = useAnime();
  const filters = getFiltersByRoute(query);
  return (
    <>
      <Head>
        <title>Animeover | {filters?.season}</title>
      </Head>
      <CustomizeAnimePage
        list={filtered}
        isGlobalSearch
        infinite
        type="filtered"
      />
    </>
  );
};

export default AnimePageWithSeason;
