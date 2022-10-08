const ACCESS_TOKEN = 'token';
const USER = 'user';
export function setToken(token) {
  localStorage.setItem(ACCESS_TOKEN, token);
}
export function getToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}
export function removeToken() {
  localStorage.removeItem(ACCESS_TOKEN);
}

export function setUser(user) {
  localStorage.setItem(USER, JSON.stringify(user));
}
export function getUser() {
  return JSON.parse(localStorage.getItem(USER) || '{}');
}
export function removeUser() {
  localStorage.removeItem(USER);
}

// export const capitalizeString = sentence => {
//   if (!sentence) {
//     return '';
//   }
//   let wordsArray = sentence
//     .trim()
//     .toLowerCase()
//     .split(' ');
//   let capsArray = wordsArray.map(word => {
//     return word.replace(word[0], word[0].toUpperCase());
//   });
//   return capsArray.join(' ');
// };

export const createMarkup = rawString => {
  return { __html: rawString && rawString.replace(/\r\n|\n|\r/gm, '<br/>') };
};


export const createMarkupNormal = (htmlContent) => {
  return { __html: htmlContent };
};

// return { __html: rawString.replace(/\r\n|\n|\r/gm, '<br/>') };
