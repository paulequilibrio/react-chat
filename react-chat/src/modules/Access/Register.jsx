import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { registerStart } from '../../redux/xmpp/xmpp.actions'

const Register = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  function register (event) {
    event.preventDefault()
    if (user && password) {
      dispatch(registerStart({ user, password }))
    }
  }

  return (
    <form onSubmit={register} className='flex flex-col px-10'>
      <h2 className='text-2xl pb-4 text-center'>Register</h2>
      <label htmlFor='register-user' className='pb-1'>
        User
      </label>
      <input
        type='text'
        id='register-user'
        className='py-3'
        value={user}
        onChange={event => setUser(event.target.value)}
      />
      <label htmlFor='register-password' className='pt-4 pb-1'>
        Password
      </label>
      <input
        type='password'
        id='register-password'
        className='py-3'
        value={password}
        onChange={event => setPassword(event.target.value)}
      />
      <button
        type='submit'
        disabled={!(user && password)}
        className='submit mt-8 py-2'
      >
        Submit
      </button>
    </form>
  )
}

export default Register
