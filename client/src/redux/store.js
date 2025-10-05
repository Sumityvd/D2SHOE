import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import storage from 'redux-persist/lib/storage';
import {persistReducer} from "redux-persist"
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
    key: 'root',
    storage
}

const reducer = combineReducers({
    auth:authReducer,
})

const persistedReducer = persistReducer(persistConfig,reducer)

export const store=configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
                ignoredActionsPaths: ['register', 'rehydrate'],
            },
        }),
})