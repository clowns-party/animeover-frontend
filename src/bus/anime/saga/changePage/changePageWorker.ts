import { call, put } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { service } from "../../../../Services";
import { AnimeListReponse } from "../../types";
import {
  setAnimeList,
  setAnimeListCount,
  setErrorAnime,
  startAnime,
  stopAnime,
} from "../../actions";

export function* changePageWorker(action): SagaIterator {
  const { payload } = action;
  yield put(startAnime());
  try {
    const result: AnimeListReponse = yield call(
      service.animeList,
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
