import { all, call, takeLatest, put } from 'redux-saga/effects'

import service from '../../services/users'

import {
  types,
  usersListSuccess,
  usersListFailure
} from './users.actions'

export function * usersList () {
  try {
    const { data, error } = yield call(service.list)
    if (!error && data) {
      yield put(usersListSuccess(data))
    }
  } catch (error) {
    yield put(usersListFailure({ error }))
  }
}

export function * onUsersListStart () {
  yield takeLatest(types.USERS_LIST_START, usersList)
}

export function * users () {
  yield all([call(onUsersListStart)])
}
