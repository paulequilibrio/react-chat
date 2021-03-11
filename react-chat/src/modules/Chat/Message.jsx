import React from 'react'
import { JID } from 'stanza'

const Message = ({ message, jid }) => {
  let msg, date
  if (message.archive) {
    msg = message.archive.item.message
    date = new Date(message.archive.item.delay.timestamp)
  } else {
    msg = message
    // date = new Date(parseInt(message.stanzaIds[0].id) / 1000)
  }
  const from = JID.toBare(msg.from)
  const me = JID.toBare(jid)
  return (
    <div
      className={`p-2 my-1 rounded-xl max-w-11/12 flex
        ${from !== me
          ? 'bg-chat-700 self-start'
          : 'bg-gray-700 self-end'
        }
      `}
    >
      <span className='text-lg self-start -mt-1'>
        {msg.body}
      </span>
      <span className='text-xxs pl-4 self-end -mb-1'>
        {date && date.toLocaleString('en-UK')}
      </span> 
    </div>
  )
}

export default Message
