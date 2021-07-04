import { AnimeList } from "bus/anime/types";
import {
  GET_SEARCH_ANIME_LIST,
  searchActionsTypes,
  SET_SEARCH_ANIME,
} from "./types";

export type SearchState = {
  searchAnimeList: null | AnimeList;
};

const initialState: SearchState = {
  searchAnimeList: null,
};

export const searchReducer = (
  state = initialState,
  action: searchActionsTypes
): SearchState => {
  switch (action.type) {
    case GET_SEARCH_ANIME_LIST:
      return {
        ...state,
      };
    case SET_SEARCH_ANIME:
      return {
        ...state,
        searchAnimeList: action?.payload,
      };
    default:
      // eslint-disable-next-line no-case-declarations
      const x: never = action;
      return state;
  }
};
