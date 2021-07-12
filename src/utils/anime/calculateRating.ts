import { DetailsAnimeList } from "bus/UserAnimeList/types";

export const calculateRating = (details: DetailsAnimeList) => {
  const stars = details?.length && details.map((detail) => Number(detail.star));
  let count = 0;
  return (
    (stars?.length &&
      stars.reduce((sum, item, index) => {
        count += item;
        return sum + item * (index + 1);
      }, 0)) ||
    0
  );
};
