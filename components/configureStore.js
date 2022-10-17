/**
 * Create the store with dynamic reducers
 */
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import createReducer from "./createReducer";

export default function configureStores(initialState = {}) {
  const middlewares = [thunk];

  var enhancer = applyMiddleware(...middlewares);

  /* istanbul ignore next */
  if (process.env.NODE_ENV !== "production" && typeof window === "object") {
    enhancer = composeWithDevTools(enhancer);
  }

  const store = createStore(createReducer(), initialState, enhancer);
  // Extensions
  store.injectedReducers = {}; // Reducer registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module["hot"]) {
    module["hot"].accept("./createReducer.js", () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
