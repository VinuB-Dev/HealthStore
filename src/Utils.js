export const isWishlisted = (product, list) => {
  return list.reduce((acc, item) => {
    return product._id === item._id ? acc || true : acc || false;
  }, false);
};
//use reduce here

export const addTokenToStorage = (token) => {
  localStorage.setItem(
    "Auth",
    JSON.stringify({ isLoggedIn: true, token: token })
  );
};

export const getAuthToken = () =>
  localStorage.getItem("Auth") &&
  JSON.parse(localStorage.getItem("Auth"))["token"];

export const isLoggedInLocaly = () =>
  localStorage.getItem("Auth") &&
  JSON.parse(localStorage.getItem("Auth"))["isLoggedIn"];
