import { call, put } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import service  from "../../../../services";
import { AnimeListReponse } from "../../types";
import {
  setAnimeList,
  setAnimeListCount,
  setCurrentPage,
  setErrorAnime,
  startAnime,
  stopAnime,
} from "../../actions";

export function* changePageWorker(action): SagaIterator {
  const { payload } = action;
  yield put(startAnime());
  try {
    const result: AnimeListReponse = yield call(
      service.animeService.animeList,
      payload.limit,
      payload.page
    );
    yield put(setCurrentPage(payload.page));
    yield put(setAnimeList(result.data.animeList));
    yield put(setAnimeListCount(result.data.count));
  } catch (err) {
    yield put(setErrorAnime(err?.response?.data));
  } finally {
    yield put(stopAnime());
  }
}
