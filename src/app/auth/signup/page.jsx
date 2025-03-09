"use client"
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Temporarily providing a simple placeholder component
export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto bg-background-secondary rounded-lg shadow-sm border border-primary/10 p-8">
            <h1 className="text-2xl md:text-3xl font-light text-primary mb-4">Sign Up</h1>
            <p className="text-textColor-muted mb-6">This feature is coming soon.</p>
            <Link href="/" className="btn-primary inline-block px-6 py-3">
              Return to Home
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

/* Original code commented out
// Import the SignUpForm component without directly using it
import SignUpFormComponent from '@/components/auth/SignUpForm';

// Loading fallback component
function SignUpFormLoading() {
  return (
    <div className="bg-background-secondary rounded-lg shadow-sm border border-primary/10 p-6 md:p-8">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="h-10 bg-primary/10 rounded animate-pulse"></div>
          <div className="h-10 bg-primary/10 rounded animate-pulse"></div>
        </div>
        <div className="h-10 bg-primary/10 rounded animate-pulse"></div>
        <div className="h-10 bg-primary/10 rounded animate-pulse"></div>
        <div className="h-10 bg-primary/10 rounded animate-pulse"></div>
        <div className="h-5 w-32 bg-primary/10 rounded animate-pulse"></div>
        <div className="h-12 bg-primary/10 rounded animate-pulse"></div>
      </div>
    </div>
  );
}

// SignUpForm wrapper with Suspense boundary
function SignUpForm() {
  return (
    <Suspense fallback={<SignUpFormLoading />}>
      <SignUpFormComponent />
    </Suspense>
  );
}

export default function SignupPage() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-light text-primary">Create Your Account</h1>
              <p className="text-textColor-muted mt-2">Join NOZE and discover your perfect fragrance</p>
            </div>
            
            <div className="bg-background-secondary rounded-lg shadow-sm border border-primary/10 p-6 md:p-8">
              <SignUpForm />
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background-secondary text-textColor-muted">Or sign up with</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button className="btn-outline-primary py-2.5 flex items-center justify-center">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M12 5c1.617 0 3.077.543 4.243 1.461l2.984-2.585C17.309 2.002 14.869 1 12 1 7.693 1 4.008 3.115 2 6.35l3.425 2.654A7.43 7.43 0 0112 5z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </button>
                <button className="btn-outline-primary py-2.5 flex items-center justify-center">
                  <svg className="h-5 w-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                    <path
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                    />
                  </svg>
                  Facebook
                </button>
              </div>
            </div>
            
            <p className="mt-6 text-center text-sm text-textColor-muted">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-primary hover:text-primary/80 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
*/ 