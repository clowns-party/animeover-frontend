import { DetailsAnimeList, RawAnimeListType } from "bus/UserAnimeList/types";
import {
  GET_ANIME_LIST,
  animeActionsTypes,
  SET_ANIME_LIST,
  AnimeList,
  START_ANIME_LIST,
  STOP_ANIME_LIST,
  SET_ERROR_ANIME_LIST,
  AnimeError,
  GET_ONGOING_LIST,
  SET_ONGOING_LIST,
  GET_ANIME,
  SET_ANIME,
  Anime,
  SET_ANIME_LIST_COUNT,
  SET_CURRENT_PAGE,
  SET_FILTERED,
  FETCH_WITH_FILTERS,
  FiltersPayload,
  SET_FILTERS,
} from "./types";

export type AnimeState = {
  anime: {
    info: Anime;
    detail: DetailsAnimeList | null;
  } | null;
  animeList: AnimeList | null;
  filtered: AnimeList | null;
  filters: Omit<FiltersPayload, "page"> | null;
  ongoing: AnimeList | null;
  isFetching: boolean;
  currentPage: number;
  count: number;
  pageLimit: number;
  error: AnimeError | false;
};

const getRandomPage = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const initialState: AnimeState = {
  anime: null,
  animeList: null,
  filtered: null,
  ongoing: null,
  isFetching: false,
  currentPage: getRandomPage(1, 10),
  count: null,
  pageLimit: 20,
  error: false,
  filters: null,
};

export const animeReducer = (
  state = initialState,
  action: animeActionsTypes
): AnimeState => {
  switch (action.type) {
    case GET_ANIME_LIST:
      return {
        ...state,
      };
    case GET_ONGOING_LIST:
      return {
        ...state,
      };
    case SET_ANIME_LIST:
      return {
        ...state,
        animeList: [...action.payload],
      };
    case FETCH_WITH_FILTERS:
      return {
        ...state,
      };
    case SET_FILTERED:
      return {
        ...state,
        filtered: action.payload.animeList,
      };
    case SET_FILTERS:
      return {
        ...state,
        filters: {
          season: action.payload.season,
          tag: action.payload.tag,
        },
      };
    case SET_ANIME_LIST_COUNT:
      return {
        ...state,
        count: action.payload,
      };
    case SET_ONGOING_LIST:
      return {
        ...state,
        ongoing: action.payload,
      };
    case START_ANIME_LIST:
      return {
        ...state,
        isFetching: true,
      };
    case STOP_ANIME_LIST:
      return {
        ...state,
        isFetching: false,
      };
    case SET_ERROR_ANIME_LIST:
      return {
        ...state,
        error: action.payload,
      };
    case GET_ANIME:
      return {
        ...state,
        anime: null,
      };
    case SET_ANIME:
      return {
        ...state,
        anime: {
          info: action.payload?.anime,
          detail: action.payload?.detail,
        },
      };
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.payload,
      };
    }
    default:
      // eslint-disable-next-line no-case-declarations
      const x: never = action;
      return state;
  }
};
