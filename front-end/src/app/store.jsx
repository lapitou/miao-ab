import { configureStore } from "@reduxjs/toolkit";
import {combineReducers} from "redux";
import storage from 'redux-persist/lib/storage/session';
import { persistReducer} from 'redux-persist';
import thunk from 'redux-thunk'
import firstReducer from "../feature/user.slice";

const reducers = combineReducers({
  user: firstReducer
})
const persistConfig = {
  key:'root' ,
  storage ,
  whitelist: ['user']
}
const persistedReducer = persistReducer ( persistConfig , reducers)
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk] })
export default store;

