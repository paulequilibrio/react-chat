import { types } from './xmpp.actions'

const INITIAL_STATE = {
  client: null,
  jid: '',
  password: '',
  lastActivity: null,
  toUser: '',
  message: null,
  messages: [],
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
    case types.SET_TO_USER:
      return { ...state, toUser: payload }
    case types.MESSAGE_RECEIVED:
      return {
        ...state,
        error: null,
        message: { ...payload },
        messages: [...state.messages, payload]
      }
     default:
      return state
  }
}

export default xmpp
