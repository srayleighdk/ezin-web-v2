import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectAppState = (state) => {
  return state.appState || initialState;
};

const makeSelectAuth = () =>
  createSelector(selectAppState, (substate) => substate.auth);
const makeSelectShowModal = () =>
  createSelector(selectAppState, (substate) => substate.bShow);

const makeSelectActivation = () =>
  createSelector(selectAppState, (substate) => substate.activation);

const makeSelectCart = () =>
  createSelector(selectAppState, (substate) => substate.cart);

const makeSelectCartVisible = () =>
  createSelector(selectAppState, (substate) => substate.cartVisible);

const makeSelectActivationVisible = () =>
  createSelector(selectAppState, (substate) => substate.activationVisible);

export {
  makeSelectAuth,
  makeSelectShowModal,
  makeSelectActivation,
  makeSelectCart,
  makeSelectCartVisible,
  makeSelectActivationVisible,
};
