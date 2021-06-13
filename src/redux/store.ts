// Core
import { createStore, applyMiddleware } from "redux";
import { createWrapper } from "next-redux-wrapper";

// Instruments
import { getToken } from "utils/axios/axios.auth";
import { me } from "bus/auth/actions";
import { rootReducer } from "./rootReducer";
import { rootSaga } from "./rootSaga";
import { composeEnhancers, middleware, sagaMiddleware } from "./middleware";

const makeStore = (context) => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware))
  );
  sagaMiddleware.run(rootSaga);
  const tokens = context && getToken(context);
  if (tokens) store.dispatch(me(tokens));

  return store;
};

export const wrapperSome = createWrapper(makeStore);
