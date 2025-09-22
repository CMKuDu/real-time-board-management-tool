"use client";

import { useSelector, useDispatch } from 'react-redux';
import LoginForm from './LoginForm';
import { resetToLogin, setEmailStep } from '@/store/freature/authFlowSlice';
import { setAccessToken } from '@/store/freature/authSlice';
import EmailVerification from './EmailVerification';
import { ResponseVerifyCodeDTO } from '@/apis/Auth/dto/res/ResponseVerifyCode.dto';

interface RootState {
  authFlow: {
    currentStep: 'login' | 'verify';
    email: string | null;
  };
  auth: {
    accessToken: string | null;
  };
}

export default function AuthFlow() {
  const dispatch = useDispatch();
  const { currentStep, email } = useSelector((state: RootState) => state.authFlow);
  const { accessToken } = useSelector((state: RootState) => state.auth);

  if (accessToken) {
    return null;
  }

  const handleEmailSuccess = (email: string, response: any) => {
    console.log('OTP sent to:', email);
    dispatch(setEmailStep(email));
  };

  const handleVerificationSuccess = (response: ResponseVerifyCodeDTO) => {
    console.log('Verification successful:', response.token);

    if (response.token) {
      dispatch(setAccessToken(response.token));
      console.log(response);

    }
    console.log(response.token);
    dispatch(resetToLogin());
  };

  const handleBackToLogin = () => {
    dispatch(resetToLogin());
  };

  return (
    <div className="fixed inset-0 z-50">
      {currentStep === 'login' && (
        <LoginForm onEmailSuccess={handleEmailSuccess} />
      )}

      {currentStep === 'verify' && email && (
        <EmailVerification
          email={email}
          onVerificationSuccess={handleVerificationSuccess}
          onBackToLogin={handleBackToLogin}
        />
      )}
    </div>
  );
}