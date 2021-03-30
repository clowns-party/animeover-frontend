import { SagaIterator } from "redux-saga";
import { put, call } from "redux-saga/effects";
import { service } from "../../../../Services";
import { setOngoingList, startAnimeList, stopAnimeList } from "../../actions";
import { setErrorAnimeList } from "./../../actions";

export function* ongoingWorker(): SagaIterator {
  yield put(startAnimeList());
  try {
    const result = yield call(service.ongoingList);
    yield put(setOngoingList(result.data));
  } catch (err) {
    yield put(setErrorAnimeList(err));
  } finally {
    yield put(stopAnimeList());
  }
}
