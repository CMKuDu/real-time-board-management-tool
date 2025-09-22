import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthFlowState {
  currentStep: 'login' | 'verify';
  email: string | null;
}

const initialState: AuthFlowState = {
  currentStep: 'login',
  email: null,
};

const authFlowSlice = createSlice({
  name: 'authFlow',
  initialState,
  reducers: {
    setEmailStep: (state, action: PayloadAction<string>) => {
      state.currentStep = 'verify';
      state.email = action.payload;
    },
    resetToLogin: (state) => {
      state.currentStep = 'login';
      state.email = null;
    },
  },
});

export const { setEmailStep, resetToLogin } = authFlowSlice.actions;
export default authFlowSlice.reducer;