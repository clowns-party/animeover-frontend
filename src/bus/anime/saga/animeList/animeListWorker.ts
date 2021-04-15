import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import { service } from "../../../../Services";
import {
  setAnimeList,
  setErrorAnime,
  startAnime,
  stopAnime,
} from "../../actions";
import { AnimeListReponse } from "../../types";

export function* animeListWorker(): SagaIterator {
  yield put(startAnime());
  try {
    const result: AnimeListReponse = yield call(service.animeList);
    yield put(setAnimeList(result.data));
  } catch (err) {
    yield put(setErrorAnime(err?.response?.data));
  } finally {
    yield put(stopAnime());
  }
}
