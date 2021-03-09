import React from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Sidebar from './Sidebar'
import Conversation from './Conversation'
import { logout } from '../../redux/xmpp/xmpp.actions'
import { onlyUser } from '../../lib/utils'

const Chat = () => {
  const dispatch = useDispatch()
  const xmpp = useSelector(state => state.xmpp)
  const username = onlyUser(xmpp.jid)

  if (!xmpp.client) {
    return <Redirect to='/login' />
  } else {
    return (
      <div className='flex flex-col min-h-screen h-full w-full'>
        <div className='flex flex-row justify-between h-12 w-full p-2 bg-chat-900'>
          <span className='ml-4 text-white text-2xl font-bold'>React Chat</span>
          <div className='mr-4 flex items-center'>
            <span className='text-white font-bold'>{username}</span>
            <button
              onClick={() => {
                xmpp.client.disconnect()
                dispatch(logout())
              }}
              className='ml-8 bg-transparent border-none text-chat-100 font-normal'
            >
              Logout
            </button>
          </div>
        </div>
        <div className='flex flex-grow h-full w-full'>
          <div className='w-80 min-w-min h-full'>
            <Sidebar />
          </div>
          <div className='w-full h-full'>
            <Conversation />
          </div>
        </div>
      </div>
    )
  }
}

export default Chat
