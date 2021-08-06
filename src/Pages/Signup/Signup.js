import './Signup.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { RiLoginBoxFill } from 'react-icons/ri'
import { useEffect, useState } from 'react'
import { signup } from '../../Services/auth.service'
import { useUser } from '../../context/user/userContext'
import { addTokenToStorage } from '../../Utils'

export default function Signup() {
  let from = ''
  const navigate = useNavigate()
  const { state } = useLocation()
  from = state?.from
  const { userDispatch } = useUser()
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    'confirm password': '',
  })

  const [errorMessage, setErrorMessage] = useState('')
  const [error, setError] = useState(0)
  const [loading, setLoading] = useState(0)

  const submit = async (e) => {
    setLoading(1)
    e.preventDefault()

    if (userData['confirm password'] === userData['password']) {
      const response = await signup({
        name: userData['name'],
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
        setLoading(0)
        navigate(from || '/')
      } else {
        setLoading(0)
        setError(1)
        setErrorMessage('User already exists')
      }
    } else {
      setLoading(0)
      setError(1)
      setErrorMessage('Passwords dont match')
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
      {loading === 1 ? (
        <div className='spinner'>
          <div></div>
          <div></div>
        </div>
      ) : (
        <form className='auth-form' onSubmit={submit}>
          {error ? (
            <div style={{ marginLeft: '4rem' }}>
              <h3 style={{ color: 'red' }}>{errorMessage}</h3>
            </div>
          ) : (
            ''
          )}
          <h3>Signup</h3>
          <label>Name</label>
          <input
            id='name'
            value={userData.name}
            type='text'
            required
            placeholder='Enter Name'
            autoComplete='off'
            onChange={onChangeHandler}
          />
          <label>Email</label>
          <input
            id='email'
            value={userData.email}
            type='email'
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
          <label>Confirm Password</label>
          <input
            id='confirm password'
            value={userData['confirm password']}
            type='password'
            required
            placeholder='Enter Password'
            onChange={onChangeHandler}
          />
          <button type='submit' className='link_btn'>
            <RiLoginBoxFill />
            Signup
          </button>
        </form>
      )}
    </div>
  )
}
