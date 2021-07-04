import { AnimeTagsType } from "../../bus/filters/types";

export const tagFormatQuery = (tag: AnimeTagsType) => {
  return `["${tag}"]`;
};
