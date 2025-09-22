"use client";

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthAPI } from '@/apis/Auth/Auth.api';
import { ResponseVerifyCodeDTO } from '@/apis/Auth/dto/res/ResponseVerifyCode.dto';


interface EmailVerificationProps {
  email?: string;
  onVerificationSuccess?: (response: ResponseVerifyCodeDTO) => void;
  onBackToLogin?: () => void;
}

export default function EmailVerification({
  email = '',
  onVerificationSuccess,
  onBackToLogin
}: EmailVerificationProps) {
  const dispatch = useDispatch();
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!verificationCode) {
      setError('Please enter the verification code');
      return;
    }

    if (verificationCode.length < 4) {
      setError('Please enter a valid verification code');
      return;
    }

    if (!email) {
      setError('Email is missing. Please go back and try again.');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      console.log("Haha0");
      const response = await AuthAPI.VerifycodeLogin({
        email,
        code: verificationCode
      });

      console.log('Verification successful:', response.token);
      if (onVerificationSuccess) {
        onVerificationSuccess?.(response);
      }

    } catch (err: any) {
      console.error('Verification error:', err);
      setError(
        err.response?.data?.message ||
        err.message ||
        'Invalid verification code. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    if (onBackToLogin) {
      onBackToLogin();
    }
  };

  const handleResendCode = async () => {
    try {
      setError('');
      await AuthAPI.LoginEmail({ email });
      console.log('Code resent to:', email);
    } catch (err: any) {
      setError('Failed to resend code. Please try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center relative overflow-hidden">

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 w-full max-w-md mx-4 z-10 backdrop-blur-sm bg-white/95">
        <div className="text-center mb-8">
          <h1 className="text-gray-800 text-xl font-semibold mb-3">
            Email Verification
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Please enter your code that sent to your email address
          </p>
          {email && (
            <p className="text-blue-600 text-xs mt-1 font-medium">
              {email}
            </p>
          )}
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Input
              placeholder="Enter code verification"
              type="text"
              value={verificationCode}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setVerificationCode(value);
                if (error) setError('');
              }}
              onKeyPress={handleKeyPress}
              className="h-12 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg text-center text-lg tracking-widest font-mono"
              disabled={isLoading}
              maxLength={6}
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-xs text-center">{error}</p>
            )}
          </div>

          <Button
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={isLoading || verificationCode.length < 4}
          >
            {isLoading ? 'Verifying...' : 'Submit'}
          </Button>

          {onBackToLogin && (
            <button
              onClick={handleBackClick}
              className="w-full text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center justify-center space-x-1"
              disabled={isLoading}
            >
              <span>←</span>
              <span>Back to login</span>
            </button>
          )}

          <div className="text-center">
            <button
              onClick={handleResendCode}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
              disabled={isLoading}
            >
              Didn't receive code? Resend
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            <span className="font-medium">Privacy Policy</span>
            <br />
            This site is protected by reCAPTCHA and the Google Privacy
            <br />
            Policy and Terms of Service apply.
          </p>
        </div>
      </div>
    </div>
  );
}