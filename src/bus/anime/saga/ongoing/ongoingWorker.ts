import { SagaIterator } from "redux-saga";
import { put, call } from "redux-saga/effects";
import { service } from "../../../../Services";
import {
  setOngoingList,
  startAnime,
  stopAnime,
  setErrorAnime,
} from "../../actions";
// types
import { AnimeListReponse } from "../../types";

export function* ongoingWorker(): SagaIterator {
  yield put(startAnime());
  try {
    const result: AnimeListReponse = yield call(service.ongoingList);
    yield put(setOngoingList(result.data));
  } catch (err) {
    yield put(setErrorAnime(err));
  } finally {
    yield put(stopAnime());
  }
}
