export default function reducerFunc(state, action) {
  switch (action.type) {
    case 'TOGGLE_CASH_ON_DELIVERY':
      return (state = {
        ...state,
        showCashOnDelivery: !state.showCashOnDelivery,
      })

    case 'TOGGLE_FAST_DELIVERY':
      return (state = {
        ...state,
        showFastDeliveryOnly: !state.showFastDeliveryOnly,
      })

    case 'SORT':
      return {
        ...state,
        sortBy: action.payload,
      }

    default:
      return state
  }
}
