import { AnimeTagsType } from "../../bus/filters/types";
// deprecated
export const tagFormatQuery = (tag: AnimeTagsType) => {
  console.warn("tagFormatQuery is deprecated");

  return `["${tag}"]`;
};
