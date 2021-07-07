import { useRouter } from "next/router";
import { fetchWithFilters, setFilters } from "bus/anime/actions";
import React from "react";
import { useDispatch } from "react-redux";
import { AnimeTagsType, SeasonsType } from "bus/filters/types";

export const useSearchWithFilters = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const season = query?.season
    ? (query?.season.toString().toUpperCase() as SeasonsType)
    : "SUMMER";
  const tag = query?.tag as AnimeTagsType;
  const queryFilters = React.useMemo(
    () => ({
      season,
      tag,
    }),
    [season, tag]
  );

  React.useEffect(() => {
    dispatch(fetchWithFilters(queryFilters));
  }, [queryFilters]);
};
