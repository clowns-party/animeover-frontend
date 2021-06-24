export const VALIDA_IMAGE_URL_PATTERN = /\.(jpeg|jpg|png)$/;
export const validateImgUrl = (url: string) => {
  return url.match(VALIDA_IMAGE_URL_PATTERN) != null;
};
