import { SagaIterator } from "redux-saga";
import { put, call } from "redux-saga/effects";
import { service } from "../../../../Services";
import { AnimeResponse, getAnimeType } from "../../types";
import { startAnime, setAnime, setErrorAnime, stopAnime } from "../../actions";

export function* animeWorker(action: getAnimeType): SagaIterator {
  yield put(startAnime());
  try {
    const result: AnimeResponse = yield call(service.anime, action.payload);
    yield put(setAnime(result.data));
  } catch (err) {
    yield put(setErrorAnime(err));
  } finally {
    yield put(stopAnime());
  }
}
