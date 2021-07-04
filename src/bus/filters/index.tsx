import { fetchWithFilters } from "bus/anime/actions";
import { useAnime } from "bus/anime/hooks/useAnime";
import { BaseDropdown } from "Elements/Base/Dropdown/BaseDropdown";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { tagFormatQuery } from "utils/common/tagFormatQuery";
import { Seasons } from "utils/constants/seasons";
import { AnimeTags } from "utils/constants/tags";
import { AnimeTagsType, SeasonsType } from "./types";

const AnimeFilters = () => {
  const { filters } = useAnime();
  const dispatch = useDispatch();
  const sesonsList = Seasons;
  const tags = AnimeTags;

  const [form, setForm] = useState({
    season: filters?.season || sesonsList[0],
    tags: filters?.tags || (tags[0] as string),
    tag: filters?.tag || tags[0],
  });

  const selectTag = (tag: AnimeTagsType) => {
    const save = {
      ...form,
      tags: tagFormatQuery(tag),
      tag,
    };
    setForm(save);
    dispatch(fetchWithFilters(save));
  };

  const selectSeason = (season: SeasonsType) => {
    const save = {
      ...form,
      season,
    };
    setForm(save);
    dispatch(fetchWithFilters(save));
  };

  return (
    <>
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
