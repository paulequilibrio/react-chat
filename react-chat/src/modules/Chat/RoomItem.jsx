import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import UserGroup from '../../icons/UserGroup'

const RoomItem = ({ id }) => {
  const history = useHistory()
  const toUser = useSelector(state => state.xmpp.toUser)
  
  return (
    <div
      className={`flex flex-row items-center w-full p-1 cursor-pointer
      ${ toUser === id ? 'bg-gray-700' : '' }`}
      onClick={() => history.push(`/chat/room/${id}`)}
    >
      <div className='rounded-full w-12 h-12 bg-chat-600 flex items-center justify-center p-2'>
        <UserGroup />
      </div>
      <div className='ml-2 w-40 truncate'>
        {id}
      </div>
    </div>
  )
}

export default RoomItem
