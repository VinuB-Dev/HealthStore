export const isWishlisted = (product, list) => {
  return list.reduce((acc, item) => {
    return product._id === item._id ? acc || true : acc || false
  }, false)
}

export const addTokenToStorage = (token) => {
  localStorage.setItem(
    'Auth',
    JSON.stringify({ isLoggedIn: true, token: token })
  )
}

export const getToken = () => {
  return JSON.parse(localStorage.getItem('Auth'))?.token
}
