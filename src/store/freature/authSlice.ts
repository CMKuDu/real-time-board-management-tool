import CookieTokenService from '@/utils/CookieTokenService';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthSate {
    token: string | null;
}

const initialState: AuthSate = {
    token: CookieTokenService.getAccessToken() || null,
}

const authModalSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            CookieTokenService.setAccessToken(action.payload);
        },
        clearAccessToken: (state) => {
            state.token = null;
            CookieTokenService.clearAll();
        }
    }
});

export const { setAccessToken, clearAccessToken } = authModalSlice.actions;
export default authModalSlice.reducer