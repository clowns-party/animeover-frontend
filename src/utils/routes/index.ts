export const ROUTES = {
  main: "/",
  profile: "/profile",
  ongoing: "/",
  anime: "/anime",
  animeById: (id: string) => `/anime/${id}`,
  animeByPage: (page: string) => `/anime/page/${page}`,
};
