import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './root.reducer'
import rootSaga from './root.saga'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]

const notLogged = [
  'persist/PERSIST',
  'persist/REHYDRATE'
]

const logger = createLogger({
  predicate: (getState, action) => !notLogged.includes(action.type)
})

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares))

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)

export default store
