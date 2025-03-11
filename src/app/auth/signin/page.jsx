"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGoogleLogin } from "@react-oauth/google";

    
import axios from 'axios';
import { base_URL } from "../../../utils/apiList";

export default function SigninPage() {
  const router = useRouter();
  
  // ... [Keep all existing state and logic unchanged] ...
    
  const googleAuth = (code) => axios.get(`${base_URL}/auth/google?code=${code}`);
	const responseGoogle = async (authResult) => {
    console.log("code" , authResult)
    try {
        if (authResult?.code) { // Optional chaining to avoid null/undefined errors
            const result = await googleAuth(authResult.code);
          
            if (result?.data?.user) {
                const { email, name, image , _id } = result.data.user;
                const token = result.data.token;

                const userObj = { _id,email, name, token, image };
                localStorage.setItem('user-info', JSON.stringify(userObj));

                router.push('/');
            } else {
                console.error("User information is missing from the response.");
            }
        } else {
            console.error("Invalid authResult:", authResult);
            throw new Error("Authentication failed or missing authorization code.");
        }
    } catch (e) {
        console.error("Error while Google Login:", e.message);
    }
};
  const googleLogin = useGoogleLogin({
		onSuccess: responseGoogle,
		onError: responseGoogle,
		flow: "auth-code",
	});


  return (
    <div className="min-h-screen bg-background text-textColor-secondary font-primary">
      <main className="flex flex-col md:flex-row min-h-screen">
        {/* Left Image Section */}
        <div className="md:w-1/2 relative hidden md:block">
          <Image
            src="/assets/frontend_assets/products/placeholdr.svg" // Replace with your image path
            alt="Login Visual"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-8 md:p-12">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-light text-primary mb-2">Sign In</h1>
              <p className="text-textColor-muted">Welcome back to NOZE</p>
            </div>

            {/* Success/Error Messages */}
            {/* {successMessage && (
              <div className="bg-green-500/10 border border-green-500/30 text-green-500 px-4 py-3 rounded">
                {successMessage}
              </div>
            )}

            {errors.form && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-3 rounded">
                {errors.form}
              </div>
            )} */}

            {/* Existing Form */}
            <form onSubmit={()=>{}} className="space-y-6">
              {/* ... [Keep all existing form fields exactly as they were] ... */}
              
              {/* Keep all existing form elements unchanged */}
              {/* Email Input */}
              {/* Password Input */}
              {/* Remember Me Checkbox */}
              {/* Submit Button */}
              
              {/* Social Login Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background text-textColor-muted">Or continue with</span>
                </div>
              </div>

              {/* Google Login Button */}
              <button
                onClick={googleLogin}
                type="button"
                className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-md  text-textColor-secondary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="w-5 h-5"
                >
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                <span>Continue with Google</span>
              </button>
            </form>

            {/* Signup Link */}
            <div className="text-center pt-4">
              <p className="text-textColor-muted">
                Don't have an account?{' '}
                <Link href="/auth/signup" className="text-primary hover:underline">
                  Create an Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

