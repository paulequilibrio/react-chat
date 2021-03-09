import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import xmpp from './xmpp/xmpp.reducer'
import users from './users/users.reducer'

const rootPersistConfig = {
  key: 'ReactChat',
  storage,
  blacklist: ['xmpp']
}

const xmppPersistConfig = {
  key: 'ReactChat.xmpp',
  storage,
  blacklist: ['client']
}

const rootReducer = combineReducers({
  xmpp: persistReducer(xmppPersistConfig, xmpp),
  users,
})

export default persistReducer(rootPersistConfig, rootReducer)
