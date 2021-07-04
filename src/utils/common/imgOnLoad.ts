const imgOnLoad = (url: string, template?: string | any) => {
  if (process.browser && url) {
    const img = new Image();
    img.onload = () => {
      return url;
    };
    img.onerror = () => {
      return template;
    };
    img.src = url;
    return url;
  }
  return url ?? template;
};
export default imgOnLoad;
