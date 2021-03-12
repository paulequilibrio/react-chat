import React from 'react'
import { JID } from 'stanza'

const Message = ({ message, jid }) => {
  let nick
  if (message.type === 'groupchat' && message.from) {
    nick = JID.getResource(message.from)
  }
  const from = JID.toBare(message.from)
  const me = JID.toBare(jid)
  const myNick = JID.getLocal(jid)

  return (
    <div
      className={`p-2 my-1 rounded-xl max-w-11/12 flex flex-col
        ${
          from === me || myNick === nick
            ? 'bg-gray-700 self-end'
            : 'bg-chat-700 self-start'
        }
      `}
    >
      <div className={`${nick && nick !== myNick ? '' : 'hidden'}`}>
        <span className='text-sm font-bold text-white'>{nick}</span>
      </div>
      <div className='flex'>
        <span className='text-lg self-start -mt-1'>{message.body}</span>
        <span className='text-xxs pl-4 self-end -mb-1'>
          {message.date && message.date.toLocaleString('en-UK')}
        </span>
      </div>
    </div>
  )
}

export default Message
