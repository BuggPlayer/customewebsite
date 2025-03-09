"use client"
import { useState, useRef } from 'react';
import Image from 'next/image';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({ success: false, error: null });
  const formRef = useRef(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setFormState({ 
        success: false, 
        error: 'Please enter a valid email address' 
      });
      return;
    }
    
    setIsSubmitting(true);
    setFormState({ success: false, error: null });
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormState({ 
        success: true, 
        error: null 
      });
      setEmail('');
    } catch (error) {
      setFormState({ 
        success: false, 
        error: 'An error occurred. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className="py-16 md:py-24 relative bg-primary/5">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <Image 
          src="/assets/frontend_assets/patterns/pattern-1.png" 
          alt="Background pattern"
          fill
          className="object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-light text-primary mb-4">
            Join Our Fragrance Community
          </h2>
          <p className="text-textColor-muted mb-8 md:text-lg">
            Subscribe to receive updates on new releases, exclusive offers, and fragrance tips. 
            Plus, get 10% off your first order when you sign up!
          </p>
          
          <div className="max-w-lg mx-auto">
            <form ref={formRef} onSubmit={handleSubmit} className="w-full">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full input-primary focus:border-primary h-12 px-4"
                    disabled={isSubmitting}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary h-12 px-6 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Subscribing...
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </div>
              
              {formState.error && (
                <p className="mt-3 text-red-500 text-sm">{formState.error}</p>
              )}
              
              {formState.success && (
                <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
                  <p>Thank you for subscribing! Check your email for your 10% discount code.</p>
                </div>
              )}
              
              <p className="mt-4 text-xs text-textColor-muted">
                By subscribing, you agree to our <a href="/privacy" className="underline hover:text-primary">Privacy Policy</a>. 
                We respect your privacy and will never share your information.
              </p>
            </form>
          </div>
          
          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              <span className="text-sm">Secure Checkout</span>
            </div>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
              </svg>
              <span className="text-sm">Safe Payment</span>
            </div>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              <span className="text-sm">100% Authentic</span>
            </div>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              <span className="text-sm">Free Shipping*</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 