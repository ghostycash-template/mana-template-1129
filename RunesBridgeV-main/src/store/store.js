import { configureStore } from "@reduxjs/toolkit";
import uiReducer from './ui'
const store = configureStore({
    reducer: uiReducer
})

export default store;