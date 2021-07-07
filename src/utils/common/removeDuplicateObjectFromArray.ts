export function removeDuplicateObjectFromArray<T>(array: T[], key: keyof T) {
  const check = new Set();
  return array.filter((obj) => !check.has(obj[key]) && check.add(obj[key]));
}
