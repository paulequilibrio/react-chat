export const types = {
  REGISTER_START: 'REGISTER_START',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  LOGIN_START: 'LOGIN_START',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  GET_LAST_START: 'GET_LAST_START',
  GET_LAST_SUCCESS: 'GET_LAST_SUCCESS',
  GET_LAST_FAILURE: 'GET_LAST_FAILURE',
  LOGOUT: 'LOGOUT',
  RECONNECT_START: 'RECONNECT_START',
  SET_CLIENT: 'SET_CLIENT',
  SET_JID: 'SET_JID',
  SET_CREDENTIALS: 'SET_CREDENTIALS',
  SET_TO: 'SET_TO'
}

export const registerStart = ({ user, password }) => ({
  type: types.REGISTER_START,
  payload: { user, password }
})

export const registerFailure = ({ error }) => ({
  type: types.REGISTER_FAILURE,
  payload: { error }
})

export const loginStart = ({ user, password }) => ({
  type: types.LOGIN_START,
  payload: { user, password }
})

export const loginFailure = ({ error }) => ({
  type: types.LOGIN_FAILURE,
  payload: { error }
})

export const getLastStart = user => ({
  type: types.GET_LAST_START,
  payload: user
})

export const getLastSuccess = ({ timestamp, status }) => ({
  type: types.GET_LAST_SUCCESS,
  payload: { timestamp, status }
})

export const getLastFailure = ({ error }) => ({
  type: types.GET_LAST_FAILURE,
  payload: { error }
})

export const logout = () => ({
  type: types.LOGOUT
})

export const reconnectStart = ({ jid, password }) => ({
  type: types.RECONNECT_START,
  payload: { jid, password }
})

export const setClient = client => ({
  type: types.SET_CLIENT,
  payload: client
})

export const setJid = jid => ({
  type: types.SET_JID,
  payload: jid
})

export const setCredentials = credentials => ({
  type: types.SET_CREDENTIALS,
  payload: credentials
})

export const setTo = user => ({
  type: types.SET_TO,
  payload: user
})
