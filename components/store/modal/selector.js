import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectAppState = (state) => {
  return state.modalState || initialState;
};

const makeOTPVisible = () =>
  createSelector(selectAppState, (substate) => substate.otpVisible);

const makeModalData = () =>
  createSelector(selectAppState, (substate) => substate.data);

export { makeOTPVisible, makeModalData };
