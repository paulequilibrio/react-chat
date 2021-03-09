import { types } from './users.actions'

const INITIAL_STATE = {
  list: [],
  error: null
}

const users = (state = INITIAL_STATE, action) => {
  const { type, payload } = action
  switch (type) {
    case types.USERS_LIST_SUCCESS:
      return { error: null, list: payload }
    case types.USERS_LIST_FAILURE:
      return { error: payload, list: [] }
    default:
      return state
  }
}

export default users
