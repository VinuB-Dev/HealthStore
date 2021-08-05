import './Login.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { RiLoginBoxFill } from 'react-icons/ri'
import { useState } from 'react'
import { login } from '../../Services/auth.service'
import { addTokenToStorage } from '../../Utils'
import { useUser } from '../../context/user/userContext'

export default function Login() {
  let from = ''
  const navigate = useNavigate()
  const { state } = useLocation()
  from = state?.from
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })

  const { userDispatch } = useUser()

  const submit = async (e) => {
    e.preventDefault()
    const response = await login({
      email: userData['email'],
      password: userData['password'],
    })

    if (response.success) {
      addTokenToStorage(response.token)
      userDispatch({
        type: 'UPDATE_USER_LOGIN',
        payload: {
          isLoggedIn: true,
          name: response.name,
        },
      })
      navigate(from || '/')
    }
  }

  function onChangeHandler(e) {
    setUserData({
      ...userData,
      [e.currentTarget.id]: JSON.parse(JSON.stringify(e.currentTarget.value)),
    })
  }
  return (
    <div className='auth-container'>
      <form className='auth-form' onSubmit={submit}>
        <h3>Login</h3>
        <label>Email</label>
        <input
          id='email'
          type='email'
          value={userData.email}
          required
          placeholder='Enter Email'
          autoComplete='off'
          onChange={onChangeHandler}
        />
        <label>Password</label>
        <input
          id='password'
          value={userData.password}
          type='password'
          required
          placeholder='Enter Password'
          onChange={onChangeHandler}
        />
        <button type='submit' className='link_btn'>
          <RiLoginBoxFill />
          Login
        </button>
        <div className='signup'>
          Not a user?{' '}
          <Link to='/signup' className='primary_link'>
            Signup
          </Link>
        </div>
      </form>
    </div>
  )
}
