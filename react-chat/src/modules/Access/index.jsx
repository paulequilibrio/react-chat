import React, { useEffect } from 'react'
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { reconnectStart } from '../../redux/xmpp/xmpp.actions'
import Login from './Login'
import Register from './Register'

const Access = () => {
  const { path } = useRouteMatch()
  const dispatch = useDispatch()
  const xmpp = useSelector(state => state.xmpp)
  const { client, jid, password } = xmpp

  useEffect(() => {
    if (!client && jid && password) {
      dispatch(reconnectStart({ jid, password }))
    }
  }, [dispatch, client, jid, password])

  if (xmpp.client) {
    return <Redirect to='/chat/user' />
  } else {
    return (
      <div className='flex justify-center items-center h-screen w-full text-chat-900 font-bold'>
        <Switch>
          <Route path={`${path}/login`} component={Login} />
          <Route path={`${path}/register`} component={Register} />
        </Switch>
      </div>
    )
  }
}

export default Access
