import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { createHashHistory } from 'history'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'

import App from './App'

const history = createHashHistory()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
