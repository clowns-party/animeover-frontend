import { SagaIterator } from "@redux-saga/types";
import {
  setErrorAnimeList,
  setUserAnimeList,
  toggleLoadingUserAnimeList,
} from "bus/UserAnimeList/actions";
import {
  removeAnimeByIdType,
  ResponseUserAnimeListType,
} from "bus/UserAnimeList/types";
import { call, put } from "redux-saga/effects";
import { service } from "Services";
import { userAnimelistStorage } from "../../storage/userAnimelist.storage";

export function* deleteUserAnimeListById(
  action: removeAnimeByIdType
): SagaIterator {
  try {
    yield put(toggleLoadingUserAnimeList(true));

    const animeId = action.payload;
    const _original: ResponseUserAnimeListType = yield call(
      service.userService.animeListRemoveItem,
      animeId
    );

    const _originalUpdated = _original.data;
    const storage = userAnimelistStorage();
    const { userAnimeList } = storage.get();

    // Merge diffs
    const updatedUserAnimeList = userAnimeList.filter(
      (anime) => anime._id !== animeId
    );

    const payload = {
      _original: _originalUpdated,
      data: updatedUserAnimeList,
    };
    storage.set(payload._original, payload.data);
    yield put(setUserAnimeList(payload));
  } catch (error) {
    yield put(setErrorAnimeList(error));
  } finally {
    yield put(toggleLoadingUserAnimeList(false));
  }
}
