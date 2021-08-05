import './Product_module.css'
import { FiShoppingCart } from 'react-icons/fi'
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs'
import { useUser } from '../../context/user/userContext'
import { isWishlisted } from '../../Utils'
import { Link, useNavigate } from 'react-router-dom'
import {
  wishlistAdd,
  wishlistRemove,
  cartAdd,
} from '../../Services/user.service'

export default function Product(value) {
  const {
    userState: { isLoggedIn, cart, wishlist },
    userDispatch,
  } = useUser()
  const navigate = useNavigate()
  const wishlistHandler = async (product) => {
    if (!isLoggedIn) {
      navigate('/login')
    } else {
      const promise = isWishlisted(product, wishlist)
        ? wishlistRemove(product._id)
        : wishlistAdd(product._id)

      isWishlisted(product, wishlist)
        ? userDispatch({
            type: 'REMOVE_ITEM_FROM_WISHLIST',
            payload: product,
          })
        : userDispatch({
            type: 'ADD_ITEM_TO_WISHLIST',
            payload: product,
          })

      const response = await promise

      if (!response.success) {
        isWishlisted(product, wishlist)
          ? userDispatch({
              type: 'REMOVE_ITEM_FROM_WISHLIST',
              payload: product,
            })
          : userDispatch({
              type: 'ADD_ITEM_TO_WISHLIST',
              payload: product,
            })
      }
    }
  }

  const cartHandler = async (product) => {
    if (!isLoggedIn) {
      navigate('/login')
    } else {
      let promise
      if (isWishlisted(product, cart) === false) {
        promise = cartAdd(product._id)
      }

      if (isWishlisted(product, cart) === false) {
        userDispatch({
          type: 'ADD_ITEM_TO_CART',
          payload: product,
        })
      }
      const response = await promise
      if (!response.success) {
        userDispatch({
          type: 'REMOVE_ITEM_FROM_CART',
          payload: product,
        })
      }
    }
  }

  return value.value.map((product) => {
    return (
      <div key={product.id} className='card2'>
        <div className='card-img2'>
          <img src={product.imageURL} alt='' />
        </div>
        <div className='card-desc2'>
          <span className='title2'>{product.name}</span>
          <div className='price-flex'>
            <div className='bold'>₹ {product.final_price}</div>
            <div className='actual-price'>₹ {product.original_price}</div>
          </div>
          <span className='product-desc2'>{product.description} </span>
          {!isWishlisted(product, cart) ? (
            <button
              className='primary_btn-yellow product-desc'
              onClick={() => cartHandler(product)}
            >
              Add To Cart
              <FiShoppingCart />
            </button>
          ) : (
            <button className='primary_btn-yellow product-desc'>
              <Link to='/cart'>
                Go to Cart <FiShoppingCart />
              </Link>
            </button>
          )}
          <button
            className='product-desc primary_btn-yellow'
            onClick={() => wishlistHandler(product)}
          >
            {isWishlisted(product, wishlist) ? (
              <BsFillBookmarkFill />
            ) : (
              <BsBookmark />
            )}
          </button>
        </div>
      </div>
    )
  })
}
