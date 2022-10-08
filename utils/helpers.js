export const getImageUrl = (path = "") => {
  const urls = {
    development: "http://localhost:5050",
    test: "https://sandbox.ezin.vn",
    staging: "https://sandbox.ezin.vn",
    production: "https://api.ezin.vn",
  };
  let url = urls[process.env.NEXT_PUBLIC_APP_ENV];
  if (path) {
    url += "/" + path;
  }
  return url;
};

export const formatVND = (value = 0) => {
  try {
    return `${Number(value.toFixed(1)).toLocaleString()}đ`;
  } catch (ex) {

  }
  return value
}