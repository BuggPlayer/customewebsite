"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useSelector, useDispatch } from "react-redux";
import { place_order } from '@/redux/features/orderSlice';
// import useWindowScrollToTop from '@/hooks/useWindowScrollToTop';
import { toast } from "react-toastify";

export default function CheckoutPage() {
  const { isLoading, errorMessage, successMessage } = useSelector((state) => state.order);
  // const userInfo = JSON.parse(localStorage.getItem("user-info"));
  const [userInfo, setUserInfo] = useState(null);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      // This ensures the code only runs on the client side
      const storedUserInfo = localStorage.getItem("user-info");
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      }
    }
  }, []);
  const dispatch = useDispatch();
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    paymentMethod: 'cod'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);
  
  useEffect(() => {
    // Check if cart is empty, redirect to cart page if so
    // if (cart.length === 0 && !orderPlaced) {
    //   router.push('/cart');
    //   return;
    // }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    // Attempt to pre-fill with user data if available
    const user = localStorage.getItem('user-info');
    if (user) {
      try {
        const userData = JSON.parse(user);
        setFormData(prev => ({
          ...prev,
          email: userData.email || '',
          firstName: userData.name || '',
          lastName: userData.lastName || ''
        }));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    
    return () => clearTimeout(timer);
  }, [cart.length, router, orderPlaced]);
  
  // Calculate totals
  const subtotal = cart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  // Sample shipping fee
  const shipping = subtotal > 999 ? 0 : 99;
  
  // Calculate total
  const total = subtotal + shipping;
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when input changes
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 
      'address', 'city', 'state', 'postalCode'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
      }
    });
    
    // Validate email format
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }
    
    // Validate phone number (simple 10-digit check)
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    // Validate postal code (simple 6-digit check for India)
    if (formData.postalCode && !/^\d{6}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Please enter a valid 6-digit postal code';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.getElementById(firstErrorField);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    setIsSubmitting(true);
    // useWindowScrollToTop();
    try {

      const orderDetails = {
        products: cart.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          discounted_price: item.discounted_price || 0, // Default to 0 if no discount
          quantity: item.quantity,
          image: item.images?.[0] || "default.jpg", // Fallback to a default image
          discount: item.discount || 0, // Default to 0 if no discount
          sellerId: item.sellerId,
        })),
        shipping_fee: shipping, // Numeric shipping fee
        shippingInfo: {
          address: formData.address, // Shipping address
          city: formData.city, // City
          state: formData.state, // State or region
          postalCode: formData.postalCode, // Postal or ZIP code
          country: formData.country, // Country
          deliveryNotes: formData.deliveryNotes || "", // Optional delivery instructions
        },
        userInfo: {
          userId: userInfo?._id, // User ID from authenticated user
          userName: formData.name, // Full name from form
          userPhone: formData.phone, // Phone number from form
          userEmail: formData.email, // Email from form
        },
        totalPrice: total, // Numeric total price (products + shipping)
        paymentMethod: formData.paymentMethod, // Payment method (e.g., "credit_card", "paypal")
        status: "pending", // Initial order status
        paymentStatus: "unpaid", // Initial payment status
        createdAt: new Date(), // Timestamp of order creation
        updatedAt: new Date(), // Timestamp of last update
      };

     
      dispatch(place_order(orderDetails));  
          // const generatedOrderId = 'ORD' + Math.floor(100000 + Math.random() * 900000);
        
      // router.push('/');
      
      // Clear the cart after successful order
      // clearCart();
    } catch (error) {
      console.error('Error placing order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {

    console.log("errorMessage0---",errorMessage, successMessage)
    // inside your effect or function:
if (successMessage) {
  setOrderPlaced(true);
}
    // if (successMessage) {
    //   // toast.success(successMessage);
    //         // clearCart();
    //         // router.push('/');
    //         <OrderSuccessPage />
    //   // setShowConfirmationModal(true);
    //   // setTimeout(() => dispatch(messageClear()), 3000);
    // }
    if (errorMessage) {
      // alert("wefrb" ,errorMessage)
      toast.error(errorMessage);
      // setTimeout(() => dispatch(messageClear()), 3000);
    }
  }, [successMessage, errorMessage, dispatch]);
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
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
      </div>
    );
  }


  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          {/* Success Card - Now properly centered */}
          <div className="bg-background-secondary border border-primary/10 rounded-xl p-6 sm:p-8 lg:p-10 text-center shadow-sm">
            
            {/* Success Icon with Animation */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="rounded-full bg-green-100/80 p-3 animate-pulse">
                  <div className="rounded-full bg-green-100 p-3 animate-ping absolute inset-0"></div>
                  <svg 
                    className="h-12 w-12 text-green-600 relative" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Success Heading */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-primary mb-4">
              Order Placed Successfully!
            </h1>
            
            {/* Success Message */}
            <p className="text-textColor-muted mb-6 text-base sm:text-lg max-w-lg mx-auto">
              Thank you for your order. We've received your purchase and will begin processing it shortly.
            </p>
            
            {/* Order ID Card */}
            <div className="bg-primary/5 rounded-lg p-4 sm:p-5 mb-6 border border-primary/10 mx-auto max-w-md">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                <span className="text-textColor-secondary font-medium whitespace-nowrap">
                  Order ID:
                </span>
                <span className="text-primary font-semibold text-lg sm:text-xl tracking-wider">
                  {orderId || '12345678'}
                </span>
                <button 
                  onClick={() => navigator.clipboard.writeText(orderId)}
                  className="text-primary hover:text-primary-dark text-sm flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                  </svg>
                  Copy
                </button>
              </div>
            </div>
            
            {/* Delivery Info */}
            <div className="mb-8 space-y-4 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-3 text-textColor-muted">
                <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span>Confirmation sent to <strong>{formData.email}</strong></span>
              </div>
              
              <div className="flex items-center justify-center gap-3 text-textColor-muted">
                <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>Delivering to <strong>{formData.address}, {formData.city}</strong></span>
              </div>
            </div>
            
            {/* Action Buttons - Centered */}
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link 
                href="/account/orders" 
                className="btn-primary py-3 px-6 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
                View Order
              </Link>
              <Link 
                href="/" 
                className="btn-outline-primary py-3 px-6 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                </svg>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background">
      <main className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-light text-primary mb-6">Checkout</h1>
          
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Customer Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-background-secondary border border-primary/5 rounded-lg p-6">
                  <h2 className="text-lg font-medium mb-4">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                        First Name*
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`input-primary w-full ${errors.firstName ? 'border-red-500' : ''}`}
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                        Last Name*
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`input-primary w-full ${errors.lastName ? 'border-red-500' : ''}`}
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`input-primary w-full ${errors.email ? 'border-red-500' : ''}`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1">
                        Phone Number*
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`input-primary w-full ${errors.phone ? 'border-red-500' : ''}`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium mb-1">
                      Address*
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`input-primary w-full ${errors.address ? 'border-red-500' : ''}`}
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-1">
                        City*
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`input-primary w-full ${errors.city ? 'border-red-500' : ''}`}
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium mb-1">
                        State*
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`input-primary w-full ${errors.state ? 'border-red-500' : ''}`}
                      />
                      {errors.state && (
                        <p className="mt-1 text-sm text-red-500">{errors.state}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium mb-1">
                        Postal Code*
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className={`input-primary w-full ${errors.postalCode ? 'border-red-500' : ''}`}
                      />
                      {errors.postalCode && (
                        <p className="mt-1 text-sm text-red-500">{errors.postalCode}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="bg-background-secondary border border-primary/5 rounded-lg p-6">
                  <h2 className="text-lg font-medium mb-4">Payment Method</h2>
                  
                  <div className="space-y-3">
                    {/* <div className="flex items-center">
                      <input
                        id="creditCard"
                        name="paymentMethod"
                        type="radio"
                        value="creditCard"
                        checked={formData.paymentMethod === 'creditCard'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary focus:ring-primary"
                      />
                      <label htmlFor="creditCard" className="ml-3 flex items-center">
                        <span className="mr-2">Credit/Debit Card</span>
                        <div className="flex space-x-1">
                          <Image src="/assets/frontend_assets/payment/visa.svg" alt="Visa" width={32} height={20} />
                          <Image src="/assets/frontend_assets/payment/mastercard.svg" alt="Mastercard" width={32} height={20} />
                          <Image src="/assets/frontend_assets/payment/amex.svg" alt="American Express" width={32} height={20} />
                        </div>
                      </label>
                    </div> */}
                    
                    {/* <div className="flex items-center">
                      <input
                        id="upi"
                        name="paymentMethod"
                        type="radio"
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary focus:ring-primary"
                      />
                      <label htmlFor="upi" className="ml-3 flex items-center">
                        <span className="mr-2">UPI</span>
                        <div className="flex space-x-1">
                          <Image src="/assets/frontend_assets/payment/gpay.svg" alt="Google Pay" width={32} height={20} />
                          <Image src="/assets/frontend_assets/payment/phonepe.svg" alt="PhonePe" width={32} height={20} />
                          <Image src="/assets/frontend_assets/payment/paytm.svg" alt="Paytm" width={32} height={20} />
                        </div>
                      </label>
                    </div> */}
                    
                    <div className="flex items-center">
                      <input
                        id="cod"
                        name="paymentMethod"
                        type="radio"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary focus:ring-primary"
                      />
                      <label htmlFor="cod" className="ml-3">
                        Cash on Delivery (COD)
                      </label>
                    </div>
                  </div>
                  
                  {/* Credit Card Fields - conditionally shown */}
                  {formData.paymentMethod === 'creditCard' && (
                    <div className="mt-4 pt-4 border-t border-primary/10">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            className="input-primary w-full"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="expiry" className="block text-sm font-medium mb-1">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              id="expiry"
                              placeholder="MM/YY"
                              className="input-primary w-full"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="cvv" className="block text-sm font-medium mb-1">
                              CVV
                            </label>
                            <input
                              type="text"
                              id="cvv"
                              placeholder="123"
                              className="input-primary w-full"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="cardName" className="block text-sm font-medium mb-1">
                            Name on Card
                          </label>
                          <input
                            type="text"
                            id="cardName"
                            placeholder="John Smith"
                            className="input-primary w-full"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* UPI Fields */}
                  {/* {formData.paymentMethod === 'upi' && (
                    <div className="mt-4 pt-4 border-t border-primary/10">
                      <div>
                        <label htmlFor="upiId" className="block text-sm font-medium mb-1">
                          UPI ID
                        </label>
                        <input
                          type="text"
                          id="upiId"
                          placeholder="example@bank"
                          className="input-primary w-full"
                        />
                        <p className="mt-1 text-xs text-textColor-muted">
                          Enter your UPI ID (e.g., yourname@upi)
                        </p>
                      </div>
                    </div>
                  )} */}
                </div>
              </div>
              
              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-background-secondary border border-primary/5 rounded-lg p-6 sticky top-6">
                  <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                  
                  <div className="max-h-64 overflow-y-auto mb-4">
                    {cart.map((item, index) => (
                      <div 
                        key={`${item.id}-${item.size || ''}`}
                        className={`flex items-center py-2 ${index !== 0 ? 'border-t border-primary/5' : ''}`}
                      >
                        <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={item.images[0] || '/assets/frontend_assets/products/placeholder.jpg'}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        
                        <div className="ml-3 flex-grow">
                        <h3 
      className="text-sm font-medium truncate max-w-[160px] xs:max-w-[200px] sm:max-w-[260px] md:max-w-[300px]"
      title={item.name} // Add title attribute for native tooltip
    >
      {item.name}
    </h3>                          <p className="text-xs text-textColor-muted">
                            {item.size && `Size: ${item.size}`}
                            <span className="mx-1">•</span>
                            Qty: {item.quantity}
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-3 mb-6 pt-4 border-t border-primary/10">
                    <div className="flex justify-between">
                      <span className="text-textColor-muted">Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-textColor-muted">Shipping</span>
                      <span>{shipping > 0 ? `₹${shipping.toFixed(2)}` : 'Free'}</span>
                    </div>
                    
                    {shipping > 0 && (
                      <div className="text-xs text-textColor-muted">
                        Free shipping on orders above ₹999
                      </div>
                    )}
                    
                    <div className="border-t border-primary/5 pt-3 flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary py-3 flex justify-center items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Place Order'
                    )}
                  </button>
                  
                  <div className="mt-4 flex flex-col items-center justify-center text-textColor-muted text-sm space-y-2">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                      </svg>
                      <span>Secure Checkout</span>
                    </div>
                    <p className="text-xs text-center">
                      By placing your order, you agree to our
                      <Link href="/terms" className="text-primary hover:underline ml-1">
                        Terms of Service
                      </Link>
                      <span className="mx-1">and</span>
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
} 