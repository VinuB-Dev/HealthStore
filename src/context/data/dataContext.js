import { createContext, useContext, useReducer, useState } from 'react'
import reducerFunc from './dataReducer'
import { useEffect } from 'react'
import axios from 'axios'
export const CartContext = createContext()
export function useCart() {
  return useContext(CartContext)
}

export function CartProvider({ children }) {
  const [products, setProducts] = useState([])
  const [state, dispatch] = useReducer(reducerFunc, {
    showCashOnDelivery: false,
    showFastDeliveryOnly: false,
    sortBy: null,
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    const response = await axios.get(
      'https://HealthStore.bravesoldier.repl.co/products'
    )
    setProducts(response.data.products)
  }

  function getSortedData(productList, sortBy) {
    if (sortBy && sortBy === 'PRICE_HIGH_TO_LOW') {
      return productList.sort((a, b) => b.final_price - a.final_price)
    }

    if (sortBy && sortBy === 'PRICE_LOW_TO_HIGH') {
      return productList.sort((a, b) => a.final_price - b.final_price)
    }
    return productList
  }

  function getFilteredData(
    productList,
    showFastDeliveryOnly,
    showCashOnDelivery
  ) {
    return productList
      .filter((item) => (showFastDeliveryOnly ? item.hasFastDelivery : item))
      .filter((item) => (showCashOnDelivery ? item.hasCashOnDelivery : item))
  }

  const sortedData = getSortedData(products, state.sortBy)
  const filteredData = getFilteredData(
    sortedData,
    state.showFastDeliveryOnly,
    state.showCashOnDelivery
  )

  return (
    <CartContext.Provider
      value={{
        filteredData,
        state,
        dispatch,
        getSortedData,
        getFilteredData,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
