export type AnimeList = Array<Anime>;

export type Anime = {
  _id: string;
  sources: Array<string>;
  title: string;
  type: string;
  episodes: number;
  status: string;
  animeSeason: {
    season: string;
    year: number;
  };
  picture: string;
  thumbnail: string;
  synonyms: Array<string>;
  relations: Array<string>;
  tags: Array<string>;
};

export type AnimeListReponse = { data: AnimeList };
export type AnimeResponse = { data: Anime };
export type IdType = string | string[];

export type AnimeError = {
  message: string;
  code: number | string;
};

export const GET_ANIME_LIST = "GET_ANIME_LIST";
export type getAnimeListType = {
  type: typeof GET_ANIME_LIST;
};

export const STOP_ANIME_LIST = "STOP_ANIME_LIST";
export type stopAnimeListType = {
  type: typeof STOP_ANIME_LIST;
};

export const SET_ERROR_ANIME_LIST = "SET_ERROR_ANIME_LIST";
export type setErrorAnimeListType = {
  type: typeof SET_ERROR_ANIME_LIST;
  payload: AnimeError;
};

export const START_ANIME_LIST = "START_ANIME_LIST";
export type startAnimeListType = {
  type: typeof START_ANIME_LIST;
};

export const SET_ANIME_LIST = "SET_ANIME_LIST";
export type setAnimeListType = {
  type: typeof SET_ANIME_LIST;
  payload: AnimeList;
};

export const GET_ONGOING_LIST = "GET_ONGOING_LIST";
export type getOngoingListType = {
  type: typeof GET_ONGOING_LIST;
};

export const SET_ONGOING_LIST = "SET_ONGOING_LIST";
export type setOngoingListType = {
  type: typeof SET_ONGOING_LIST;
  payload: AnimeList;
};

export const GET_ANIME = "GET_ANIME";
export type getAnimeType = {
  type: typeof GET_ANIME;
  payload: IdType;
};

export const SET_ANIME = "SET_ANIME";
export type setAnimeType = {
  type: typeof SET_ANIME;
  payload: Anime;
};

export type animeActionsTypes =
  | getAnimeListType
  | setOngoingListType
  | setAnimeListType
  | startAnimeListType
  | stopAnimeListType
  | setErrorAnimeListType
  | getAnimeType
  | setAnimeType
  | getOngoingListType;
