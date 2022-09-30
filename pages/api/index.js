import eZinApi from './axios';
import eZinApiNode from './axiosNode';
/***
 * HOME PAGE
 */
export const getHeader = () => eZinApi.get(`/menu/main`);
export const getPageContents = (key) => eZinApi.get(`/contents/key/${key}`);
export const getAllNodeProducts = () => eZinApi.get(`/node/allproducts`); 
export const getHomeData = () => eZinApi.get(`/contents/home`)
/***
 * NEWS (LIFE & NEWS)
 */
export const getLatestPosts = (query) => eZinApi.get(`post/all?${query || ''}`);
export const getPostCategories = () => eZinApi.get(`postcategory`);
export const getNewestPost = () => eZinApi.get(`post/newest`);
