import { AnimeTagsType, SeasonsType } from "bus/filters/types";
import { ParsedUrlQuery } from "querystring";

export const getFiltersByRoute = (query: ParsedUrlQuery) => {
  const season = query?.season
    ? (query?.season.toString().toUpperCase() as SeasonsType)
    : "SUMMER";
  const tag = query?.tag as AnimeTagsType;
  return {
    season,
    tag,
  };
};
