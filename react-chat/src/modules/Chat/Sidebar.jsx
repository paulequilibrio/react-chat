import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { usersListStart } from '../../redux/users/users.actions'
import { onlyUser } from '../../lib/utils'
import UserItem from './UserItem'

const Sidebar = () => {
  const dispatch = useDispatch()
  const jid = useSelector(state => state.xmpp.jid)
  const users = useSelector(state => state.users.list)

  useEffect(() => {
    dispatch(usersListStart())
    return () => {}
  }, [dispatch])

  return (
    <div className='h-full bg-gray-600 text-gray-100 font-bold'>
      <div>
        <div className='bg-gray-800 p-2 flex items-center'>
          <span>Users</span>
        </div>
        <div>
          {
            users.filter(c => c !== onlyUser(jid)).map(user => (
              <UserItem key={user} user={user} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Sidebar
