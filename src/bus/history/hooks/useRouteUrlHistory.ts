import React from "react";
import { useRouter } from "next/router";
import HistoryStorage from "../helpers/history.storage";

const useRouteUrlHistory = () => {
  const Router = useRouter();
  const handleBeforeHistoryChange = (url) => {
    const [nextUrl] = url?.split("?") || [];
    HistoryStorage.set(nextUrl || "/");
  };

  React.useEffect(() => {
    Router.events.on("beforeHistoryChange", handleBeforeHistoryChange);

    return () => {
      Router.events.off("beforeHistoryChange", handleBeforeHistoryChange);
    };
  }, []);
};

export default useRouteUrlHistory;
