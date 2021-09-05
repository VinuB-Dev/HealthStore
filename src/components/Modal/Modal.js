import styles from './Modal.module.css'
import { useState } from 'react'

export default function Modal(props) {
  const [modal, showModal] = useState(0)
  const [text, setText] = useState('')

  const [current_address, setAddress] = useState(props.address)
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })
  function submit(e) {
    const fileList = e.target.value
    setText(fileList)
  }

  function onChangeHandler(e) {
    setUserData({
      ...userData,
      [e.currentTarget.id]: JSON.parse(JSON.stringify(e.currentTarget.value)),
    })
  }

  return (
    <div>
      <div
        class={styles.modalBtnClick}
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
          />
          <label>City</label>
          <input id='city' type='text' required placeholder='enter city' />
          <label>State</label>
          <input id='state' type='text' required placeholder='enter state' />
          <label>Pincode</label>
          <input
            id='pincode'
            type='number'
            required
            placeholder='Enter pincode'
          />
          <label>Phone number</label>
          <input
            id='pnumber'
            type='tel'
            required
            placeholder='Enter Phone number'
          />
          <button type='submit' className='link_btn'>
            Add address
          </button>
        </form>
      </div>
    </div>
  )
}
