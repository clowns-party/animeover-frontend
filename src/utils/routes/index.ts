import { AnimeTagsType, SeasonsType } from "bus/filters/types";

export const ROUTES = {
  main: "/",
  profile: "/profile",
  ongoing: "/ongoing",
  anime: "/anime",
  animeById: (id: string) => `/anime/${id}`,
  animeByPage: (page: string) => `/anime/page/${page}`,
  animeBySeason: (season: SeasonsType) =>
    `/anime/season/${season || "SUMMER"}`.toLowerCase(),
  animeByMultiple: (season: SeasonsType, tag: AnimeTagsType) =>
    `/anime/season/${season || "SUMMER"}/${tag || "drama"}`.toLowerCase(),
};
