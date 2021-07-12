import { RawAnimeListType } from "bus/UserAnimeList/types";
import { DetailsAnimeList } from "../../bus/UserAnimeList/types";

export const formatAnimeDetail = (details: RawAnimeListType[]) => {
  return (
    (details?.length &&
      (details?.reduce((details, anime) => {
        const formatted = anime && Object.values(anime);
        const user = anime && Object.keys(anime);
        if (formatted?.length && user?.length) {
          details.push({
            ...formatted[0],
            user: user[0],
          });
        }
        return details;
      }, []) as DetailsAnimeList)) ||
    null
  );
};
