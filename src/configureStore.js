import { createStore, applyMiddleware  } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/es/storage/session'
import reduxThunk from 'redux-thunk'
import { combineReducers } from 'redux'
import authReducer from './reducers/authReducer'
import userReducer from './reducers/userReducer'

const rootPersistConfig = {
  key: 'root',
  storage: storageSession,
  blacklist: ['user']
}

const userPersistConfig = {
  key: 'user',
  storage: storageSession,
  blacklist: ['availability_next', 'availability_default']
}

const rootReducer = combineReducers({
  auth: authReducer,
  user: persistReducer(userPersistConfig, userReducer),
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export let store = createStore(persistedReducer, {}, applyMiddleware(reduxThunk))
export let persistor = persistStore(store)

