import { fromJSON, toJSON } from "../../../utils/common/localstorage";

const storageName = "history";

export type History =
  | [
      {
        url: string;
        date: number;
        title: string;
      }
    ]
  | null;

const HistoryStorage = {
  get: () => {
    return (
      process.browser &&
      (fromJSON(localStorage.getItem(storageName)) as History)
    );
  },
  set: (url: string) => {
    const prev: History = HistoryStorage.get();
    const history: any[] = prev ?? [];
    const current: History[0] = {
      url,
      date: Date.now(),
      title: `${document?.title || ""}`,
    };
    history.push(current);
    process.browser &&
      localStorage.setItem(storageName, toJSON(history as History));
  },
  clear: () => {
    process.browser && localStorage.removeItem(storageName);
  },
};

export default HistoryStorage;
