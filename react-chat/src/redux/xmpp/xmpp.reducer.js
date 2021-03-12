import { types } from './xmpp.actions'

const INITIAL_STATE = {
  host: 'localhost',
  client: null,
  jid: '',
  password: '',
  lastActivity: null,
  to: '',
  error: null
}

const xmpp = (state = INITIAL_STATE, action) => {
  const { type, payload } = action
  switch (type) {
    case types.REGISTER_FAILURE:
      return { ...state, jid: '', password: '', ...payload }
    case types.LOGIN_FAILURE:
      return { ...state, jid: '', password: '', ...payload }
    case types.GET_LAST_SUCCESS:
      return { ...state, error: null, lastActivity: { ...payload } }
    case types.LOGOUT:
      return { ...INITIAL_STATE }
    case types.SET_CLIENT:
      return { ...state, client: payload }
    case types.SET_JID:
      return { ...state, jid: payload }
    case types.SET_CREDENTIALS:
      return { ...state, password: payload }
    case types.SET_TO:
      return { ...state, to: payload }
    default:
      return state
  }
}

export default xmpp
