import CustomizeAnimePage from "bus/anime";
import { useAnime } from "bus/anime/hooks/useAnime";
import React from "react";

const AnimePageWithSeason = () => {
  const { filtered } = useAnime();
  return (
    <CustomizeAnimePage
      list={filtered}
      isGlobalSearch
      infinite
      type="filtered"
    />
  );
};

export default AnimePageWithSeason;
