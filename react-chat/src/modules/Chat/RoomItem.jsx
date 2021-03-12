import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { JID } from 'stanza'

import { destroyRoomStart } from '../../redux/rooms/rooms.actions'
import UserGroup from '../../icons/UserGroup'
import Trash from '../../icons/Trash'

const RoomItem = ({ id: room }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const host = useSelector(state => state.xmpp.host)
  const client = useSelector(state => state.xmpp.client)
  const to = useSelector(state => state.xmpp.to)

  const onSelect = useCallback(() => {
    const nick = JID.getLocal(client.jid)
    const roomId = JID.create({ local: room, domain: `conference.${host}` })
    if (to !== roomId) {
      client.joinRoom(roomId, nick)
      history.push(`/chat/room/${room}`)
    }
  }, [history, host, client, to, room])

  const onDelete = () => {
    dispatch(destroyRoomStart(room))
  }

  return (
    <div
      className={`flex items-center w-full p-1 cursor-pointer
      ${JID.getLocal(to) === room ? 'bg-gray-700' : ''}`}
    >
      <div className='w-full flex flex-row items-center justify-between'>
        <div
          onClick={() => onSelect()}
          className='w-full flex flex-row items-center'
        >
          <div className='rounded-full w-12 h-full bg-chat-600 flex items-center justify-center p-2'>
            <UserGroup />
          </div>
          <div className='ml-2 truncate w-32'>{room}</div>
        </div>
        <button
          onClick={() => onDelete()}
          className='w-8 h-8 focus:border-none active:border-solid active:border-transparent'
        >
          <Trash />
        </button>
      </div>
    </div>
  )
}

export default RoomItem
