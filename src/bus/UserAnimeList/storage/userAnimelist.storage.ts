import { isEqual } from "lodash";
import { RawAnimeListType, UserAnimeListType } from "../types";
// import * as isequal from "lodash.isequal";

export const userAnimelistStorage = () => {
  const storage = {
    get: () => ({
      userAnimeList: fromJSON(
        localStorage.getItem("userAnimelist")
      ) as UserAnimeListType | null,
      originalAnimeList: fromJSON(
        localStorage.getItem("originalAnimeList")
      ) as RawAnimeListType | null,
    }),
    set: (_original: RawAnimeListType, animeList?: UserAnimeListType) => {
      localStorage.setItem("originalAnimeList", toJSON(_original));
      if (animeList) {
        localStorage.setItem("userAnimelist", toJSON(animeList));
      }
    },
    equal: (_original: RawAnimeListType) => {
      const { originalAnimeList } = storage.get();
      return (
        isEqual(originalAnimeList, _original) &&
        !!originalAnimeList &&
        !!_original
      );
    },
    clear: () => {
      localStorage.setItem("userAnimelist", null);
      localStorage.setItem("originalAnimeList", null);
    },
  };
  return storage;
};

const toJSON = (param: any) => {
  try {
    return JSON.stringify(param);
  } catch (error) {
    console.log(error);
    return null;
  }
};

const fromJSON = (param: any) => {
  try {
    return JSON.parse(param);
  } catch (error) {
    return null;
  }
};
