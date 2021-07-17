import { SagaIterator } from "@redux-saga/types";
import { Anime } from "bus/anime/types";
import {
  setErrorAnimeList,
  setUserAnimeList,
  toggleLoadingUserAnimeList
} from "bus/UserAnimeList/actions";
import {
  RawAnimeListType, ResponseUserAnimeListType
} from "bus/UserAnimeList/types";
import { call, put } from "redux-saga/effects";
import service from "Services";
import { userAnimelistStorage } from "../../storage/userAnimelist.storage";

export function* userAnimeListWorker(): SagaIterator {
  try {
    yield put(toggleLoadingUserAnimeList(true));
    const result: ResponseUserAnimeListType = yield call(
      service.userService.animeList
    );
    //
    const storage = userAnimelistStorage();
    if (!storage.equal(result.data)) {
      storage.clear();
      const animeList: Anime[] = yield call(
        fetchUserAnimeListByRaw,
        result.data
      );
      storage.set(result.data, animeList);
      const payload = {
        _original: result.data,
        data: animeList,
      };
      yield put(setUserAnimeList(payload));
    } else {
      const { userAnimeList, originalAnimeList } = storage.get();
      storage.set(originalAnimeList, userAnimeList);
      const payload = {
        _original: originalAnimeList,
        data: userAnimeList,
      };
      yield put(setUserAnimeList(payload));
    }
    //
  } catch (error) {
    yield put(setErrorAnimeList(error));
  } finally {
    yield put(toggleLoadingUserAnimeList(false));
  }
}

export const fetchUserAnimeListByRaw = (data: RawAnimeListType) => {
  const links = objToArr(data);
  const promises = links.map((el) => {
    return service.animeService.anime(el.id).then((res) => res.data);
  });
  return Promise.all(promises).then((results) => {
    return results;
  });
};

const objToArr = (obj: RawAnimeListType) => {
  return Object.keys(obj)
    .map((key) => ({ id: key, data: obj[key] }))
    .filter((arr) => !!arr);
};
