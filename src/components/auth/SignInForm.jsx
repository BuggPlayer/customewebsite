"use client"
import { useState } from 'react';
import Link from 'next/link';

export default function SignInForm() {
  return (
    <div className="bg-background-secondary p-6 rounded-lg text-center">
      <p className="text-textColor-muted mb-4">
        Sign in functionality is currently disabled.
      </p>
      <Link href="/" className="btn-primary inline-block px-4 py-2">
        Return Home
      </Link>
    </div>
  );
}

/* Original functionality commented out
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams ? searchParams.get('callbackUrl') || '/' : '/';
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  // ... rest of original component code ...
*/ 