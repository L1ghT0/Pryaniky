import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import authReducer from "./reducers/authReducer";
import userdocsReducer from "./reducers/userdocsReducer";
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type RootState = ReturnType<typeof store.getState>


const rootReducer = combineReducers({
    auth: authReducer,
    userdocs: userdocsReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})
