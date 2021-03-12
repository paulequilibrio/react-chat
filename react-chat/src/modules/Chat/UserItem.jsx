import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { JID } from 'stanza'

import User from '../../icons/User'

const UserItem = ({ id }) => {
  const history = useHistory()
  const to = useSelector(state => state.xmpp.to)

  return (
    <div
      className={`flex flex-row items-center w-full p-1 cursor-pointer
      ${JID.getLocal(to) === id ? 'bg-gray-700' : ''}`}
      onClick={() =>
        JID.getLocal(to) !== id && history.push(`/chat/user/${id}`)
      }
    >
      <div className='rounded-full w-12 h-12 bg-chat-600 flex items-center justify-center p-2'>
        <User />
      </div>
      <div className='ml-2 w-40 truncate'>{id}</div>
    </div>
  )
}

export default UserItem
