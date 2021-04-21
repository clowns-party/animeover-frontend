export const imgFormatter = (url: string) =>
  (url.indexOf("/system/animes") === 0 ? `https://shikimori.one${url}` : url);
