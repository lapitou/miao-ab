import { configureStore } from "@reduxjs/toolkit";
import {combineReducers} from "redux";
import storage from 'redux-persist/lib/storage/session';
import { persistReducer} from 'redux-persist';
import thunk from 'redux-thunk'
import firstReducer from "../feature/user.slice";
/* Pour le bon fonctionnement du projet, faire attention aux version de redux, redux toolkit, redux persist .... Le mieux est d'avoir les même version que dans le json pour éviter les pb evec thunk.
https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/
il est peut être possible de stocker les information de login, user dans le stockage pour ne pas à avoir a utiliser reduxPersist.
Voir persisGate et persistore dans index.js
*/
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

