import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { JID } from 'stanza'

import { createRoomStart, roomsListStart } from '../../redux/rooms/rooms.actions'
import { usersListStart } from '../../redux/users/users.actions'
import UserItem from './UserItem'
import Plus from '../../icons/Plus'

const Sidebar = () => {
  const inputElement = useRef()
  const [formVisible, setFormVisible] = useState(false)
  const [newRoomName, setNewRoomName] = useState('')
  const dispatch = useDispatch()
  const jid = useSelector(state => state.xmpp.jid)
  const users = useSelector(state => state.users.list)
  const rooms = useSelector(state => state.rooms.list)

  useEffect(() => {
    dispatch(usersListStart())
    dispatch(roomsListStart())
    return () => {}
  }, [dispatch])

  useEffect(() => {
    if (formVisible) inputElement.current.focus()
  }, [formVisible])

  const showInput = () => {
    setFormVisible(!formVisible)
    if (formVisible) inputElement.current.focus()
  }

  const addRoom = (event) => {
    event.preventDefault()
    dispatch(createRoomStart(newRoomName))
    setFormVisible(false)
    setNewRoomName('')
  }

  return (
    <div className='w-60 h-full bg-gray-600 text-gray-100 font-bold'>
      <div className='absolute top-0 left-0 right-0 bottom-0 overflow-y-scroll'>
      <div>
        <div className='bg-gray-800 p-2 flex justify-between items-center'>
          <span>Rooms</span>
          <button
            onClick={() => showInput()}
            className='w-8 h-8 rounded-full bg-transparent border-none'
          >
            <Plus />
          </button>
        </div>
        <div>
          <form
            className={`${ !formVisible && 'hidden' } flex justify-center items-center w-full p-2`}
            onSubmit={addRoom}
          >
            <input
              ref={inputElement}
              className='flex w-full p-2'
              type='text'
              value={newRoomName}
              onChange={(event) => setNewRoomName(event.target.value)}
            />
          </form>
          {
            rooms.map(room => (
              <UserItem key={room} kind='room' id={JID.getLocal(room)} />
            ))
          }
        </div>
      </div>
      <div>
        <div className='bg-gray-800 p-2 flex items-center mt-2'>
          <span>Users</span>
        </div>
        <div>
          {
            users.filter(c => c !== JID.getLocal(jid)).map(user => (
              <UserItem key={user} kind='user' id={user} />
            ))
          }
        </div>
      </div>
      </div>
    </div>
  )
}

export default Sidebar
