import CustomizeAnimePage from "bus/anime";
import { useAnime } from "bus/anime/hooks/useAnime";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { getFiltersByRoute } from "utils/anime/getFiltersByRoute";

const AnimePageWithSeasonAndTag = () => {
  const { query } = useRouter();
  const { filtered } = useAnime();
  const filters = getFiltersByRoute(query);

  const season = filters?.season && filters.season !== "-" && filters?.season;
  const tag = filters?.tag && filters.tag !== "-" && filters?.tag;

  const title = season && tag ? `${season} | ${tag}` : season || tag;

  return (
    <>
      <Head>
        <title>Animeover | {title || ""}</title>
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

export default AnimePageWithSeasonAndTag;
