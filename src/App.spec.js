import { addCost } from './components/Cart/Cart'

test('must check if cart value is correct and return the value', () => {
  const cart = [
    {
      final_price: 300,
      quantityInCart: 1,
    },
    {
      final_price: 300,
      quantityInCart: 2,
    },
    {
      final_price: 200,
      quantityInCart: 1,
    },
  ]
  const { TotalPrice, FinalPrice, discount } = addCost(cart)
  expect(FinalPrice).toBe(990)
})
