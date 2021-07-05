import { fetchWithFilters, setFilters } from "bus/anime/actions";
import { useAnime } from "bus/anime/hooks/useAnime";
import { BaseCheckbox } from "Elements/Base/Checkbox/BaseCheckbox";
import { BaseDropdown } from "Elements/Base/Dropdown/BaseDropdown";
import React, { useState } from "react";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "redux/rootReducer";
import { Seasons } from "utils/constants/seasons";
import { AnimeTags } from "utils/constants/tags";
import { AnimeTagsType, SeasonsType } from "./types";

type Props = {
  setChecked: (active: boolean) => void;
  globalSearch: boolean;
};
const AnimeFilters: FC<Props> = ({ setChecked, globalSearch }) => {
  const page = useSelector((state: AppState) => state.anime.currentPage);
  const dispatch = useDispatch();
  const { filters } = useAnime();

  const sesonsList = Seasons;
  const tags = AnimeTags;

  const [form, setForm] = useState({
    season: filters?.season || sesonsList[0],
    tag: filters?.tag || tags[0],
  });

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
    setForm(save);
    if (!globalSearch) {
      dispatch(setFilters(save));
    } else {
      dispatch(fetchWithFilters(save));
    }
  };

  const selectSeason = (season: SeasonsType) => {
    const save = {
      ...form,
      season,
    };
    setForm(save);
    if (!globalSearch) {
      dispatch(setFilters(save));
    } else {
      dispatch(fetchWithFilters(save));
    }
  };

  return (
    <>
      <BaseCheckbox
        checked={globalSearch}
        setChecked={setChecked}
        label="Global search"
      />
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
