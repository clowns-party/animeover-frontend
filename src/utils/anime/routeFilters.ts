import { ROUTES } from "utils/routes";
import { AnimeTagsType, SeasonsType } from "bus/filters/types";

export const routeFilters = (season?: SeasonsType, tag?: AnimeTagsType) => {
  if (season && !tag) {
    return ROUTES.animeBySeason(season);
  }
  if (season && tag) {
    return ROUTES.animeByMultiple(season, tag);
  }
  return ROUTES.animeBySeason(season);
};
