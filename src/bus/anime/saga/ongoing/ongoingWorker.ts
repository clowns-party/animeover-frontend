import { SagaIterator } from "redux-saga";
import { put, call } from "redux-saga/effects";
import { service } from "../../../../Services";
import {
  setOngoingList,
  startAnimeList,
  stopAnimeList,
  setErrorAnimeList,
} from "../../actions";
// types
import { AnimeListReponse } from "../../types";

export function* ongoingWorker(): SagaIterator {
  yield put(startAnimeList());
  try {
    const result: AnimeListReponse = yield call(service.ongoingList);
    yield put(setOngoingList(result.data));
  } catch (err) {
    yield put(setErrorAnimeList(err));
  } finally {
    yield put(stopAnimeList());
  }
}
