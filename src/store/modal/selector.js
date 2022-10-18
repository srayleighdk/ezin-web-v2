import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectAppState = (state) => {
  return state.modalState || initialState;
};

const makeLoginVisible = () =>
  createSelector(selectAppState, (substate) => substate.loginVisible);

const makeRegisterVisible = () =>
  createSelector(selectAppState, (substate) => substate.registerVisible);

const makeOTPVisible = () =>
  createSelector(selectAppState, (substate) => substate.otpVisible);

const makeForgotVisible = () =>
  createSelector(selectAppState, (substate) => substate.forgotVisible);

const makeModalData = () =>
  createSelector(selectAppState, (substate) => substate.data);

const makeNewPassVisible = () =>
  createSelector(selectAppState, (substate) => substate.newPassVisible);

const makeResetPassVisible = () =>
  createSelector(selectAppState, (substate) => substate.resetPassVisible);

const makeSelectParentModal = () =>
  createSelector(selectAppState, (substate) => substate.parentModal);

const makeTransactionInfoVisible = () =>
  createSelector(selectAppState, (substate) => substate.transactionInfoVisible);

export {
  makeLoginVisible,
  makeRegisterVisible,
  makeOTPVisible,
  makeForgotVisible,
  makeNewPassVisible,
  makeResetPassVisible,
  makeModalData,
  makeSelectParentModal,
  makeTransactionInfoVisible,
};
