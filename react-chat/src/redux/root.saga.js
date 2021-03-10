import { all, call } from 'redux-saga/effects'

import { xmpp } from './xmpp/xmpp.saga'
import { users } from './users/users.saga'
import { rooms } from './rooms/rooms.saga'

export default function * rootSaga () {
  yield all([
    call(xmpp),
    call(users),
    call(rooms)
  ])
}
