import { createStore, applyMiddleware  } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reduxThunk from 'redux-thunk'
import { combineReducers } from 'redux'
import authReducer from './reducers/authReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['user']
}

const userPersistConfig = {
  key: 'user',
  storage,
  blacklist: ['availability_next', 'availability_default']
}

const rootReducer = combineReducers({
  auth: authReducer,
  user: persistReducer(userPersistConfig, userReducer),
  users: usersReducer
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export let store = createStore(persistedReducer, {}, applyMiddleware(reduxThunk))
export let persistor = persistStore(store)

