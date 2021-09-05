const updateUserLogin = (state, payload) => {
  if (!payload.isLoggedIn) {
    localStorage.removeItem('Auth')
    return {
      ...state,
      _id: '',
      isLoggedIn: false,
      wishlist: [],
      cart: [],
      address: [],
      finalPrice: 0,
    }
  }
  return {
    ...state,
    isLoggedIn: payload.isLoggedIn,
    name: payload.isLoggedIn ? payload.name : '',
  }
}

const loadUserData = (state, { user }) => {
  console.log(user)
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
    case 'ADD_ADDRESS':
      return {
        ...state,
        address: state.address.concat(action.payload),
      }
    case 'UPDATE_ADDRESS':
      console.log('coming')
      return {
        ...state,
        address: state.address.map((loc) => {
          return loc._id === action.payload._id
            ? {
                ...loc,
                address: action.payload.address,
                city: action.payload.city,
                state: action.payload.state,
                pincode: action.payload.pincode,
                phone: action.payload.phone,
              }
            : loc
        }),
      }
    case 'REMOVE_ADDRESS':
      return {
        ...state,
        address: state.address.filter((loc) => loc._id !== action.payload._id),
      }
    case 'UPDATE_PRICE':
      return {
        ...state,
        finalPrice: action.payload,
      }
    default:
      return state
  }
}
