import { useAuth } from "bus/auth/hooks/useAuth";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/rootReducer";
import {
  getUserAnimeList,
  changeAnimeUserList,
  removeAnimeUserListById,
} from "../actions";
import { animeInUserList, userAnimeListState } from "../reducer";
import { UserAnimeListFormData, UserAnimeListStatuses } from "../types";

export const useCrudUserAnimeList = (withFetch = true, id?: string) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const animeId = id ?? router.query.id.toString();
  const { isFetching, show } = useSelector(userAnimeListState);
  const inList = useSelector((state: AppState) =>
    animeInUserList(state, animeId)
  );
  const { data, isFetching: loadingUser } = useAuth();
  const user = data?.user;
  React.useEffect(() => {
    if (user && withFetch) {
      dispatch(getUserAnimeList());
    }
  }, [user, withFetch]);

  const onChange = async (
    status: UserAnimeListStatuses,
    params: Omit<UserAnimeListFormData, "animeId" | "status"> = {}
  ) => {
    const form = {
      animeId,
      status,
      ...params,
    };
    dispatch(changeAnimeUserList(form));
  };

  const onRemove = async () => {
    dispatch(removeAnimeUserListById(animeId));
  };

  return {
    isFetching: isFetching || loadingUser,
    loadingUser,
    user,
    inList,
    onChange,
    onRemove,
    show,
  };
};
