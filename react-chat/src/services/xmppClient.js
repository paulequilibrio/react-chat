import * as XMPP from 'stanza'
import { store } from '../redux/store'

import { setClient, setJid, setCredentials } from '../redux/xmpp/xmpp.actions'

const createXmppClient = data => {
  let { user, password, jid } = data

  jid = jid || `${user}@localhost`

  const HOSTNAME = window ? window.location.hostname : 'localhost'
  const options = {
    transports: {
      websocket: `ws://${HOSTNAME}:5443/ws`,
      bosh: `http://${HOSTNAME}:5443/bosh`
    },
    allowResumption: true,
    useStreamManagement: true,
    resource: HOSTNAME,
    jid,
    password
  }
  const xmppClient = XMPP.createClient(options)

  xmppClient.enableKeepAlive({ interval: 1000 })

  xmppClient.on('session:started', async input => {
    store.dispatch(setJid(xmppClient.jid))
    store.dispatch(setCredentials(xmppClient.config.credentials.password))
    await xmppClient.getRoster()
    await xmppClient.sendPresence()
  })

  xmppClient.on('disconnected', error => {
    if (xmppClient.sessionStarted) {
      xmppClient.connect()
    }
  })

  xmppClient.connect()

  store.dispatch(setClient(xmppClient))

  return xmppClient
}

export default createXmppClient
