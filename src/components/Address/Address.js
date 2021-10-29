import './Address.css'
import { useState } from 'react'
import styles from '../Modal/Modal.module.css'
import { useUser } from '../../context/user/userContext'
import { AiOutlineEdit } from 'react-icons/ai'
import { AiFillDelete } from 'react-icons/ai'
import { useNavigate } from 'react-router'
import {
  addAddress,
  clearCart,
  deleteAddress,
  getOrderId,
  updateAddress,
} from '../../Services/user.service'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

async function ShowRazorpay(amount, payment, dismiss) {
  const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

  if (!res) {
    alert('Razorpay SDK failed to load')
    return
  }
  const response = await getOrderId(amount * 100)
  let data = response.data
  console.log(data)

  const options = {
    key: 'rzp_test_D140ET0Eed3Fyf',
    currency: 'INR',
    amount: data.amount.toString() * 100,
    order_id: data.id,
    name: 'HealthStore order',
    description: 'Thank you for ordering. Please pay the amount',
    handler: function (response) {
      payment(response)
    },
    modal: {
      ondismiss: () => dismiss(),
    },
    theme: {
      color: '#3399cc',
    },
  }
  const paymentObject = new window.Razorpay(options)
  paymentObject.open()
}

export default function Address() {
  const {
    userState: { address, finalPrice },
    userDispatch,
  } = useUser()

  const navigate = useNavigate()
  const notify = () => toast('Order successfull! Redirecting to Homepage')
  const error_toast = () =>
    toast('Transaction failed! Please click on order now to order')

  const payment = async (response) => {
    userDispatch({ type: 'CLEAR_CART', payload: '' })
    const respo = await clearCart()
    console.log(respo)
    notify()
    if (response) setTimeout(() => navigate('/'), 3000)
  }

  function dismiss() {
    setProcessing(0)
    error_toast()
  }

  function Modal() {
    const [modal, showModal] = useState(0)
    const [actual_address, setAddress] = useState({
      _id: address.length,
      address: '',
      city: '',
      state: '',
      phone: '',
      pincode: '',
    })

    const submit = async (e) => {
      e.preventDefault()
      userDispatch({ type: 'ADD_ADDRESS', payload: actual_address })
      const response = await addAddress(actual_address)
      if (!response.success) {
        userDispatch({ type: 'REMOVE_ADDRESS', payload: actual_address })
      }
    }

    function onChangeHandler(e) {
      setAddress({
        ...actual_address,
        [e.currentTarget.id]: JSON.parse(JSON.stringify(e.currentTarget.value)),
      })
    }

    return (
      <div>
        <div
          class='cart_btn-yellow product-desc'
          style={{ width: 'fit-content', margin: 'auto', marginTop: '1rem' }}
          onClick={() => {
            showModal(!modal)
          }}
        >
          Add address
        </div>
        <div
          class={styles.modalOverlay}
          style={{ display: modal ? 'block' : 'none' }}
          onClick={() => showModal(!modal)}
        ></div>
        <div
          className={styles.modalDesktop}
          style={{ display: modal ? 'block' : 'none' }}
        >
          <form
            className='auth-form'
            style={{ borderTop: '1px solid' }}
            onSubmit={submit}
          >
            <div></div>
            <h3>Add address</h3>
            <label>Address</label>
            <input
              id='address'
              type='text'
              required
              placeholder='Enter address'
              autoComplete='off'
              value={actual_address.address}
              onChange={onChangeHandler}
            />
            <label>City</label>
            <input
              id='city'
              type='text'
              required
              placeholder='enter city'
              value={actual_address.city}
              onChange={onChangeHandler}
            />
            <label>State</label>
            <input
              id='state'
              type='text'
              required
              placeholder='enter state'
              value={actual_address.state}
              onChange={onChangeHandler}
            />
            <label>Pincode</label>
            <input
              id='pincode'
              type='number'
              required
              placeholder='Enter pincode'
              value={actual_address.pincode}
              onChange={onChangeHandler}
            />
            <label>Phone number</label>
            <input
              id='phone'
              type='tel'
              required
              placeholder='Enter Phone number'
              value={actual_address.phone}
              onChange={onChangeHandler}
            />
            <button type='submit' className='link_btn'>
              Add address
            </button>
          </form>
        </div>
      </div>
    )
  }

  function EditModal({ location }) {
    const [modal, showModal] = useState(0)
    const [current_address, setAddress] = useState(location)

    const submit = async (e) => {
      e.preventDefault()
      userDispatch({ type: 'UPDATE_ADDRESS', payload: current_address })
      const response = await updateAddress(current_address)
      if (!response.success) {
        userDispatch({ type: 'REMOVE_ADDRESS', payload: current_address })
        userDispatch({ type: 'ADD_ADDRESS', payload: current_address })
      }
    }

    function onChangeHandler(e) {
      setAddress({
        ...current_address,
        [e.currentTarget.id]: JSON.parse(JSON.stringify(e.currentTarget.value)),
      })
    }

    return (
      <div>
        <div
          onClick={() => {
            showModal(!modal)
          }}
        >
          <AiOutlineEdit />
        </div>
        <div
          class={styles.modalOverlay}
          style={{ display: modal ? 'block' : 'none' }}
          onClick={() => showModal(!modal)}
        ></div>
        <div
          className={styles.modalDesktop}
          style={{ display: modal ? 'block' : 'none' }}
        >
          <form
            className='auth-form'
            style={{ borderTop: '1px solid' }}
            onSubmit={submit}
          >
            <div></div>
            <h3>Edit address</h3>
            <label>Address</label>
            <input
              id='address'
              type='text'
              required
              placeholder='Enter address'
              autoComplete='off'
              value={current_address.address}
              onChange={onChangeHandler}
            />
            <label>City</label>
            <input
              id='city'
              type='text'
              required
              placeholder='enter city'
              value={current_address.city}
              onChange={onChangeHandler}
            />
            <label>State</label>
            <input
              id='state'
              type='text'
              required
              placeholder='enter state'
              value={current_address.state}
              onChange={onChangeHandler}
            />
            <label>Pincode</label>
            <input
              id='pincode'
              type='number'
              required
              placeholder='Enter pincode'
              value={current_address.pincode}
              onChange={onChangeHandler}
            />
            <label>Phone number</label>
            <input
              id='phone'
              type='tel'
              required
              placeholder='Enter Phone number'
              value={current_address.phone}
              onChange={onChangeHandler}
            />
            <button type='submit' className='link_btn'>
              Update address
            </button>
          </form>
        </div>
      </div>
    )
  }

  const [selectedAddress, updateSelected] = useState(
    address[0]
      ? address[0]
      : {
          _id: address.length,
          address: '',
          city: '',
          state: '',
          phone: '',
          pincode: '',
        }
  )

  const deleteAdd = async (address) => {
    userDispatch({ type: 'REMOVE_ADDRESS', payload: address })
    const response = await deleteAddress(address)
    if (!response.success) {
      userDispatch({ type: 'ADD_ADDRESS', payload: actual_address })
    }
  }

  const [processing, setProcessing] = useState(false)

  return (
    <div>
      <Modal />
      {address.map((address) => {
        return (
          <div
            style={{
              margin: '1rem auto',
              width: 'fit-content',
              display: 'flex',
              gap: '1rem',
              border: '2px solid',
              padding: '1rem',
            }}
          >
            <input
              type='radio'
              value={address._id}
              name='address'
              onChange={() => updateSelected(address)}
              checked={selectedAddress && selectedAddress._id === address._id}
            />
            <div
              style={{
                textAlign: 'left',
                width: '20rem',
              }}
            >
              <div>{address.address}</div>
              <div>{address.city}</div>
              <div>{address.state}</div>
              <div>{address.pincode}</div>
              <div>{address.phone}</div>
            </div>
            <div style={{ cursor: 'pointer' }}>
              <EditModal location={address} />
            </div>
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => deleteAdd(address)}
            >
              <AiFillDelete />
            </div>
          </div>
        )
      })}
      {address.length > 0 && selectedAddress.address && finalPrice ? (
        <button
          className='cart_btn-yellow product-desc'
          disabled={processing}
          onClick={() => {
            finalPrice > 0 ? ShowRazorpay(finalPrice, payment, dismiss) : ''
            setProcessing(true)
          }}
        >
          {processing ? 'Order processing..' : 'Order Now'}
        </button>
      ) : (
        ''
      )}
      {!finalPrice ? (
        <div
          style={{
            backgroundColor: 'yellow',
            width: 'fit-content',
            margin: 'auto',
            padding: '1rem',
          }}
        >
          Please go to the cart and select the order to continue
        </div>
      ) : (
        ''
      )}
      <ToastContainer position='top-center' autoClose={3000} />
    </div>
  )
}
