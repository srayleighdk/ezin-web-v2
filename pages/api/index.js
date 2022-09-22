import eZinApi from './axios';

/***
 * HOME PAGE
 */
export const getHeader = () => eZinApi.get(`/menu/main`);

/***
 * USERS
 */
