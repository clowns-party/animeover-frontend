// Core
import { compose, Middleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { axiosMiddleware } from "../axios/axios.middleware";

const DEV = process.env.NODE_ENV === "development";

const isBrowser = (process as any).browser;

const sagaMiddleware = createSagaMiddleware();
const devtools =
  isBrowser && window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = DEV && devtools ? devtools : compose;

const middleware: Middleware[] = [sagaMiddleware, axiosMiddleware];

export { composeEnhancers, middleware, sagaMiddleware };
