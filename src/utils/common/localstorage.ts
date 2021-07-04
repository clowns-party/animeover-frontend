export const toJSON = (param: any) => {
  try {
    return JSON.stringify(param);
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const fromJSON = (param: any) => {
  try {
    return JSON.parse(param);
  } catch (error) {
    return null;
  }
};
