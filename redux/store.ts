// Core
import { createStore, applyMiddleware } from "redux";
import { createWrapper } from "next-redux-wrapper";

// Instruments
import { rootReducer } from "./rootReducer";
import { rootSaga } from "./rootSaga";
import { composeEnhancers, middleware, sagaMiddleware } from "./middleware";

const makeStore = (context) => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware))
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapperSome = createWrapper(makeStore);
