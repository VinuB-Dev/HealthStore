import './Cart_module.css'
import { useUser } from '../../context/user/userContext'
import { Link } from 'react-router-dom'
import {
  incrementQuantity,
  decrementQuantity,
  cartRemove,
} from '../../Services/user.service'

const ShowItem = () => {
  const {
    userState: { cart },
    userDispatch,
  } = useUser()

  const increaseQuantity = async (product) => {
    const promise = incrementQuantity(product._id)
    userDispatch({ type: 'INCREASE_QUANTITY', payload: product })
    const response = await promise
    if (!response.success) {
      userDispatch({ type: 'DECREASE_QUANTITY', payload: product })
    }
  }

  const decreaseQuantity = async (product) => {
    const promise = decrementQuantity(product._id)
    userDispatch({ type: 'DECREASE_QUANTITY', payload: product })
    const response = await promise
    if (!response.success) {
      userDispatch({ type: 'INCREASE_QUANTITY', payload: product })
    }
  }

  const removeFromCart = async (product) => {
    const promise = cartRemove(product._id)
    userDispatch({
      type: 'REMOVE_ITEM_FROM_CART',
      payload: product,
    })
    const response = await promise
    if (!response.success) {
      userDispatch({ type: 'ADD_ITEM_TO_CART', payload: product })
    }
  }

  return cart.map((product) => {
    return (
      <div key={product._id} className='card'>
        <div>
          <img className='card-img' src={product.imageURL} alt='' />
        </div>
        <div className='card-desc'>
          <span className='title_cart'>{product.name}</span>
          <div className='price-flex1'>
            <div>₹ {product.final_price}</div>
          </div>
          <span className='product-desc1'>{product.description} </span>
          <div className='button-flex'>
            {product.quantityInCart > 1 && (
              <button
                className='cart_btn-yellow'
                onClick={() => decreaseQuantity(product)}
              >
                -
              </button>
            )}
            <p style={{ marginTop: '2rem' }}>{product.quantityInCart}</p>
            <button
              className='cart_btn-yellow'
              onClick={() => increaseQuantity(product)}
            >
              +
            </button>
          </div>
          <div className='button-flex'>
            <button
              className='cart_btn-yellow'
              onClick={() => removeFromCart(product)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    )
  })
}

const CartCard = () => {
  const {
    userState: { cart },
  } = useUser()
  const { TotalPrice, FinalPrice, discount } = addCost(cart)
  return (
    <div className='CartCard'>
      <div className='card-heading'>Price Details:</div>
      <div className='card-split'>
        <div>
          <div>Total MRP:</div>
          <div>Total Discount:</div>
          <div className='final'>Final Price:</div>
        </div>
        <div>
          <div>₹ {TotalPrice}</div>
          <div>₹ {discount}</div>
          <div className='final'>₹ {FinalPrice}</div>
        </div>
      </div>
      <div className='button-flex'>
        <button className='cart_btn-yellow product-desc'>Order Now</button>
      </div>
    </div>
  )
}

const addCost = (cart) => {
  const TotalPrice = cart.reduce(
    (count, item) => count + item.final_price * item.quantityInCart,
    0
  )
  const discount = TotalPrice / 10
  const FinalPrice = TotalPrice - discount
  return { TotalPrice, FinalPrice, discount }
}

export default function Cart() {
  const {
    userState: { cart },
  } = useUser()

  return (
    <div>
      {cart.length > 0 && (
        <div>
          <h3>Items in Cart: {cart.length}</h3>
          <div className='making-grids'>
            <div className='allItems'>
              <ShowItem />
            </div>
            <div div className='allItems'>
              <CartCard value={cart} />
            </div>
          </div>
        </div>
      )}
      {cart.length === 0 && (
        <h3 style={{ textAlign: 'center', marginLeft: '3rem' }}>
          No Products in your Cart
          <button className='primary_btn-yellow'>
            <Link to='/products'>Check All Products</Link>
          </button>
        </h3>
      )}
    </div>
  )
}
