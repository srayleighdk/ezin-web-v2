import { combineReducers } from "redux";
import modalReducer from "../src/store/modal/reducer";
import appReducer from "../src/store/reducer";

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    appState: appReducer,
    modalState: modalReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
