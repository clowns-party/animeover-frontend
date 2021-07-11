export const ellipsis = (str: string, sub?: number) => {
  const by = sub || 20;
  return str?.length >= by ? `${str.substr(0, by)}...` : str;
};
