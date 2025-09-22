"use client";
import { ENV } from "@/const/Env";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthAPI } from '@/apis/Auth/Auth.api';

interface RequestEmailDTO {
  email: string;
}

interface ResponseLoginEmailDTO {
  info: {
    user: {
      email: string;
    };
  };
  // token: {
  //   accessToken: string;
  //   refreshToken: string;
  // };
}

// Props interface
interface LoginFormProps {
  onEmailSuccess?: (email: string, response: ResponseLoginEmailDTO) => void;
  // Redux actions
  // setAccessToken?: (token: string) => void;
}

export default function LoginForm({ onEmailSuccess }: LoginFormProps) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return setError('Please enter your email address');
    if (!email.includes('@')) return setError('Please enter a valid email address');

    setIsLoading(true);
    setError('');

    try {
      const response = await AuthAPI.LoginEmail({ email });

      // if (response.token?.accessToken) {
      //   dispatch({ type: 'auth/setAccessToken' });
      // }

      if (onEmailSuccess) {
        onEmailSuccess(email, response);
      }

    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to send verification email.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEmailSubmit(e as any);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center relative overflow-hidden">
      {/* Left illustration */}
      <div className="absolute bottom-0 left-0 w-80 h-64">
        <div className="relative w-full h-full">
          {/* Platform base */}
          <div className="absolute bottom-0 left-12 w-32 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>

          {/* Building blocks */}
          <div className="absolute bottom-2 left-8 w-6 h-12 bg-gradient-to-b from-blue-400 to-blue-600 rounded-sm"></div>
          <div className="absolute bottom-2 left-16 w-8 h-16 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-sm"></div>
          <div className="absolute bottom-2 left-26 w-6 h-10 bg-gradient-to-b from-blue-300 to-blue-500 rounded-sm"></div>

          {/* Person figure */}
          <div className="absolute bottom-14 left-20 w-3 h-6 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-3 h-3 bg-orange-300 rounded-full"></div>

          {/* Floating elements */}
          <div className="absolute bottom-32 left-24 w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
          <div className="absolute bottom-28 left-32 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse delay-100"></div>
          <div className="absolute bottom-36 left-28 w-1 h-1 bg-cyan-500 rounded-full animate-pulse delay-200"></div>
        </div>
      </div>

      {/* Right illustration */}
      <div className="absolute bottom-0 right-0 w-80 h-64">
        <div className="relative w-full h-full">
          {/* Platform base */}
          <div className="absolute bottom-0 right-12 w-32 h-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>

          {/* Chart/Analytics elements */}
          <div className="absolute bottom-2 right-8 w-8 h-20 bg-gradient-to-b from-blue-400 to-blue-600 rounded-sm"></div>
          <div className="absolute bottom-2 right-18 w-6 h-14 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-sm"></div>
          <div className="absolute bottom-2 right-26 w-4 h-10 bg-gradient-to-b from-blue-300 to-blue-500 rounded-sm"></div>

          {/* Magnifying glass */}
          <div className="absolute bottom-24 right-16 w-8 h-8 border-2 border-blue-500 rounded-full"></div>
          <div className="absolute bottom-20 right-12 w-4 h-1 bg-blue-500 rounded-full transform rotate-45"></div>

          {/* Person figures */}
          <div className="absolute bottom-22 right-24 w-3 h-6 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full"></div>
          <div className="absolute bottom-28 right-24 w-3 h-3 bg-orange-300 rounded-full"></div>

          <div className="absolute bottom-14 right-32 w-3 h-6 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
          <div className="absolute bottom-20 right-32 w-3 h-3 bg-blue-300 rounded-full"></div>

          {/* Floating elements */}
          <div className="absolute bottom-35 right-20 w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-28 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse delay-150"></div>
        </div>
      </div>

      {/* Main login card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 w-full max-w-md mx-4 z-10 backdrop-blur-sm bg-white/95">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">S</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-gray-600 text-sm font-medium mb-8 text-center">
          Log in to continue
        </h2>

        {/* Login Form */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Input
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              onKeyPress={handleKeyPress}
              className="h-12 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg"
              disabled={isLoading}
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
          </div>

          <Button
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleEmailSubmit}
            disabled={isLoading || !email.trim()}
          >
            {isLoading ? 'Sending...' : 'Continue'}
          </Button>
        </div>

        {/* Privacy notice */}
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