import { fetchWithFilters, setFilters } from "bus/anime/actions";
import { useAnime } from "bus/anime/hooks/useAnime";
import { BaseButton } from "Elements/Base/Button/BaseButton";
import { BaseDropdown } from "Elements/Base/Dropdown/BaseDropdown";
import { useRouter } from "next/router";
import React, { useState, FC } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppState } from "redux/rootReducer";
import { routeFilters } from "utils/anime/routeFilters";
import { Seasons } from "utils/constants/seasons";
import { AnimeTags } from "utils/constants/tags";
import { AnimeTagsType, SeasonsType } from "./types";

type Props = {
  setGlobalSearch: () => void;
  globalSearch: boolean;
  offChoiceGlobal?: boolean;
};
const AnimeFilters: FC<Props> = ({
  setGlobalSearch,
  globalSearch,
  offChoiceGlobal = false,
}) => {
  const history = useRouter();
  const page = useSelector((state: AppState) => state.anime.currentPage);
  const dispatch = useDispatch();
  const { filters } = useAnime();

  const sesonsList = Seasons;
  const tags = AnimeTags;

  const form = {
    season: filters?.season || sesonsList[0],
    tag: filters?.tag || tags[0],
  };

  React.useEffect(() => {
    if (globalSearch) {
      dispatch(fetchWithFilters(form));
    }
  }, [globalSearch, page]);

  const selectTag = (tag: AnimeTagsType) => {
    const save = {
      ...form,
      tag,
    };
    dispatch(setFilters(save));
    if (globalSearch) {
      history.push(routeFilters(save?.season, save?.tag));
    }
  };

  const selectSeason = (season: SeasonsType) => {
    const save = {
      ...form,
      season,
    };
    dispatch(setFilters(save));
    if (globalSearch) {
      history.push(routeFilters(save?.season, save?.tag));
    }
  };

  return (
    <>
      {!offChoiceGlobal && (
        <BaseButton onClick={setGlobalSearch}>Global search</BaseButton>
      )}
      <h2>Season</h2>
      <BaseDropdown
        list={sesonsList}
        active={form.season}
        select={selectSeason}
        disabled={false}
      />
      <h2>Tags</h2>
      <BaseDropdown
        list={tags}
        active={form.tag}
        select={selectTag}
        disabled={false}
      />
    </>
  );
};

export default AnimeFilters;
