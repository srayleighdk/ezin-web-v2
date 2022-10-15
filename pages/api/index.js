import eZinApi from "./axios";
import eZinApiNode from "./axiosNode";
/***
 * HOME PAGE
 */
export const getHeader = () => eZinApi.get(`/menu/main`);
export const getPageContents = (key) => eZinApi.get(`/contents/key/${key}`);
export const getAllNodeProducts = () => eZinApi.get(`/node/allproducts`);
export const getHomeData = () => eZinApi.get(`/contents/home`);
/***
 * NEWS (LIFE & NEWS)
 */

export const API = {
  newsList: `/news`,
  newsDetails: `/news/byurl`,
};
export const getLatestPosts = (query) => eZinApi.get(`post/all?${query || ""}`);
export const getPostCategories = () => eZinApi.get(`postcategory`);
export const getNewestPost = () => eZinApi.get(`post/newest`);
export const getPostDetails = (id) => eZinApi.get(`post/byid/${id}`);
export const getPostByCategory = (id) => eZinApi.get(`post/bycat/${id}`);
export const getNewsByChuDe = (slug) =>
  eZinApi.get(`${API.newsList}/chu-de/${slug}`);
export const getPostByTag = (id) => eZinApi.get(`post/bytag/${id}`);
export const getNewsDetails = (id) => eZinApi.get(`${API.newsDetails}/${id}`);
export const getNews = (query) => eZinApi.get(`${API.newsList}?${query || ""}`);

/***
 * KIEN THUC
 */
export const getHomeBlogs = () => eZinApi.get(`/blog/public`);
export const getAllBlogCats = () => eZinApi.get(`/blog/category`);
export const getBlogDetail = (slug) => eZinApi.get(`/blog/blog/${slug}`);

/***
 * PRODUCT
 */
export const getProduct = (slug) => eZinApi.get(`/product/slug/${slug}`);
export const getNodePackages = (product_id) =>
  eZinApiNode.get(`/node/packages?product_id=${product_id}`);

/*
 * FAQ
 */
export const getFAQ = () => eZinApi.get(`faq/cat`);
export const getFAQContent = (catId) => eZinApi.get(`/faq/bycat/${catId}`);

/*
 * FAQ
 */
export const registerApi = ({ username, password, legal_id, referal_link }) =>
  new Promise((resolve, reject) => {
    eZinApi
      .post(`/account/register`, {
        username,
        password,
        legal_id,
        referal_link,
      })
      .then((rs) => {
        resolve(rs.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

/*
 * Login & Register
 */
export const verifyAccountApi = ({ username, otp }) =>
  new Promise((resolve, reject) => {
    eZinApi
      .post(`/account/register/verify`, {
        username,
        otp,
      })
      .then((rs) => resolve(rs.data))
      .catch((err) => {
        reject(err);
      });
  });

export const newPasswordApi = ({ username, newpassword, full_name, email }) =>
  new Promise((resolve, reject) => {
    eZinApi
      .post(`/account/password/new`, {
        username,
        newpassword,
        full_name,
        email,
      })
      .then((rs) => resolve(rs.data))
      .catch((err) => {
        reject(err);
      });
  });

export const resendOTPApi = ({ username }) =>
  new Promise((resolve, reject) => {
    eZinApi
      .post(`/account/password/sendotp`, {
        username,
      })
      .then((rs) => resolve(rs.data))
      .catch((err) => {
        reject(err);
      });
  });

export const loginApi = ({ username, password }) =>
  new Promise((resolve, reject) => {
    eZinApi
      .post(`/account/login`, {
        username,
        password,
      })
      .then((rs) => resolve(rs.data))
      .catch((err) => {
        reject(err);
      });
  });

export const getProfile = () => eZinApi.get(`/account/info`);
/*
 * EzStore
 */
export const getTopStore = () => eZinApiNode.get(`/node/store/top`);

/*
 * Place
 */
export const getDistricts = (parent_code) =>
  eZinApi.get(`/district/${parent_code}`);
export const getWards = (parent_code) => eZinApi.get(`/ward/${parent_code}`);
export const getCities = () => eZinApi.get(`/city`);



/***
* Kich Hoat The
*/

export const getCardInfoByShortId = (payload) =>
  new Promise((resolve, reject) => {
    eZinApi
      .post(`/card/by-short-id`, payload)
      .then((rs) => resolve(rs.data))
      .catch((err) => {
        reject(err);
      });
  });


export const getCardInfo = ({ seri, code }) =>
  new Promise((resolve, reject) => {
    eZinApi
      .get(`${API.getCardInfo}/${seri}/${code}`)
      .then((rs) => resolve(rs.data))
      .catch((err) => {
        reject(err);
      });
  });


