import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Access from './modules/Access'
import Chat from './modules/Chat'

import './App.css'

const App = () => {
  const client = useSelector(state => state.xmpp.client)

  return (
    <div className='bg-gray-300 h-full w-full'>
      <Switch>
        <Route path='/access' component={Access} />
        { client
            ? <Route exact path='/chat' component={Chat} />
            : <Redirect to='/access/login' />
        }
      </Switch>
    </div>
  )
}

export default App
