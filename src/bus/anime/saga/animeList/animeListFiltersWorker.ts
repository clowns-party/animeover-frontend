import { SagaIterator } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import { AnimeState } from "bus/anime/reducer";
import { AppState } from "../../../../redux/rootReducer";
import { fetchWithFiltersType, AnimeListReponse } from "../../types";
import service from "../../../../services";
import {
  setAnimeListCount,
  setCurrentPage,
  setErrorAnime,
  setFiltered,
  setFilters,
  startAnime,
  stopAnime,
} from "../../actions";

export function* animeListFiltersWorker(
  action: fetchWithFiltersType
): SagaIterator {
  const { payload } = action;
  const { currentPage, pageLimit }: AnimeState = yield select(
    (state: AppState) => state.anime
  );
  const page = payload?.page || currentPage;

  const limit = pageLimit;

  const filters = {
    ...payload,
    tags: "",
  };
  delete filters.tag;
  delete filters.page;
  if (filters.season === "-") {
    delete filters.season;
  }
  if (!payload.tag || payload.tag === "-") {
    delete filters.tags;
  } else {
    filters.tags = JSON.stringify([payload.tag]);
  }

  yield put(startAnime());

  try {
    const result: AnimeListReponse = yield call(
      service.animeService.animeList,
      limit,
      page,
      filters
    );
    yield put(
      setFiltered({
        animeList: result.data.animeList,
        // remove later
        filters: payload,
      })
    );
    yield put(setCurrentPage(page));
    yield put(setAnimeListCount(result.data.count));
    yield put(setFilters(payload));
  } catch (err) {
    yield put(setErrorAnime(err?.response?.data));
  } finally {
    yield put(stopAnime());
  }
}
