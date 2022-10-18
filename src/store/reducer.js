import produce from "immer";
import {
  SET_AUTH,
  SET_ACTIVATION,
  SET_CART,
  SET_CART_VISIBLE,
  SET_ACTIVATION_VISIBLE,
} from "./actions";

export const initialState = {
  auth: {},
  activation: { seri: "", code: "" },
  cart: {},
  cartVisible: false,
  activationVisible: false,
};

const reducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case SET_AUTH: {
        // console.log('payload', payload)
        draft.auth = payload;
        break;
      }
      case SET_ACTIVATION: {
        draft.activation = payload;
        break;
      }
      case SET_CART: {
        console.log("SET CART", payload);
        draft.cart = payload;
        break;
      }
      case SET_CART_VISIBLE: {
        draft.cartVisible = payload;
        break;
      }
      case SET_ACTIVATION_VISIBLE: {
        draft.activationVisible = payload;
        break;
      }
      default: {
        return state;
      }
    }
  });

export default reducer;
