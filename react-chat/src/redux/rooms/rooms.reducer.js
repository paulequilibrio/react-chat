import { types } from './rooms.actions'

const INITIAL_STATE = {
  list: [],
  error: null
}

const rooms = (state = INITIAL_STATE, action) => {
  const { type, payload } = action
  switch (type) {
    case types.CREATE_ROOM_FAILURE:
      return { ...state, error: payload }
    case types.ROOMS_LIST_SUCCESS:
      return { error: null, list: payload }
    case types.ROOMS_LIST_FAILURE:
      return { error: payload, list: [] }
    default:
      return state
  }
}

export default rooms
