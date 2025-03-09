"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function CartPage() {
  const router = useRouter();
  const { cart, updateCartItemQuantity, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [applyingCoupon, setApplyingCoupon] = useState(false);
  
  // Sample coupon codes for demo
  const validCoupons = {
    'WELCOME10': { discount: 10, type: 'percentage' },
    'SAVE20': { discount: 20, type: 'percentage' },
    'FLAT500': { discount: 500, type: 'fixed' }
  };
  
  // Used for demo purposes - in a real app this would come from the backend
  const [discount, setDiscount] = useState({ amount: 0, type: null });
  
  useEffect(() => {
    // Simulate loading of cart data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Calculate totals
  const subtotal = cart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  // Apply discount if any
  let discountAmount = 0;
  if (discount.type === 'percentage') {
    discountAmount = subtotal * (discount.amount / 100);
  } else if (discount.type === 'fixed') {
    discountAmount = discount.amount;
  }
  
  // Sample shipping fee
  const shipping = subtotal > 999 ? 0 : 99;
  
  // Calculate total
  const total = subtotal - discountAmount + shipping;
  
  const handleQuantityChange = (itemId, size, newQuantity) => {
    // Ensure quantity is at least 1
    const quantity = Math.max(1, newQuantity);
    updateCartItemQuantity(itemId, size, quantity);
  };
  
  const handleRemoveItem = (itemId, size) => {
    removeFromCart(itemId, size);
  };
  
  const handleApplyCoupon = () => {
    // Reset states
    setCouponError('');
    setCouponSuccess('');
    
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }
    
    setApplyingCoupon(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const coupon = validCoupons[couponCode.trim().toUpperCase()];
      if (coupon) {
        setDiscount({ amount: coupon.discount, type: coupon.type });
        setCouponSuccess(
          coupon.type === 'percentage'
            ? `${coupon.discount}% discount applied!`
            : `₹${coupon.discount} discount applied!`
        );
      } else {
        setCouponError('Invalid coupon code');
      }
      setApplyingCoupon(false);
    }, 800);
  };
  
  const handleCheckout = () => {
    // Redirect to checkout page
    router.push('/checkout');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="py-10 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center h-64">
              <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="py-10 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl md:text-3xl font-light text-primary mb-8">Shopping Cart</h1>
            
            <div className="bg-background-secondary border border-primary/5 rounded-lg p-8 text-center">
              <div className="inline-flex justify-center items-center rounded-full bg-primary/5 p-4 mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-textColor-muted mb-6">Looks like you haven't added any items to your cart yet.</p>
              <Link href="/products" className="btn-primary px-8 py-3 inline-block">
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-light text-primary mb-8">Shopping Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-background-secondary border border-primary/5 rounded-lg overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-background-secondary text-textColor-muted">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>
                
                <div className="divide-y divide-primary/5">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="p-4 md:py-6 md:grid grid-cols-12 gap-4 items-center">
                      {/* Product Info */}
                      <div className="col-span-6 flex items-center mb-4 md:mb-0">
                        <div className="relative w-16 h-16 flex-shrink-0 bg-primary/5 rounded overflow-hidden">
                          <Image 
                            src={'/assets/frontend_assets/products/placeholder.svg'} 
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium text-textColor-primary">
                            <Link href={`/products/${item.id}`} className="hover:text-primary">
                              {item.name}
                            </Link>
                          </h3>
                          {item.size && (
                            <p className="text-sm text-textColor-muted">Size: {item.size}</p>
                          )}
                          <button 
                            onClick={() => handleRemoveItem(item.id, item.size)}
                            className="text-sm text-red-500 hover:text-red-700 mt-1 flex items-center"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="col-span-2 text-center">
                        <div className="md:hidden text-sm text-textColor-muted mb-1">Price:</div>
                        <span>₹{item.price}</span>
                      </div>
                      
                      {/* Quantity */}
                      <div className="col-span-2 text-center">
                        <div className="md:hidden text-sm text-textColor-muted mb-1">Quantity:</div>
                        <div className="flex items-center justify-center">
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                            className="w-8 h-8 rounded-full border border-primary/10 flex items-center justify-center text-primary hover:bg-primary/5"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                            </svg>
                          </button>
                          <span className="mx-3 w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                            className="w-8 h-8 rounded-full border border-primary/10 flex items-center justify-center text-primary hover:bg-primary/5"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m6-6H6"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="col-span-2 text-center font-medium">
                        <div className="md:hidden text-sm text-textColor-muted mb-1">Total:</div>
                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <Link href="/products" className="btn-outline-primary px-6 py-2.5 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                  Continue Shopping
                </Link>
                
                <button 
                  onClick={() => clearCart()}
                  className="btn-outline-danger px-6 py-2.5 flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  Clear Cart
                </button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-background-secondary border border-primary/5 rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-textColor-muted">Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  
                  {discount.amount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-textColor-muted">Shipping</span>
                    <span>{shipping > 0 ? `₹${shipping.toFixed(2)}` : 'Free'}</span>
                  </div>
                  
                  {shipping > 0 && (
                    <div className="text-xs text-textColor-muted mt-1">
                      Free shipping on orders above ₹999
                    </div>
                  )}
                  
                  <div className="border-t border-primary/5 pt-3 flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Coupon Code */}
                <div className="mb-6">
                  <label htmlFor="coupon" className="block text-sm font-medium mb-2">
                    Apply Coupon
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="coupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="input-primary flex-grow"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={applyingCoupon}
                      className="btn-primary ml-2 px-4 whitespace-nowrap"
                    >
                      {applyingCoupon ? (
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        'Apply'
                      )}
                    </button>
                  </div>
                  {couponError && (
                    <p className="mt-2 text-sm text-red-500">{couponError}</p>
                  )}
                  {couponSuccess && (
                    <p className="mt-2 text-sm text-green-600">{couponSuccess}</p>
                  )}
                  
                  {/* Sample coupons hint */}
                  <div className="mt-2 text-xs text-textColor-muted">
                    <p className="font-medium">Try these coupon codes:</p>
                    <ul className="mt-1 ml-4 list-disc">
                      <li>WELCOME10 (10% off)</li>
                      <li>SAVE20 (20% off)</li>
                      <li>FLAT500 (₹500 off)</li>
                    </ul>
                  </div>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="btn-primary w-full py-3"
                >
                  Proceed to Checkout
                </button>
                
                <div className="mt-4 flex items-center justify-center text-textColor-muted text-sm space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                  <span>Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 