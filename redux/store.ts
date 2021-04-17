// Core
import { createStore, applyMiddleware } from "redux";
import { createWrapper } from "next-redux-wrapper";

// Instruments
import { rootReducer } from "./rootReducer";
import { rootSaga } from "./rootSaga";
import { composeEnhancers, middleware, sagaMiddleware } from "./middleware";
import { getToken } from "../axios/axios.auth";
import { me } from "../src/bus/auth/actions";

const makeStore = (context) => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware))
  );
  sagaMiddleware.run(rootSaga);
  const token = context && getToken(context);
  if (token) store.dispatch(me(token));

  return store;
};

export const wrapperSome = createWrapper(makeStore);
