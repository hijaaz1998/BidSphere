import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../slices/userSlice';
import adminReducer from '../slices/adminSlice/adminSlice';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistUserConfig = {
    key: 'user',
    storage,
  }

//   const persistAdminConfig = {
//     key: 'user',
//     storage,
//   }

const persistedUserReducer = persistReducer(persistUserConfig, userReducer)

export const store =  configureStore({
    reducer: {
        user: persistedUserReducer,
        admin: adminReducer
    }
});

export const persistedStore = persistStore(store)