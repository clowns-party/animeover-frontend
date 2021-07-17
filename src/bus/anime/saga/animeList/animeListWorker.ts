import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import service  from "../../../../services";
import {
  setAnimeList,
  setAnimeListCount,
  setErrorAnime,
  startAnime,
  stopAnime,
} from "../../actions";
import { AnimeListReponse, getAnimeListType } from "../../types";

export function* animeListWorker(action: getAnimeListType): SagaIterator {
  const { payload } = action;
  yield put(startAnime());
  try {
    const result: AnimeListReponse = yield call(
      service.animeService.animeList,
      payload.limit,
      payload.page
    );
    yield put(setAnimeList(result.data.animeList));
    yield put(setAnimeListCount(result.data.count));
  } catch (err) {
    yield put(setErrorAnime(err?.response?.data));
  } finally {
    yield put(stopAnime());
  }
}
