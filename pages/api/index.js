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
    newsDetails: `/news/byurl`,
 }
export const getLatestPosts = (query) => eZinApi.get(`post/all?${query || ''}`);
export const getPostCategories = () => eZinApi.get(`postcategory`);
export const getNewestPost = () => eZinApi.get(`post/newest`);
export const getPostDetails = (id) => eZinApi.get(`post/byid/${id}`);
export const getPostByCategory = (id) => eZinApi.get(`post/bycat/${id}`);
export const getNewsByChuDe = (slug) => eZinApi.get(`${API.newsList}/chu-de/${slug}`);
export const getPostByTag = (id) => eZinApi.get(`post/bytag/${id}`);
export const getNewsDetails = (id) => eZinApi.get(`${API.newsDetails}/${id}`);
export const getNews = (query) => eZinApi.get(`${API.newsList}?${query || ''}`);

/***
 * KIEN THUC
 */
export const getHomeBlogs = () => eZinApi.get(`/blog/public`);
export const getAllBlogCats = () => eZinApi.get(`/blog/category`);
export const getBlogDetail = (slug) => eZinApi.get(`/blog/blog/${slug}`);