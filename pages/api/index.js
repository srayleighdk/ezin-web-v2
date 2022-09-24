import eZinApi from './axios';

/***
 * HOME PAGE
 */
export const getHeader = () => eZinApi.get(`/menu/main`);

/***
 * NEWS (LIFE & NEWS)
 */
export const getLatestPosts = (query) => eZinApi.get(`post/all?${query || ''}`);
export const getPostCategories = () => eZinApi.get(`postcategory`);
export const getNewestPost = () => eZinApi.get(`post/newest`);
