import { configureStore } from "@reduxjs/toolkit";
import authReducer from './freature/authSlice';
import authModalSliceReducer from './freature/authModalSlice'
import authFlowReducer from './freature/authFlowSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        authModal: authModalSliceReducer,
        authFlow: authFlowReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch