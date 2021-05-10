export default function reducerFunc(state, action) {
  switch (action.type) {
    case "ADD_ITEM_TO_WISHLIST":
      if (action.payload.IsInCart === true) {
        return state;
      } else {
        action.payload.IsWishlisted = true;
        return {
          ...state,
          wishListItems: state.wishListItems.concat(action.payload)
        };
      }

    case "REMOVE_ITEM_FROM_WISHLIST":
      action.payload.IsWishlisted = false;
      return {
        ...state,
        wishListItems: state.wishListItems.filter(
          (item) => item._id !== action.payload._id
        )
      };

    case "ADD_ITEM_TO_CART":
      action.payload.IsInCart = true;
      action.payload.QuantityInCart = 1;
      if (action.payload.IsWishlisted === true) {
        action.payload.IsWishlisted = false;
        return {
          ...state,
          cartItems: state.cartItems.concat(action.payload),
          wishListItems: state.wishListItems.filter(
            (item) => item._id !== action.payload._id
          )
        };
      } else {
        return {
          ...state,
          cartItems: state.cartItems.concat(action.payload),
          wishListItems: state.wishListItems.filter(
            (item) => item._id !== action.payload._id
          )
        };
      }

    case "REMOVE_ITEM_FROM_CART":
      action.payload.IsInCart = false;
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload._id
        )
      };

    case "ADD_ITEM_FROM_WISHLIST_TO_CART":
      action.payload.IsInCart = true;
      return {
        ...state,
        cartItems: state.cartItems.concat(action.payload)
      };

    case "TOGGLE_CASH_ON_DELIVERY":
      return (state = {
        ...state,
        showCashOnDelivery: !state.showCashOnDelivery
      });

    case "TOGGLE_FAST_DELIVERY":
      return (state = {
        ...state,
        showFastDeliveryOnly: !state.showFastDeliveryOnly
      });

    case "SORT":
      return {
        ...state,
        sortBy: action.payload
      };

    default:
      return state;
  }
}
