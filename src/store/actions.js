export const INIT_ACTION = '[APP] INIT_ACTION';
export const SET_AUTH = '[APP] SET_AUTH';
export const SET_ACTIVATION = 'SET_ACTIVATION';
export const SET_CART = '[APP] SET_CART';
export const SET_CART_VISIBLE = '[APP] SET_CART_VISIBLE';
export const SET_ACTIVATION_VISIBLE = '[APP] SET_ACTIVATION_VISIBLE';

export const setAuth = (user) => ({ type: SET_AUTH, payload: user });
export const setActivation = (payload) => ({ type: SET_ACTIVATION, payload });
export const setCart = (payload) => ({ type: SET_CART, payload });
export const setCartVisible = (payload) => ({ type: SET_CART_VISIBLE, payload });
export const setActivationVisible = (payload) => ({ type: SET_ACTIVATION_VISIBLE, payload });