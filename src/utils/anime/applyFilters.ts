import { AnimeList, FiltersPayload } from "bus/anime/types";

export const applyFilters = (
  list: AnimeList,
  filters: FiltersPayload
): { list: AnimeList; wasApply: boolean; messageResult: string } => {
  const byOnce = checkFilter(filters?.season);
  const bySecond = checkFilter(filters?.tag);
  const multiple = byOnce && bySecond;
  const filtered =
    list?.length &&
    list.reduce((filtered, anime) => {
      if (multiple) {
        const res =
          anime.animeSeason.season === filters.season &&
          anime.tags.includes(filters.tag);
        res && filtered.push(anime);
      } else if (byOnce) {
        const bySeason = anime.animeSeason.season === filters.season;
        bySeason && filtered.push(anime);
      } else if (bySecond) {
        const byTag = anime.tags.includes(filters.tag);
        byTag && filtered.push(anime);
      }
      return filtered;
    }, []);
  const wasApply = Boolean(byOnce || multiple);
  return {
    list: filtered?.length ? filtered : list,
    wasApply,
    messageResult:
      wasApply && !filtered.length ? "Can't search by you filter" : "",
  };
};

const checkFilter = (filter: string) => {
  return Boolean(filter && filter !== "-");
};
