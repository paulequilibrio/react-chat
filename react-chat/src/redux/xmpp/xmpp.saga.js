import { all, call, takeLatest, put } from 'redux-saga/effects'

import users from '../../services/users'
import createXmppClient from '../../services/xmppClient'

import {
  types,
  registerFailure,
  loginFailure,
  getLastSuccess,
  getLastFailure,
  setUserTo
} from './xmpp.actions'


export function * register ({ payload: { user, password } }) {
  try {
    const { data, error } = yield call(users.register, { user, password })
    if (!error && data && data.includes('successfully registered')) {
      yield createXmppClient({ user, password })
      yield put(setUserTo(''))
    } else {
      yield put(registerFailure({ error }))
    }
  } catch (error) {
    yield put(registerFailure({ error }))
  }
}

export function * onRegisterStart () {
  yield takeLatest(types.REGISTER_START, register)
}


export function * login ({ payload: { user, password } }) {
  try {
    const { data, error } = yield call(users.checkPassword, { user, password })
    if (!error && data === 0) {
      yield createXmppClient({ user, password })
      yield put(setUserTo(''))
    } else {
      yield put(loginFailure({ error: 'Login and/or password wrong.' }))
    }
  } catch (error) {
    yield put(loginFailure({ error }))
  }
}

export function * onLoginStart () {
  yield takeLatest(types.LOGIN_START, login)
}


export function * reconnect ({ payload: { jid, password } }) {
  try {
    yield createXmppClient({ jid, password })
    yield put(setUserTo(''))
  } catch (error) {
    yield put(loginFailure({ error }))
  }
}

export function * onReconnectStart () {
  yield takeLatest(types.RECONNECT_START, reconnect)
}


export function * getLast ({ payload: user }) {
  try {
    const { data, error } = yield call(users.getLast, user)
    if (!error && data) {
      yield put(getLastSuccess({ ...data }))
    }
  } catch (error) {
    yield put(getLastFailure({ error }))
  }
}

export function * onGetLastStart () {
  yield takeLatest(types.GET_LAST_START, getLast)
}


export function * xmpp () {
  yield all([
    call(onRegisterStart),
    call(onLoginStart),
    call(onReconnectStart),
    call(onGetLastStart)
  ])
}
