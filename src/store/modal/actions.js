export const TOGGLE_LOGIN_MODAL = '[MODAL] TOGGLE_LOGIN_MODAL';
export const TOGGLE_REGISTER_MODAL = '[MODAL] TOGGLE_REGISTER_MODAL';
export const TOGGLE_OTP_MODAL = '[MODAL] TOGGLE_OTP_MODAL';
export const TOGGLE_FORGOT_MODAL = '[MODAL] TOGGLE_FORGOT_MODAL';
export const TOGGLE_NEWPASSWORD_MODAL = '[MODAL] TOGGLE_NEWPASSWORD_MODAL';
export const TOGGLE_RESETPASSWORD_MODAL = '[MODAL] TOGGLE_RESETPASSWORD_MODAL';
export const TOGGLE_TRANSACTIONINFO_MODAL = '[MODAL] TOGGLE_TRANSACTIONINFO_MODAL';
export const SET_PARENT_MODAL = '[MODAL] SET_PARENT_MODAL';

export const toggleLoginModal = () => ({ type: TOGGLE_LOGIN_MODAL });
export const toggleRegisterModal = (payload) => ({
  type: TOGGLE_REGISTER_MODAL,
  payload,
});
export const toggleOTPModal = (payload) => ({ type: TOGGLE_OTP_MODAL, payload });
export const toggleForgot = () => ({ type: TOGGLE_FORGOT_MODAL });
export const toggleNewPass = () => ({ type: TOGGLE_NEWPASSWORD_MODAL });
export const toggleResetPass = () => ({ type: TOGGLE_RESETPASSWORD_MODAL });
export const setParentModal = (payload) => ({
  type: SET_PARENT_MODAL,
  payload,
});
export const toggleTransactionInfoModal = (payload) => ({ type: TOGGLE_TRANSACTIONINFO_MODAL, payload });
