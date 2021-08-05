const updateUserLogin = (state, action) => {
  if (!action.isLoggedIn) {
    localStorage.removeItem('Auth')
  }
  return {
    ...state,
    isLoggedIn: action.isLoggedIn,
    name: action.isLoggedIn ? action.name : '',
  }
}

const loadUserData = (state, { user }) => {
  return { ...state, ...user }
}

export default function userReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_USER_LOGIN':
      return updateUserLogin(state, action.payload)
    case 'UPDATE_USER_DATA':
      return loadUserData(state, action.payload)
    case 'ADD_ITEM_TO_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.concat(action.payload),
      }

    case 'REMOVE_ITEM_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (item) => item._id !== action.payload._id
        ),
      }
    case 'ADD_ITEM_TO_CART':
      action.payload.quantityInCart = 1
      if (action.payload.IsWishlisted === true) {
        action.payload.IsWishlisted = false
        return {
          ...state,
          cart: state.cart.concat(action.payload),
          wishlist: state.wishlist.filter(
            (item) => item._id !== action.payload._id
          ),
        }
      } else {
        return {
          ...state,
          cart: state.cart.concat(action.payload),
          wishlist: state.wishlist.filter(
            (item) => item._id !== action.payload._id
          ),
        }
      }

    case 'REMOVE_ITEM_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload._id),
      }

    case 'ADD_ITEM_FROM_WISHLIST_TO_CART':
      return {
        ...state,
        cart: state.cart.concat(action.payload),
      }

    case 'INCREASE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((item) => {
          return item._id === action.payload._id
            ? { ...item, quantityInCart: item.quantityInCart + 1 }
            : item
        }),
        wishlist: state.wishlist.filter(
          (item) => item._id !== action.payload._id
        ),
      }

    case 'DECREASE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((item) => {
          return item._id === action.payload._id
            ? { ...item, quantityInCart: item.quantityInCart - 1 }
            : item
        }),
      }
    default:
      return state
  }
}
