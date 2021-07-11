import React from "react";
import "antd/dist/antd.css";
import withReduxSaga from "next-redux-saga";
import { wrapperSome } from "redux/store";
import "../styles/globals.css";
import useRouteUrlHistory from "bus/history/hooks/useRouteUrlHistory";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { BottomLayout } from "Elements/layout/BottomLayout";

function MyApp({ Component, pageProps }: AppProps) {
  useRouteUrlHistory();

  return (
    <BottomLayout>
      <Component {...pageProps} />
    </BottomLayout>
  );
}
export default wrapperSome.withRedux(withReduxSaga(MyApp));
