export const types = {
  CREATE_ROOM_START: 'CREATE_ROOM_START',
  CREATE_ROOM_FAILURE: 'CREATE_ROOM_FAILURE',
  ROOMS_LIST_START: 'ROOMS_LIST_START',
  ROOMS_LIST_SUCCESS: 'ROOMS_LIST_SUCCESS',
  ROOMS_LIST_FAILURE: 'ROOMS_LIST_FAILURE'
}

export const createRoomStart = (name) => ({
  type: types.CREATE_ROOM_START,
  payload: name
})

export const createRoomFailure = (error) => ({
  type: types.CREATE_ROOM_FAILURE,
  payload: error
})

export const roomsListStart = () => ({
  type: types.ROOMS_LIST_START
})

export const roomsListSuccess = (rooms) => ({
  type: types.ROOMS_LIST_SUCCESS,
  payload: rooms
})

export const roomsListFailure = ({ error }) => ({
  type: types.ROOMS_LIST_FAILURE,
  payload: { error }
})

