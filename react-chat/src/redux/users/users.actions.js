export const types = {
  USERS_LIST_START: 'USERS_LIST_START',
  USERS_LIST_SUCCESS: 'USERS_LIST_SUCCESS',
  USERS_LIST_FAILURE: 'USERS_LIST_FAILURE'
}

export const usersListStart = () => ({
  type: types.USERS_LIST_START
})

export const usersListSuccess = (users) => ({
  type: types.USERS_LIST_SUCCESS,
  payload: users
})

export const usersListFailure = ({ error }) => ({
  type: types.USERS_LIST_FAILURE,
  payload: { error }
})

