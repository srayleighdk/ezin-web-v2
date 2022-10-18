import produce from 'immer';
import {
  TOGGLE_LOGIN_MODAL,
  TOGGLE_REGISTER_MODAL,
  TOGGLE_OTP_MODAL,
  TOGGLE_FORGOT_MODAL,
  TOGGLE_NEWPASSWORD_MODAL,
  TOGGLE_RESETPASSWORD_MODAL,
  TOGGLE_TRANSACTIONINFO_MODAL,
  SET_PARENT_MODAL,
} from './actions';

export const initialState = {
  loginVisible: false,
  registerVisible: false,
  otpVisible: false,
  forgotVisible: false,
  newPassVisible: false,
  resetPassVisible: false,
  transactionInfoVisible: false,
  parentModal: '',
  data: {
    phoneNumber: '',
    requestId: '',
  },
};

const reducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case TOGGLE_LOGIN_MODAL: {
        draft.loginVisible = !state.loginVisible;
        break;
      }
      case TOGGLE_REGISTER_MODAL: {
        draft.registerVisible = !state.registerVisible;
        if (payload) {
          draft.data.phoneNumber = payload;
        }
        break;
      }
      case TOGGLE_OTP_MODAL: {
        // console.log('TOGGLE_OTP_MODAL payload', payload)
        draft.otpVisible = !state.otpVisible;
        if (payload) {
          draft.data.phoneNumber = payload;
        }
        break;
      }
      case TOGGLE_FORGOT_MODAL: {
        draft.forgotVisible = !state.forgotVisible;
        break;
      }
      case TOGGLE_NEWPASSWORD_MODAL: {
        draft.newPassVisible = !state.newPassVisible;
        break;
      }
      case TOGGLE_RESETPASSWORD_MODAL: {
        draft.resetPassVisible = !state.resetPassVisible;
        break;
      }
      case TOGGLE_TRANSACTIONINFO_MODAL: {
        draft.transactionInfoVisible = !state.transactionInfoVisible;
        // console.log('TOGGLE_TRANSACTIONINFO_MODAL payload', payload)
        if (payload) {
          draft.data.requestId = payload;
        }
        break;
      }
      case SET_PARENT_MODAL: {
        // console.log(payload);
        draft.parentModal = payload;
        break;
      }
      default: {
        return state;
      }
    }
  });

export default reducer;
