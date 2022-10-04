import eZinApi from './axios';

/***
 * HOME PAGE
 */
export const getHeader = () => eZinApi.get(`/menu/main`);

/***
 * NEWS (LIFE & NEWS)
 */

 export const API = {
    newsList: `/news`,
 }
export const getLatestPosts = (query) => eZinApi.get(`post/all?${query || ''}`);
export const getPostCategories = () => eZinApi.get(`postcategory`);
export const getNewestPost = () => eZinApi.get(`post/newest`);
export const getPostDetails = (id) => eZinApi.get(`post/byid/${id}`);
export const getPostByCategory = (id) => eZinApi.get(`post/bycat/${id}`);
export const getNewsByChuDe = (slug) => eZinApi.get(`${API.newsList}/chu-de/${slug}`);
