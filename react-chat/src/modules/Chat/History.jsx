import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { JID } from 'stanza'

import useEventListener from '../../hooks/useEventListener'
import Message from './Message'
import Airplane from '../../icons/Airplane'
import Refresh from '../../icons/Refresh'
import { setTo } from '../../redux/xmpp/xmpp.actions'

const History = () => {
  const { kind, id } = useParams()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const messagesView = useRef(null)
  const host = useSelector(state => state.xmpp.host)
  const client = useSelector(state => state.xmpp.client)
  const jid = useSelector(state => state.xmpp.jid)
  const to = useSelector(state => state.xmpp.to)

  const initialHistory = useCallback(
    async (timestamp = 1614567600000000, complete = false) => {
      if (complete) {
        await setLoading(false)
      } else {
        await setLoading(true)
        const start = new Date(timestamp / 1000)
        const items = await client.searchHistory({ jid, with: to, start })
        const newTimestamp = parseInt(items.paging.last) + 1
        await initialHistory(newTimestamp, items.complete)
      }
    },
    [client, jid, to]
  )

  const lastHistory = async (timestamp = Date.now()) => {
    const start = new Date(timestamp)
    await client.searchHistory({ jid, with: to, start })
  }

  const handleMessage = useCallback(
    message => {
      let msg = message.archive ? message.archive.item.message : message
      if (message.archive) {
        msg.date = new Date(message.archive.item.delay.timestamp)
      } else if (msg.type && msg.type.includes('chat') && msg.stanzaIds) {
        msg.date = new Date(parseInt(message.stanzaIds[0].id) / 1000)
      }
      const fromOrTo = [JID.toBare(msg.from), JID.toBare(msg.to)]
      if (msg.body && msg.date && fromOrTo.includes(to)) {
        setMessages(messages => [...messages, msg])
        messagesView.current.scrollIntoView(false)
      }
    },
    [to]
  )

  useEventListener('message', handleMessage, client)

  useEffect(() => {
    if (to) {
      setMessages(messages => [])
      initialHistory()
    }
  }, [to, initialHistory])

  useEffect(() => {
    const domain = kind === 'room' ? `conference.${host}` : host
    const toJid = JID.toBare(JID.create({ local: id, domain }))
    dispatch(setTo(toJid))
  }, [dispatch, kind, id, host])

  const sendMessage = async event => {
    event.preventDefault()
    if (!to) return
    const timestamp = Date.now()
    await client.sendMessage({
      to,
      body: message,
      type: kind === 'room' ? 'groupchat' : 'chat'
    })
    await setMessage('')
    await lastHistory(timestamp)
  }

  return (
    <div
      className={`${
        !to
          ? 'hidden'
          : 'relative w-full h-full flex flex-col justify-between bg-gray-700 text-gray-100'
      }`}
    >
      <div className='absolute left-0 top-0 bottom-12 w-full overflow-y-scroll justify-end p-4 bg-gray-400'>
        <div ref={messagesView} className='flex flex-col'>
          {messages.map((msg, index) => (
            <Message key={index} message={msg} jid={jid} />
          ))}
        </div>
      </div>
      <form
        onSubmit={sendMessage}
        className='absolute bottom-0 left-0 right-0 h-12 flex items-end'
      >
        <input
          type='text'
          className='focus:border-transparent font-semibold w-full h-full pr-14 rounded-none'
          placeholder={
            loading ? 'Loading messages...' : 'Type your message here'
          }
          value={message}
          onChange={event => setMessage(event.target.value)}
          disabled={loading}
        />
        <button
          type='submit'
          className='text-chat-700 bg-transparent focus:border-none ml-4 w-10 h-10 active:border-transparent active:border-solid absolute right-2 bottom-1'
        >
          {loading ? (
            <div className='animate-spin w-8 h-8'>
              <Refresh />
            </div>
          ) : (
            <Airplane />
          )}
        </button>
      </form>
    </div>
  )
}

export default History
