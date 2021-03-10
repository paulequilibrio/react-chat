import { all, call, takeLatest, put } from 'redux-saga/effects'

import service from '../../services/rooms'

import {
  types,
  createRoomFailure,
  roomsListStart,
  roomsListSuccess,
  roomsListFailure
} from './rooms.actions'

export function * createRoom ({ payload: name }) {
  try {
    yield call(service.create, { name, service: 'localhost' })
    yield put(roomsListStart())
  } catch (error) {
    yield put(createRoomFailure(error))
  }
}

export function * onCreateRoomStart () {
  yield takeLatest(types.CREATE_ROOM_START, createRoom)
}


export function * roomsList () {
  try {
    const list = yield call(service.list)
    yield put(roomsListSuccess(list))
  } catch (error) {
    yield put(roomsListFailure({ error }))
  }
}

export function * onRoomsListStart () {
  yield takeLatest(types.ROOMS_LIST_START, roomsList)
}

export function * rooms () {
  yield all([
    call(onCreateRoomStart),
    call(onRoomsListStart)
  ])
}
