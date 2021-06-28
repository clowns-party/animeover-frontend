export const diffBetweenObjs = (
  fs: { [key: string]: any },
  sc: { [key: string]: any }
) => {
  return Boolean(Object.keys(fs).filter((k) => fs[k] !== sc[k])?.length);
};
