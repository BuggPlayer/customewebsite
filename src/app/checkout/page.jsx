"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const [loading, setLoading] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    // Contact Information
    email: '',
    phone: '',
    
    // Shipping Information
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    
    // Payment Information
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    
    // Additional Information
    orderNotes: '',
    saveInfo: true,
  });
  
  // Validation state
  const [errors, setErrors] = useState({});
  
  // Shipping options
  const shippingOptions = [
    { id: 'standard', name: 'Standard Shipping', price: 49, time: '3-5 business days' },
    { id: 'express', name: 'Express Shipping', price: 149, time: '1-2 business days' },
    { id: 'free', name: 'Free Shipping', price: 0, time: '5-7 business days', minOrderValue: 1499 },
  ];
  
  const [selectedShipping, setSelectedShipping] = useState('standard');
  
  // Calculate if free shipping is available
  const isFreeShippingAvailable = cartTotal >= 1499;
  
  // If free shipping is available, automatically select it
  useEffect(() => {
    if (isFreeShippingAvailable) {
      setSelectedShipping('free');
    }
  }, [isFreeShippingAvailable]);
  
  // Get selected shipping option
  const getSelectedShippingOption = () => {
    return shippingOptions.find(option => option.id === selectedShipping);
  };

  // Check if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      router.push('/products');
    }
  }, [cart, router]);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  // Validate form for current step
  const validateCurrentStep = () => {
    const newErrors = {};
    
    if (step === 1) {
      // Validate contact & shipping info
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
    } else if (step === 2) {
      // Validate payment info
      if (formData.paymentMethod === 'card') {
        if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
        if (!formData.cardName) newErrors.cardName = 'Name on card is required';
        if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
        if (!formData.cvv) newErrors.cvv = 'CVV is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle next step
  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Handle previous step
  const handlePreviousStep = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Calculate order summary
  const subtotal = cartTotal;
  const shipping = getSelectedShippingOption()?.price || 0;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;
  
  // Handle order placement
  const handlePlaceOrder = async () => {
    if (validateCurrentStep()) {
      setLoading(true);
      
      // Simulate API call
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Order successfully placed
        clearCart();
        
        // Redirect to success page
        router.push('/checkout/success');
      } catch (error) {
        console.error('Error placing order:', error);
        alert('There was an error processing your order. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-background text-textColor-secondary font-primary">
      <Navbar />
      
      <main className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          {/* Checkout Steps */}
          <div className="mb-12">
            <h1 className="text-center text-2xl md:text-3xl font-light text-primary mb-8">Checkout</h1>
            
            <div className="flex justify-center items-center">
              <div className={`step-item ${step >= 1 ? 'active' : ''}`}>
                <div className="step-counter">1</div>
                <div className="step-name">Shipping</div>
              </div>
              
              <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
              
              <div className={`step-item ${step >= 2 ? 'active' : ''}`}>
                <div className="step-counter">2</div>
                <div className="step-name">Payment</div>
              </div>
              
              <div className={`step-line ${step >= 3 ? 'active' : ''}`}></div>
              
              <div className={`step-item ${step >= 3 ? 'active' : ''}`}>
                <div className="step-counter">3</div>
                <div className="step-name">Review</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Checkout Form */}
            <div className="flex-1">
              {/* Step 1: Shipping */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-light mb-6">Shipping Information</h2>
                  
                  <div className="space-y-6">
                    {/* Contact Information */}
                    <div>
                      <h3 className="text-lg font-light mb-4">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="email" className="block mb-1">Email Address</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`input-primary w-full ${errors.email ? 'border-red-500' : ''}`}
                            placeholder="your@email.com"
                          />
                          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block mb-1">Phone Number</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`input-primary w-full ${errors.phone ? 'border-red-500' : ''}`}
                            placeholder="Your phone number"
                          />
                          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>
                      </div>
                    </div>
                    
                    {/* Shipping Address */}
                    <div>
                      <h3 className="text-lg font-light mb-4">Shipping Address</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="firstName" className="block mb-1">First Name</label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className={`input-primary w-full ${errors.firstName ? 'border-red-500' : ''}`}
                            placeholder="First name"
                          />
                          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                        </div>
                        
                        <div>
                          <label htmlFor="lastName" className="block mb-1">Last Name</label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className={`input-primary w-full ${errors.lastName ? 'border-red-500' : ''}`}
                            placeholder="Last name"
                          />
                          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                        </div>
                        
                        <div className="md:col-span-2">
                          <label htmlFor="address" className="block mb-1">Address</label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className={`input-primary w-full ${errors.address ? 'border-red-500' : ''}`}
                            placeholder="Street address"
                          />
                          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                        </div>
                        
                        <div className="md:col-span-2">
                          <label htmlFor="apartment" className="block mb-1">Apartment, Suite, etc. (optional)</label>
                          <input
                            type="text"
                            id="apartment"
                            name="apartment"
                            value={formData.apartment}
                            onChange={handleInputChange}
                            className="input-primary w-full"
                            placeholder="Apartment, suite, unit, etc."
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="city" className="block mb-1">City</label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className={`input-primary w-full ${errors.city ? 'border-red-500' : ''}`}
                            placeholder="City"
                          />
                          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                        </div>
                        
                        <div>
                          <label htmlFor="state" className="block mb-1">State</label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className={`input-primary w-full ${errors.state ? 'border-red-500' : ''}`}
                            placeholder="State"
                          />
                          {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                        </div>
                        
                        <div>
                          <label htmlFor="postalCode" className="block mb-1">Postal Code</label>
                          <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            className={`input-primary w-full ${errors.postalCode ? 'border-red-500' : ''}`}
                            placeholder="Postal code"
                          />
                          {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                        </div>
                        
                        <div>
                          <label htmlFor="country" className="block mb-1">Country</label>
                          <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="input-primary w-full"
                          >
                            <option value="India">India</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Canada">Canada</option>
                            <option value="Australia">Australia</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    {/* Shipping Method */}
                    <div>
                      <h3 className="text-lg font-light mb-4">Shipping Method</h3>
                      <div className="space-y-4">
                        {shippingOptions.map((option) => (
                          <div key={option.id} className={`
                            p-4 border border-primary/30 rounded flex items-start
                            ${selectedShipping === option.id ? 'border-primary bg-primary/10' : ''}
                            ${option.id === 'free' && !isFreeShippingAvailable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                          `}
                          onClick={() => {
                            if (option.id === 'free' && !isFreeShippingAvailable) return;
                            setSelectedShipping(option.id);
                          }}
                          >
                            <input
                              type="radio"
                              id={`shipping-${option.id}`}
                              name="shippingMethod"
                              checked={selectedShipping === option.id}
                              onChange={() => {
                                if (option.id === 'free' && !isFreeShippingAvailable) return;
                                setSelectedShipping(option.id);
                              }}
                              disabled={option.id === 'free' && !isFreeShippingAvailable}
                              className="mt-1 mr-3"
                            />
                            <div className="flex-1">
                              <label htmlFor={`shipping-${option.id}`} className="block font-medium cursor-pointer">
                                {option.name}
                                {option.id === 'free' && (
                                  <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                                    Free for orders above ₹1499
                                  </span>
                                )}
                              </label>
                              <div className="flex justify-between mt-1">
                                <p className="text-sm text-textColor-muted">{option.time}</p>
                                <p className="font-medium">
                                  {option.price === 0 ? 'FREE' : `₹${option.price.toFixed(2)}`}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Additional Notes */}
                    <div>
                      <h3 className="text-lg font-light mb-4">Additional Notes (Optional)</h3>
                      <textarea
                        id="orderNotes"
                        name="orderNotes"
                        value={formData.orderNotes}
                        onChange={handleInputChange}
                        className="input-primary w-full h-24"
                        placeholder="Special instructions for delivery or product preferences"
                      ></textarea>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="saveInfo"
                        name="saveInfo"
                        checked={formData.saveInfo}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="saveInfo">Save this information for next time</label>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 2: Payment */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-light mb-6">Payment Method</h2>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      {/* Credit Card Option */}
                      <div 
                        className={`p-4 border ${formData.paymentMethod === 'card' ? 'border-primary bg-primary/10' : 'border-primary/30'} rounded cursor-pointer`}
                        onClick={() => setFormData({...formData, paymentMethod: 'card'})}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="payment-card"
                            name="paymentMethod"
                            value="card"
                            checked={formData.paymentMethod === 'card'}
                            onChange={() => setFormData({...formData, paymentMethod: 'card'})}
                            className="mr-3"
                          />
                          <label htmlFor="payment-card" className="flex items-center cursor-pointer">
                            <span className="font-medium">Credit / Debit Card</span>
                            <div className="ml-4 flex space-x-2">
                              <div className="w-8 h-5 bg-blue-600 rounded"></div>
                              <div className="w-8 h-5 bg-red-500 rounded"></div>
                              <div className="w-8 h-5 bg-green-600 rounded"></div>
                            </div>
                          </label>
                        </div>
                        
                        {formData.paymentMethod === 'card' && (
                          <div className="mt-4 grid grid-cols-1 gap-4">
                            <div>
                              <label htmlFor="cardNumber" className="block mb-1">Card Number</label>
                              <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                className={`input-primary w-full ${errors.cardNumber ? 'border-red-500' : ''}`}
                                placeholder="1234 5678 9012 3456"
                                maxLength={16}
                              />
                              {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                            </div>
                            
                            <div>
                              <label htmlFor="cardName" className="block mb-1">Name on Card</label>
                              <input
                                type="text"
                                id="cardName"
                                name="cardName"
                                value={formData.cardName}
                                onChange={handleInputChange}
                                className={`input-primary w-full ${errors.cardName ? 'border-red-500' : ''}`}
                                placeholder="John Doe"
                              />
                              {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="expiryDate" className="block mb-1">Expiry Date</label>
                                <input
                                  type="text"
                                  id="expiryDate"
                                  name="expiryDate"
                                  value={formData.expiryDate}
                                  onChange={handleInputChange}
                                  className={`input-primary w-full ${errors.expiryDate ? 'border-red-500' : ''}`}
                                  placeholder="MM/YY"
                                />
                                {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                              </div>
                              
                              <div>
                                <label htmlFor="cvv" className="block mb-1">CVV</label>
                                <input
                                  type="text"
                                  id="cvv"
                                  name="cvv"
                                  value={formData.cvv}
                                  onChange={handleInputChange}
                                  className={`input-primary w-full ${errors.cvv ? 'border-red-500' : ''}`}
                                  placeholder="123"
                                  maxLength={3}
                                />
                                {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Cash on Delivery Option */}
                      <div 
                        className={`p-4 border ${formData.paymentMethod === 'cod' ? 'border-primary bg-primary/10' : 'border-primary/30'} rounded cursor-pointer`}
                        onClick={() => setFormData({...formData, paymentMethod: 'cod'})}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="payment-cod"
                            name="paymentMethod"
                            value="cod"
                            checked={formData.paymentMethod === 'cod'}
                            onChange={() => setFormData({...formData, paymentMethod: 'cod'})}
                            className="mr-3"
                          />
                          <label htmlFor="payment-cod" className="cursor-pointer">
                            <span className="font-medium">Cash on Delivery</span>
                          </label>
                        </div>
                        
                        {formData.paymentMethod === 'cod' && (
                          <p className="mt-2 text-sm text-textColor-muted">
                            Pay with cash upon delivery. Please have the exact amount ready.
                          </p>
                        )}
                      </div>
                      
                      {/* UPI Option */}
                      <div 
                        className={`p-4 border ${formData.paymentMethod === 'upi' ? 'border-primary bg-primary/10' : 'border-primary/30'} rounded cursor-pointer`}
                        onClick={() => setFormData({...formData, paymentMethod: 'upi'})}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="payment-upi"
                            name="paymentMethod"
                            value="upi"
                            checked={formData.paymentMethod === 'upi'}
                            onChange={() => setFormData({...formData, paymentMethod: 'upi'})}
                            className="mr-3"
                          />
                          <label htmlFor="payment-upi" className="flex items-center cursor-pointer">
                            <span className="font-medium">UPI Payment</span>
                            <div className="ml-4 flex space-x-2">
                              <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                              <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                            </div>
                          </label>
                        </div>
                        
                        {formData.paymentMethod === 'upi' && (
                          <p className="mt-2 text-sm text-textColor-muted">
                            You will receive a UPI payment link after order confirmation.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={handlePreviousStep}
                      className="border border-primary text-primary px-8 py-3 hover:bg-primary/10 transition-colors"
                    >
                      Back to Shipping
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 3: Review Order */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-light mb-6">Review Your Order</h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-light mb-4">Shipping Information</h3>
                      <div className="p-4 bg-black/50 rounded">
                        <p><span className="text-textColor-muted">Name:</span> {formData.firstName} {formData.lastName}</p>
                        <p><span className="text-textColor-muted">Email:</span> {formData.email}</p>
                        <p><span className="text-textColor-muted">Phone:</span> {formData.phone}</p>
                        <p className="mt-2"><span className="text-textColor-muted">Address:</span> {formData.address}</p>
                        {formData.apartment && <p>{formData.apartment}</p>}
                        <p>{formData.city}, {formData.state} {formData.postalCode}</p>
                        <p>{formData.country}</p>
                        
                        <p className="mt-2">
                          <span className="text-textColor-muted">Shipping Method:</span> {getSelectedShippingOption()?.name} ({getSelectedShippingOption()?.time})
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-light mb-4">Payment Information</h3>
                      <div className="p-4 bg-black/50 rounded">
                        <p><span className="text-textColor-muted">Payment Method:</span> {
                          formData.paymentMethod === 'card' ? 'Credit/Debit Card' :
                          formData.paymentMethod === 'cod' ? 'Cash on Delivery' :
                          'UPI Payment'
                        }</p>
                        
                        {formData.paymentMethod === 'card' && (
                          <p className="mt-2">
                            <span className="text-textColor-muted">Card Number:</span> 
                            **** **** **** {formData.cardNumber.slice(-4)}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-light mb-4">Your Items</h3>
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div key={`${item.id}-${item.size}`} className="flex space-x-4 p-4 bg-black/50 rounded">
                            <div className="relative w-20 h-20 flex-shrink-0">
                              <Image 
                                src={item.images[0] || '/assets/frontend_assets/products/placeholder.jpg'} 
                                alt={item.name}
                                fill
                                className="object-cover"
                                unoptimized={item.images[0]?.startsWith('http')}
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-light">{item.name}</h4>
                              <p className="text-sm text-textColor-muted">Size: {item.size}</p>
                              <div className="flex justify-between mt-2">
                                <p>Quantity: {item.quantity}</p>
                                <p className="text-primary">₹{((item.discountPrice || item.price) * item.quantity).toFixed(2)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={handlePreviousStep}
                      className="border border-primary text-primary px-8 py-3 hover:bg-primary/10 transition-colors"
                    >
                      Back to Payment
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={loading}
                      className="bg-primary text-black px-8 py-3 hover:bg-primary-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        'Place Order'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Order Summary */}
            <div className="w-full lg:w-96">
              <div className="bg-background-secondary p-6 md:p-8 rounded sticky top-24">
                <h2 className="text-xl font-light text-primary mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-textColor-muted">Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-textColor-muted">Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-textColor-muted">GST (18%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-primary/20 pt-4 flex justify-between font-medium">
                    <span>Total</span>
                    <span className="text-primary text-xl">₹{total.toFixed(2)}</span>
                  </div>
                </div>
                
                {step === 1 && (
                  <button
                    onClick={handleNextStep}
                    className="w-full bg-primary text-black py-3 mt-6 hover:bg-primary-dark transition-colors"
                  >
                    Continue to Payment
                  </button>
                )}
                
                {step === 2 && (
                  <button
                    onClick={handleNextStep}
                    className="w-full bg-primary text-black py-3 mt-6 hover:bg-primary-dark transition-colors"
                  >
                    Review Order
                  </button>
                )}
                
                {step === 3 && (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="w-full bg-primary text-black py-3 mt-6 hover:bg-primary-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Place Order'
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* CSS for Steps */}
      <style jsx>{`
        .step-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }
        
        .step-counter {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #121212;
          border: 1px solid rgba(210, 163, 75, 0.3);
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          margin-bottom: 8px;
          transition: all 0.3s;
        }
        
        .step-name {
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          transition: all 0.3s;
        }
        
        .step-line {
          height: 1px;
          width: 60px;
          background-color: rgba(210, 163, 75, 0.3);
          margin: 0 12px;
          margin-bottom: 38px;
          transition: all 0.3s;
        }
        
        .step-item.active .step-counter {
          background-color: #d2a34b;
          border-color: #d2a34b;
          color: #000;
        }
        
        .step-item.active .step-name {
          color: #d2a34b;
        }
        
        .step-line.active {
          background-color: #d2a34b;
        }
        
        @media (max-width: 640px) {
          .step-line {
            width: 30px;
          }
          
          .step-counter {
            width: 24px;
            height: 24px;
            font-size: 12px;
          }
          
          .step-name {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
} 