import { AnimeList } from "bus/anime/types";
import { setSearchAnime } from "bus/search/actions";
import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import { service } from "Services";

export function* searchAnimeWorker(action): SagaIterator {
  const { payload } = action || {};
  try {
    if (payload) {
      const text = payload[0]?.toUpperCase() + payload?.substring(1);
      const { data }: { data: AnimeList } = yield call(
        service.animeService.searchAnime,
        text
      );
      yield put(setSearchAnime(data));
    } else {
      yield put(setSearchAnime(null));
    }
  } catch (error) {
    console.log(error);
  }
}
