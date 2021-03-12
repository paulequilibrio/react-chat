import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import { JID } from 'stanza'

import Sidebar from './Sidebar'
import History from './History'
import { logout } from '../../redux/xmpp/xmpp.actions'

const Chat = () => {
  const dispatch = useDispatch()
  const xmpp = useSelector(state => state.xmpp)
  const username = JID.getLocal(xmpp.jid)

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
            className='ml-8 text-chat-100 font-normal'
          >
            Logout
          </button>
        </div>
      </div>
      <div className='relative flex flex-grow h-full w-full'>
        <div className='relative w-60 h-full'>
          <Sidebar />
        </div>
        <div className='relative w-full h-full bg-gray-400'>
          <Route path='/chat/:kind/:id' component={History} />
        </div>
      </div>
    </div>
  )
}

export default Chat
