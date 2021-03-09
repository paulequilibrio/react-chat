import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { loginStart } from '../../redux/xmpp/xmpp.actions'

const Login = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  function login (event) {
    event.preventDefault()
    if (user && password) {
      dispatch(loginStart({ user, password }))
    }
  }

  return (
    <form onSubmit={login} className='flex flex-col px-10'>
      <h2 className='text-2xl pb-4 text-center'>Login</h2>
      <label htmlFor='login-user' className='pb-1'>
        User
      </label>
      <input
        type='text'
        id='login-user'
        className='py-3'
        value={user}
        onChange={event => setUser(event.target.value)}
      />
      <label htmlFor='login-password' className='pt-4 pb-1'>
        Password
      </label>
      <input
        type='password'
        id='login-password'
        className='py-3'
        value={password}
        onChange={event => setPassword(event.target.value)}
      />
      <button
        type='submit'
        disabled={!(user && password)}
        className='mt-8 py-2'
      >
        Submit
      </button>
      <p className='pt-4 text-center'>
        <span>Don't have an account?</span><br />
        <Link to='/access/register' className='underline'>
          Click here to register
        </Link>
      </p>
    </form>
  )
}

export default Login
