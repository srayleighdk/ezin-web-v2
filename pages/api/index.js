import eZinApi from './axios';

/***
 * HOME PAGE
 */
export const getHeader = () => eZinApi.get(`/menu/main`);
export const getPageContents = (key) =>eZinApi.get(`/contents/key/${key}`);
/***
 * USERS
 */
