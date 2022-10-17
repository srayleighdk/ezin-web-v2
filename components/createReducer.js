import { combineReducers } from "redux";
import modalReducer from "./store/modal/reducer";
import appReducer from "./store/reducer";

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    appState: appReducer,
    modalState: modalReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
