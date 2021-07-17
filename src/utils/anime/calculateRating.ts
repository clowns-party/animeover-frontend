import { DetailsAnimeList } from "bus/UserAnimeList/types";

export const calculateRating = (details: DetailsAnimeList) => {
  const stars = details?.length && details.map((detail) => Number(detail.star));
  let count = 0;
  let WithoutNull = [];
  if (stars?.length) {
    WithoutNull = stars?.reduce((acc, item) => {
      count += item;
      if (item !== 0) {
        acc.push(item);
      }
      return acc;
    }, []);
  }
  const rating = Number((count / WithoutNull?.length).toFixed(1));
  return rating || 0;
};
