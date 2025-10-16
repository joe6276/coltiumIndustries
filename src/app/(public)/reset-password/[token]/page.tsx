'use client';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function ResetPasswordLanding() {
  const router = useRouter();
  
  const params = useParams(); 
  const token = params.token;

  useEffect(() => {
    if (token) {
      // Try to open the mobile app with deep link
      const appUrl = `finstinctapp://reset-password?token=${token}`;
      
      // Attempt to open the app
      window.location.href = appUrl;
      
      // Show instructions after a short delay
      setTimeout(() => {
        // If still on this page after 2 seconds, app didn't open
        document.getElementById('instructions')?.classList.remove('hidden');
      }, 2000);
    }
  }, [token]);

  const handleOpenApp = () => {
    if (token) {
      window.location.href = `finstinctapp://reset-password?token=${token}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          {/* Logo */}
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-2xl">🐾</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Finstinct</h1>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Reset Your Password
          </h2>
          
          <p className="text-gray-600 mb-6">
            Opening the Finstinct app to reset your password...
          </p>

          {/* Loading Spinner */}
          <div className="flex justify-center mb-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          </div>

          {/* Instructions (hidden initially) */}
          <div id="instructions" className="hidden">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 text-left">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700 font-medium">
                    App didn't open automatically?
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleOpenApp}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 mb-4"
            >
              Open Finstinct App
            </button>

            <div className="text-left space-y-3 text-sm text-gray-600">
              <p className="font-medium text-gray-900">If the button doesn't work:</p>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>Make sure the Finstinct app is installed on your device</li>
                <li>Open the Finstinct app manually</li>
                <li>Navigate to Settings → Reset Password</li>
                <li>Enter your new password</li>
              </ol>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Need help?{' '}
                <a href="mailto:support@finstinct.app" className="text-pink-500 hover:text-pink-600 font-medium">
                  Contact Support
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          This link expires in 3 hours for security purposes
        </p>
      </div>
    </div>
  );
}