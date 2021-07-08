import React, { FC } from "react";
import { useAnime } from "../../../bus/anime/hooks/useAnime";
import InfiniteScroll from "./InfiniteScroll";

export const AnimeList: FC = () => {
  const { currentPage } = useAnime();

  return <InfiniteScroll startPage={currentPage} type="default" />;
};
