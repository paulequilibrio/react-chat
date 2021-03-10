import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Message from './Message'
import Airplane from '../../icons/Airplane'
import Refresh from '../../icons/Refresh'
import { setUserTo } from '../../redux/xmpp/xmpp.actions'

const Conversation = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const messagesView = useRef(null)
  const client = useSelector(state => state.xmpp.client)
  const jid = useSelector(state => state.xmpp.jid)
  const toUser = useSelector(state => state.xmpp.toUser)
  const to = `${toUser}@localhost`

  const initialHistory = async (timestamp = 1614567600000000, complete = false) => {
    if (complete) {
      await setLoading(false)
    } else {
      await setLoading(true)
      const start = new Date(timestamp / 1000)
      const items = await client.searchHistory({ jid, with: to, start })
      const newTimestamp = parseInt(items.paging.last) + 1
      await initialHistory(newTimestamp, items.complete)
    }
  }

  const lastHistory = async (timestamp = Date.now()) => {
    const start = new Date(timestamp)
    await client.searchHistory({ jid, with: to, start })
  }

  useEffect(() => {
    const addMessage = msg => {
      setMessages(messages => [...messages, msg])
    }
    client.on('message', msg => {
      if (!msg.error) {
        addMessage(msg)
        messagesView.current.scrollIntoView(false)
      }
    })
  }, [client])

  useEffect(() => {
    if (to.length > 10) {
      setMessages(messages => [])
      initialHistory()
    }
  }, [to])

  useEffect(() => {
    dispatch(setUserTo(id))
  }, [dispatch, id])

  const sendMessage = async event => {
    event.preventDefault()
    if (to.length > 10) {
      await client.sendMessage({ to, body: message })
      await setMessage('')
      await lastHistory()
    }
  }

  return (
    <div
      className={`${
        !toUser
          ? 'hidden'
          : 'relative w-full h-full flex flex-col justify-between bg-gray-700 text-gray-100'
      }`}
    >
      <div className='absolute left-0 top-0 bottom-12 w-full overflow-y-scroll justify-end p-4 bg-gray-400'>
        <div ref={messagesView} className='flex flex-col'>
          {messages.map((message, index) => (
            <Message key={index} message={message} jid={jid} />
          ))}
        </div>
      </div>
      <form
        onSubmit={sendMessage}
        className='absolute bottom-0 left-0 right-0 h-12 flex items-end'
      >
        <input
          type='text'
          className='font-semibold w-full h-full pr-14 rounded-none'
          placeholder={loading ? 'Loading messages...' : 'Type your message here'}
          value={message}
          onChange={event => setMessage(event.target.value)}
          disabled={loading}
        />
        <button
          type='submit'
          className='outline-none text-chat-700 bg-transparent border-transparent ml-4 w-10 h-10 focus:border-transparent focus:bg-transparent absolute right-2 bottom-1'
        >
          { loading ? (<div className='animate-spin w-8 h-8'><Refresh /></div>) : (<Airplane />) }
        </button>
      </form>
    </div>
  )
}

export default Conversation
