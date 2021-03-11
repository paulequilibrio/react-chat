import { all, call, takeLatest, put } from 'redux-saga/effects'

import service from '../../services/rooms'

import {
  types,
  createRoomFailure,
  roomsListStart,
  roomsListSuccess,
  roomsListFailure,
  destroyRoomFailure
} from './rooms.actions'

export function * createRoom ({ payload: name }) {
  try {
    const { data, error } = yield call(service.create, name)
    if (data !== 0) yield put(createRoomFailure(error))
    else yield put(roomsListStart())
  } catch (error) {
    yield put(createRoomFailure(error))
  }
}

export function * onCreateRoomStart () {
  yield takeLatest(types.CREATE_ROOM_START, createRoom)
}


export function * roomsList () {
  try {
    const { data, error } = yield call(service.list)
    if (error) yield put(roomsListFailure({ error }))
    else yield put(roomsListSuccess(data))
  } catch (error) {
    yield put(roomsListFailure({ error }))
  }
}

export function * onRoomsListStart () {
  yield takeLatest(types.ROOMS_LIST_START, roomsList)
}


export function * destroyRoom ({ payload: room}) {
  try {
    const { error } = yield call(service.delete, room)
    if (error) yield put(destroyRoomFailure({ error }))
    else yield put(roomsListStart())
  } catch (error) {
    yield put(destroyRoomFailure({ error }))
  }
}

export function * onDestroyRoomStart () {
  yield takeLatest(types.DESTROY_ROOM_START, destroyRoom)
}


export function * rooms () {
  yield all([
    call(onCreateRoomStart),
    call(onRoomsListStart),
    call(onDestroyRoomStart)
  ])
}
