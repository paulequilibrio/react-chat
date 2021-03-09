import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { onlyUser } from '../../lib/utils'
import { setUserTo } from '../../redux/xmpp/xmpp.actions'
import UserCircle from '../../icons/UserCircle'

const UserItem = ({ user }) => {
  const dispatch = useDispatch()
  const toUser = useSelector(state => state.xmpp.toUser)
  
  return (
    <div
      className={`flex flex-row items-center w-full p-1 cursor-pointer
      ${ toUser === user ? 'bg-gray-700' : '' }`}
      onClick={() => dispatch(setUserTo(user))}
    >
      <div className='rounded-full w-12 h-12 bg-chat-600 flex items-center justify-center'>
        <UserCircle />
      </div>
      <div className='ml-2 mr-6'>
        {onlyUser(user)}
      </div>
    </div>
  )
}

export default UserItem
