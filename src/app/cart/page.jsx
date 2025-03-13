
"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const router = useRouter();
  const { cart, updateCartItemQuantity, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [applyingCoupon, setApplyingCoupon] = useState(false);
  
  const validCoupons = {
    'WELCOME10': { discount: 10, type: 'percentage' },
    'SAVE20': { discount: 20, type: 'percentage' },
    'FLAT500': { discount: 500, type: 'fixed' }
  };
  
  const [discount, setDiscount] = useState({ amount: 0, type: null });
  
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);
  
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discountAmount = discount.type === 'percentage' ? subtotal * (discount.amount / 100) : discount.amount;
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal - discountAmount + shipping;

  // ... (keep existing handler functions)

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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-primary/20" />
          <p className="text-textColor-muted">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-medium text-textColor-primary mb-3">Your Cart is Empty</h1>
          <p className="text-textColor-muted mb-6">Start exploring our collection and find something special!</p>
          <Link href="/products" className="btn-primary px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors">
            Discover Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl md:text-3xl font-medium text-textColor-primary">Shopping Cart</h1>
            <span className="text-textColor-muted">{cart.length} items</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}`} className="bg-background-secondary rounded-xl p-4 md:p-6 shadow-sm">
                  <div className="flex gap-4 md:gap-6">
                    {/* Product Image */}
                    <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-primary/5">
                      <Image
                        src={item.images[0] || '/assets/frontend_assets/products/placeholder.svg'}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 96px, 128px"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link href={`/products/${item.id}`} className="text-lg font-medium text-textColor-primary hover:text-primary transition-colors">
                            {item.name}
                          </Link>
                          {item.size && (
                            <p className="text-sm text-textColor-muted mt-1">Size: {item.size}</p>
                          )}
                        </div>
                        <button 
                          onClick={() => handleRemoveItem(item.id, item.size)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        </button>
                      </div>

                      {/* Price and Quantity */}
                      <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-primary/10 rounded-full">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                              className="w-10 h-10 flex items-center justify-center text-primary hover:bg-primary/5 rounded-l-full"
                            >
                              −
                            </button>
                            <span className="w-12 text-center">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                              className="w-10 h-10 flex items-center justify-center text-primary hover:bg-primary/5 rounded-r-full"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="text-lg font-medium text-primary">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Cart Actions */}
              <div className="flex flex-wrap gap-4">
                <Link href="/products" className="btn-outline-primary flex items-center gap-2 px-6 py-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                  </svg>
                  Continue Shopping
                </Link>
                <button 
                  onClick={clearCart}
                  className="btn-outline-danger flex items-center gap-2 px-6 py-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-background-secondary rounded-xl p-6 shadow-sm border border-primary/5">
                <h2 className="text-xl font-medium mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-textColor-muted">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>
                  
                  {discount.amount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-textColor-muted">Shipping</span>
                    <span className={shipping > 0 ? 'text-textColor-muted' : 'text-green-600'}>
                      {shipping > 0 ? `₹${shipping.toFixed(2)}` : 'Free'}
                    </span>
                  </div>
                  
                  <div className="border-t border-primary/10 pt-4 flex justify-between text-lg font-medium">
                    <span>Total</span>
                    <span className="text-primary">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Coupon Section */}
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon code"
                      className="input-primary pr-24"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={applyingCoupon}
                      className="absolute right-2 top-2 btn-primary px-4 py-1.5 text-sm"
                    >
                      {applyingCoupon ? 'Applying...' : 'Apply'}
                    </button>
                  </div>
                  
                  {couponError && (
                    <p className="mt-2 text-sm text-red-500">{couponError}</p>
                  )}
                  {couponSuccess && (
                    <p className="mt-2 text-sm text-green-600">{couponSuccess}</p>
                  )}
                </div>

                <button
                  onClick={handleCheckout}
                  className="btn-primary w-full py-3.5 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Proceed to Checkout
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-textColor-muted">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                  <span>Secure SSL Encryption</span>
                </div>
              </div>

              {/* Coupon Examples */}
              <div className="mt-6 p-4 bg-primary/5 rounded-xl">
                <h3 className="text-sm font-medium mb-2">Try these coupon codes:</h3>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setCouponCode('WELCOME10')}
                    className="text-xs text-center p-2 bg-background rounded hover:bg-primary/10 transition-colors"
                  >
                    WELCOME10
                  </button>
                  <button
                    onClick={() => setCouponCode('SAVE20')}
                    className="text-xs text-center p-2 bg-background rounded hover:bg-primary/10 transition-colors"
                  >
                    SAVE20
                  </button>
                  <button
                    onClick={() => setCouponCode('FLAT500')}
                    className="text-xs text-center p-2 bg-background rounded hover:bg-primary/10 transition-colors"
                  >
                    FLAT500
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}






// "use client"
// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useCart } from '@/context/CartContext';

// export default function CartPage() {
//   const router = useRouter();
//   const { cart, updateCartItemQuantity, removeFromCart, clearCart } = useCart();
//   const [loading, setLoading] = useState(true);
//   const [couponCode, setCouponCode] = useState('');
//   const [couponError, setCouponError] = useState('');
//   const [couponSuccess, setCouponSuccess] = useState('');
//   const [applyingCoupon, setApplyingCoupon] = useState(false);
  
//   // Sample coupon codes for demo
//   const validCoupons = {
//     'WELCOME10': { discount: 10, type: 'percentage' },
//     'SAVE20': { discount: 20, type: 'percentage' },
//     'FLAT500': { discount: 500, type: 'fixed' }
//   };
  
//   // Used for demo purposes - in a real app this would come from the backend
//   const [discount, setDiscount] = useState({ amount: 0, type: null });
  
//   useEffect(() => {
//     // Simulate loading of cart data
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 500);
    
//     return () => clearTimeout(timer);
//   }, []);
  
//   // Calculate totals
//   const subtotal = cart.reduce((total, item) => {
//     return total + (item.price * item.quantity);
//   }, 0);
  
//   // Apply discount if any
//   let discountAmount = 0;
//   if (discount.type === 'percentage') {
//     discountAmount = subtotal * (discount.amount / 100);
//   } else if (discount.type === 'fixed') {
//     discountAmount = discount.amount;
//   }
  
//   // Sample shipping fee
//   const shipping = subtotal > 999 ? 0 : 99;
  
//   // Calculate total
//   const total = subtotal - discountAmount + shipping;
  
//   const handleQuantityChange = (itemId, size, newQuantity) => {
//     // Ensure quantity is at least 1
//     const quantity = Math.max(1, newQuantity);
//     updateCartItemQuantity(itemId, size, quantity);
//   };
  
//   const handleRemoveItem = (itemId, size) => {
//     removeFromCart(itemId, size);
//   };
  
//   const handleApplyCoupon = () => {
//     // Reset states
//     setCouponError('');
//     setCouponSuccess('');
    
//     if (!couponCode.trim()) {
//       setCouponError('Please enter a coupon code');
//       return;
//     }
    
//     setApplyingCoupon(true);
    
//     // Simulate API call delay
//     setTimeout(() => {
//       const coupon = validCoupons[couponCode.trim().toUpperCase()];
//       if (coupon) {
//         setDiscount({ amount: coupon.discount, type: coupon.type });
//         setCouponSuccess(
//           coupon.type === 'percentage'
//             ? `${coupon.discount}% discount applied!`
//             : `₹${coupon.discount} discount applied!`
//         );
//       } else {
//         setCouponError('Invalid coupon code');
//       }
//       setApplyingCoupon(false);
//     }, 800);
//   };
  
//   const handleCheckout = () => {
//     // Redirect to checkout page
//     router.push('/checkout');
//   };
  
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <main className="py-10 md:py-16">
//           <div className="container mx-auto px-4">
//             <div className="flex justify-center items-center h-64">
//               <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//             </div>
//           </div>
//         </main>
//       </div>
//     );
//   }
  
//   // If cart is empty
//   if (cart.length === 0) {
//     return (
//       <div className="min-h-screen bg-background">
//         <main className="py-10 md:py-16">
//           <div className="container mx-auto px-4">
//             <h1 className="text-2xl md:text-3xl font-light text-primary mb-8">Shopping Cart</h1>
            
//             <div className="bg-background-secondary border border-primary/5 rounded-lg p-8 text-center">
//               <div className="inline-flex justify-center items-center rounded-full bg-primary/5 p-4 mb-4">
//                 <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
//                 </svg>
//               </div>
//               <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
//               <p className="text-textColor-muted mb-6">Looks like you haven't added any items to your cart yet.</p>
//               <Link href="/products" className="btn-primary px-8 py-3 inline-block">
//                 Continue Shopping
//               </Link>
//             </div>
//           </div>
//         </main>
//       </div>
//     );
//   }
  
//   return (
//     <div className="min-h-screen bg-background">
//       <main className="py-10 md:py-16">
//         <div className="container mx-auto px-4">
//           <h1 className="text-2xl md:text-3xl font-light text-primary mb-8">Shopping Cart</h1>
          
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Cart Items */}
//             <div className="lg:col-span-2">
//               <div className="bg-background-secondary border border-primary/5 rounded-lg overflow-hidden">
//                 <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-background-secondary text-textColor-muted">
//                   <div className="col-span-6">Product</div>
//                   <div className="col-span-2 text-center">Price</div>
//                   <div className="col-span-2 text-center">Quantity</div>
//                   <div className="col-span-2 text-center">Total</div>
//                 </div>
                
//                 <div className="divide-y divide-primary/5">
//                   {cart.map((item) => (
//                     <div key={`${item.id}-${item.size}`} className="p-4 md:py-6 md:grid grid-cols-12 gap-4 items-center">
//                       {/* Product Info */}
//                       <div className="col-span-6 flex items-center mb-4 md:mb-0">
//                         <div className="relative w-16 h-16 flex-shrink-0 bg-primary/5 rounded overflow-hidden">
//                           <Image 
//                             src={item.images[0] || '/assets/frontend_assets/products/placeholder.svg'} 
//                             alt={item.name}
//                             fill
//                             className="object-cover"
//                           />
//                         </div>
//                         <div className="ml-4">
//                           <h3 className="font-medium text-textColor-primary">
//                             <Link href={`/products/${item.id}`} className="hover:text-primary">
//                               {item.name}
//                             </Link>
//                           </h3>
//                           {item.size && (
//                             <p className="text-sm text-textColor-muted">Size: {item.size}</p>
//                           )}
//                           <button 
//                             onClick={() => handleRemoveItem(item.id, item.size)}
//                             className="text-sm text-red-500 hover:text-red-700 mt-1 flex items-center"
//                           >
//                             <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
//                             </svg>
//                             Remove
//                           </button>
//                         </div>
//                       </div>
                      
//                       {/* Price */}
//                       <div className="col-span-2 text-center">
//                         <div className="md:hidden text-sm text-textColor-muted mb-1">Price:</div>
//                         <span>₹{item.price}</span>
//                       </div>
                      
//                       {/* Quantity */}
//                       <div className="col-span-2 text-center">
//                         <div className="md:hidden text-sm text-textColor-muted mb-1">Quantity:</div>
//                         <div className="flex items-center justify-center">
//                           <button 
//                             onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
//                             className="w-8 h-8 rounded-full border border-primary/10 flex items-center justify-center text-primary hover:bg-primary/5"
//                           >
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
//                             </svg>
//                           </button>
//                           <span className="mx-3 w-8 text-center">{item.quantity}</span>
//                           <button 
//                             onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
//                             className="w-8 h-8 rounded-full border border-primary/10 flex items-center justify-center text-primary hover:bg-primary/5"
//                           >
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m6-6H6"></path>
//                             </svg>
//                           </button>
//                         </div>
//                       </div>
                      
//                       {/* Total */}
//                       <div className="col-span-2 text-center font-medium">
//                         <div className="md:hidden text-sm text-textColor-muted mb-1">Total:</div>
//                         <span>₹{item.price * item.quantity}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
//                 <Link href="/products" className="btn-outline-primary px-6 py-2.5 flex items-center">
//                   <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
//                   </svg>
//                   Continue Shopping
//                 </Link>
                
//                 <button 
//                   onClick={() => clearCart()}
//                   className="btn-outline-danger px-6 py-2.5 flex items-center"
//                 >
//                   <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
//                   </svg>
//                   Clear Cart
//                 </button>
//               </div>
//             </div>
            
//             {/* Order Summary */}
//             <div className="lg:col-span-1">
//               <div className="bg-background-secondary border border-primary/5 rounded-lg p-6">
//                 <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                
//                 <div className="space-y-3 mb-6">
//                   <div className="flex justify-between">
//                     <span className="text-textColor-muted">Subtotal</span>
//                     <span>₹{subtotal.toFixed(2)}</span>
//                   </div>
                  
//                   {discount.amount > 0 && (
//                     <div className="flex justify-between text-green-600">
//                       <span>Discount</span>
//                       <span>-₹{discountAmount.toFixed(2)}</span>
//                     </div>
//                   )}
                  
//                   <div className="flex justify-between">
//                     <span className="text-textColor-muted">Shipping</span>
//                     <span>{shipping > 0 ? `₹${shipping.toFixed(2)}` : 'Free'}</span>
//                   </div>
                  
//                   {shipping > 0 && (
//                     <div className="text-xs text-textColor-muted mt-1">
//                       Free shipping on orders above ₹999
//                     </div>
//                   )}
                  
//                   <div className="border-t border-primary/5 pt-3 flex justify-between font-medium text-lg">
//                     <span>Total</span>
//                     <span>₹{total.toFixed(2)}</span>
//                   </div>
//                 </div>
                
//                 {/* Coupon Code */}
//                 <div className="mb-6">
//                   <label htmlFor="coupon" className="block text-sm font-medium mb-2">
//                     Apply Coupon
//                   </label>
//                   <div className="flex">
//                     <input
//                       type="text"
//                       id="coupon"
//                       value={couponCode}
//                       onChange={(e) => setCouponCode(e.target.value)}
//                       placeholder="Enter coupon code"
//                       className="input-primary flex-grow"
//                     />
//                     <button
//                       onClick={handleApplyCoupon}
//                       disabled={applyingCoupon}
//                       className="btn-primary ml-2 px-4 whitespace-nowrap"
//                     >
//                       {applyingCoupon ? (
//                         <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                       ) : (
//                         'Apply'
//                       )}
//                     </button>
//                   </div>
//                   {couponError && (
//                     <p className="mt-2 text-sm text-red-500">{couponError}</p>
//                   )}
//                   {couponSuccess && (
//                     <p className="mt-2 text-sm text-green-600">{couponSuccess}</p>
//                   )}
                  
//                   {/* Sample coupons hint */}
//                   <div className="mt-2 text-xs text-textColor-muted">
//                     <p className="font-medium">Try these coupon codes:</p>
//                     <ul className="mt-1 ml-4 list-disc">
//                       <li>WELCOME10 (10% off)</li>
//                       <li>SAVE20 (20% off)</li>
//                       <li>FLAT500 (₹500 off)</li>
//                     </ul>
//                   </div>
//                 </div>
                
//                 <button
//                   onClick={handleCheckout}
//                   className="btn-primary w-full py-3"
//                 >
//                   Proceed to Checkout
//                 </button>
                
//                 <div className="mt-4 flex items-center justify-center text-textColor-muted text-sm space-x-2">
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
//                   </svg>
//                   <span>Secure Checkout</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// } 