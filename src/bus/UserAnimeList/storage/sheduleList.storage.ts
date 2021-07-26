import { ScheduleDateItems } from "bus/schedule/types";
import { fromJSON } from "utils/common/localstorage";
import { toJSON } from "../../../utils/common/localstorage";

export const sheduleListStorage = () => {
  const storage = {
    get: () => ({
      sheduleList: fromJSON(
        localStorage.getItem("sheduleList")
      ) as ScheduleDateItems | null,
    }),
    set: (sheduleList: ScheduleDateItems) => {
      localStorage.setItem("sheduleList", toJSON(sheduleList));
    },
    clear: () => {
      localStorage.setItem("sheduleList", null);
    },
  };
  return storage;
};
