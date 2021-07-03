import { AxiosResponse } from "axios";
import { SagaIterator } from "@redux-saga/types";
import { Anime } from "bus/anime/types";
import {
  setErrorAnimeList,
  setUserAnimeList,
  toggleLoadingUserAnimeList,
  toggleUserAnimeListModal,
} from "bus/UserAnimeList/actions";
import {
  changeAnimeUserListType,
  ResponseUserAnimeListType,
} from "bus/UserAnimeList/types";
import { call, put } from "redux-saga/effects";
import { service } from "Services";
import { useNotificationAnimeList } from "../../hooks/useNotificationAnimeList";
import { userAnimelistStorage } from "../../storage/userAnimelist.storage";

export function* changeUserAnimeListWorker(
  action: changeAnimeUserListType
): SagaIterator {
  try {
    yield put(toggleLoadingUserAnimeList(true));
    const changed = action.payload;
    const result: ResponseUserAnimeListType = yield call(
      service.userService.animeListChange,
      changed
    );

    const _originalUpdated = result.data;

    const storage = userAnimelistStorage();
    const { userAnimeList } = storage.get();
    // Search in list
    const findInList =
      userAnimeList?.length &&
      userAnimeList.find((anime) => anime._id === changed.animeId);
    const notify = Boolean(!findInList || changed.status === "viewed");
    const typeNotify = changed?.review || changed?.star ? "review" : "update";

    // Fetch for update user anime list
    const fetchUpdatedAnime: AxiosResponse<Anime> = yield call(
      service.animeService.anime,
      changed.animeId
    );
    // Push if not found
    if (!findInList) {
      userAnimeList.push(fetchUpdatedAnime.data);
    }
    // Merge diffs
    const updatedUserAnimeList = userAnimeList?.length
      ? userAnimeList.map((anime) =>
          anime._id === fetchUpdatedAnime.data._id
            ? fetchUpdatedAnime.data
            : anime
        )
      : userAnimeList;

    const payload = {
      _original: _originalUpdated,
      data: updatedUserAnimeList,
    };
    storage.set(payload._original, payload.data);
    yield put(setUserAnimeList(payload));
    yield call(useNotificationAnimeList, notify, typeNotify);
    if (typeNotify === "review") {
      yield put(toggleUserAnimeListModal(false));
    }
  } catch (error) {
    yield put(setErrorAnimeList(error));
  } finally {
    yield put(toggleLoadingUserAnimeList(false));
  }
}
