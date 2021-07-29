import { ScheduleDateItems } from "bus/schedule/types";
import { fromJSON } from "utils/common/localstorage";
import { toJSON } from "../../../utils/common/localstorage";

export const sheduleListStorage = () => {
  const storage = {
    get: () => ({
      sheduleList: fromJSON(
        localStorage.getItem("sheduleList")
      ) as ScheduleDateItems | null,
      currentDate: fromJSON(localStorage.getItem("currentDate")) as
        | string
        | null,
    }),
    set: (sheduleList: ScheduleDateItems, currentDate: string) => {
      localStorage.setItem("sheduleList", toJSON(sheduleList));
      localStorage.setItem("currentDate", toJSON(currentDate));
    },
    clear: () => {
      localStorage.setItem("sheduleList", null);
      localStorage.setItem("currentDate", null);
    },
  };
  return storage;
};
