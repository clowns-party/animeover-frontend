import React from "react";
import App from "next/app";
import "antd/dist/antd.css";
import withReduxSaga from "next-redux-saga";
import { wrapperSome } from "../redux/store";
import "../styles/globals.css";

class ExampleApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default wrapperSome.withRedux(withReduxSaga(ExampleApp));
