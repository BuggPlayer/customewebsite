"use client"
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function OrderSuccessPage() {
  const router = useRouter();
  const { clearCart } = useCart();
  const orderNumber = Math.floor(100000 + Math.random() * 900000); // Random order number
  
  useEffect(() => {
    // Clear cart on successful order
    clearCart();
    
    // For demo purposes only: normally, this would be handled by the backend
    const orderDate = new Date().toLocaleDateString();
    localStorage.setItem('lastOrder', JSON.stringify({
      orderNumber,
      orderDate,
    }));
  }, [clearCart, orderNumber]);
  
  return (
    <div className="min-h-screen bg-background text-textColor-secondary font-primary">
      
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/20 rounded-full mb-8">
              <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-light text-primary mb-4">Thank You for Your Order!</h1>
            <p className="text-textColor-muted max-w-2xl mx-auto mb-8">
              Your order has been placed successfully. We are processing it and will send you a confirmation email shortly.
            </p>
            
            <div className="inline-block bg-background-secondary px-6 py-3 rounded border border-primary/20 mb-12">
              <p className="text-lg">Order Number: <span className="text-primary">{orderNumber}</span></p>
            </div>
            
            <div className="bg-background-secondary p-8 rounded-lg mb-12">
              <h2 className="text-xl font-light text-primary mb-6">Order Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-light mb-3">Shipping Information</h3>
                  <div className="text-textColor-muted">
                    <p>Your order will be delivered within 3-5 business days.</p>
                    <p className="mt-2">You will receive shipping updates via email.</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-light mb-3">Payment Information</h3>
                  <div className="text-textColor-muted">
                    <p>Payment has been successfully processed.</p>
                    <p className="mt-2">A receipt has been emailed to your registered email address.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-background-secondary p-8 rounded-lg mb-12">
              <h2 className="text-xl font-light text-primary mb-6">What Happens Next?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-light mb-2">Order Confirmation</h3>
                  <p className="text-textColor-muted">You'll receive an email confirmation with your order details.</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-light mb-2">Order Processing</h3>
                  <p className="text-textColor-muted">We'll prepare your items and pack them with care.</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-light mb-2">Shipping</h3>
                  <p className="text-textColor-muted">Your order will be shipped and you'll receive tracking information.</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/products" className="btn-outline-primary px-8 py-3">
                Continue Shopping
              </Link>
              <Link href="/account/orders" className="btn-primary px-8 py-3">
                View My Orders
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      {/* Newsletter signup */}
      <div className="bg-background-secondary py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-light text-primary mb-4">Join Our Community</h2>
          <p className="text-textColor-muted max-w-2xl mx-auto mb-8">
            Sign up for our newsletter to receive exclusive offers, fragrance tips, and be the first to know about new releases.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 input-primary"
            />
            <button className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </div>
          
          <p className="text-textColor-muted text-xs mt-4">
            By subscribing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
      
    </div>
  );
} 