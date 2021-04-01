import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import { service } from "../../../../Services";
import {
  setAnimeList,
  setErrorAnimeList,
  startAnimeList,
  stopAnimeList,
} from "../../actions";
import { AnimeListReponse } from "../../types";

export function* animeWorker(): SagaIterator {
  yield put(startAnimeList());
  try {
    const result: AnimeListReponse = yield call(service.animeList);
    yield put(setAnimeList(result.data));
  } catch (err) {
    yield put(setErrorAnimeList(err?.response?.data));
  } finally {
    yield put(stopAnimeList());
  }
}
