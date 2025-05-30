import { configureStore } from '@reduxjs/toolkit'; 
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import userReducer from './userSlice'; 
import { combineReducers } from 'redux';

// Combine les reducers normalement
const rootReducer = combineReducers({
  user: userReducer,
});

// Configuration de redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // On veut seulement persister `user`
};

// Applique redux-persist au rootReducer (et non à la slice directement)
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Création du store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store); 

export { store, persistor };
