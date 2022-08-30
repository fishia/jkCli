import { createStore, applyMiddleware, compose, Middleware } from 'redux'

import rootReducer from './reducers'

export * from './actions'
export * from './reducers'

const middlewares: Middleware[] = []

if (
  process.env.ENV === 'development' &&
  (process.env.NODE_ENV as 'development') === 'development'
) {
  //middlewares.push(require('redux-logger').createLogger())
}

const appStore = createStore(rootReducer, compose(applyMiddleware(...middlewares)))

export default appStore

export type RootState = ReturnType<typeof appStore.getState>

export type AppDispatch = typeof appStore.dispatch
