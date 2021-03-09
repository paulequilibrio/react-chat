import { all, call } from 'redux-saga/effects'

import { xmpp } from './xmpp/xmpp.saga'

export default function * rootSaga () {
  yield all([
    call(xmpp)
  ])
}
