import { configureStore } from "@reduxjs/toolkit";
import authReducer from './freature/authSlice';
import authModalSliceReducer from './freature/authModalSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        authModal: authModalSliceReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch