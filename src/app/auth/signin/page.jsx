"use client"
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Temporarily providing a simple placeholder component
export default function SigninPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto bg-background-secondary rounded-lg shadow-sm border border-primary/10 p-8">
            <h1 className="text-2xl md:text-3xl font-light text-primary mb-4">Sign In</h1>
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
// Loading fallback component
function SignInFormLoading() {
  return (
    <div className="bg-background-secondary rounded-lg shadow-sm border border-primary/10 p-6 md:p-8">
      <div className="space-y-4">
        <div className="h-10 bg-primary/10 rounded animate-pulse"></div>
        <div className="h-10 bg-primary/10 rounded animate-pulse"></div>
        <div className="h-5 w-32 bg-primary/10 rounded animate-pulse"></div>
        <div className="h-12 bg-primary/10 rounded animate-pulse"></div>
      </div>
    </div>
  );
}

// SignInForm wrapper with Suspense boundary
function SignInForm() {
  return (
    <Suspense fallback={<SignInFormLoading />}>
      <SignInFormComponent />
    </Suspense>
  );
}

export default function SigninPage() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-light text-primary">Welcome Back</h1>
              <p className="text-textColor-muted mt-2">Sign in to your account to continue</p>
            </div>
            
            <SignInForm />
            
            <p className="mt-8 text-center text-sm text-textColor-muted">
              By signing in, you agree to our{' '}
              <Link href="/terms" className="text-primary hover:text-primary/80">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-primary hover:text-primary/80">
                Privacy Policy
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