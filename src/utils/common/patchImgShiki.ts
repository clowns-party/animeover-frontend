import { AnimeList } from "../../bus/anime/types";

export const patchImgShiki = (list: AnimeList) => {
  const patchedLinks =
    list?.length &&
    list
      .map((anime) => ({
        ...anime,
        picture: `https://shikimori.one/${anime?.picture}`,
      }))
      .filter((anime) => !!anime._id);
  return patchedLinks || list;
};
