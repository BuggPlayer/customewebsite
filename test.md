'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAddToCartMutation } from '@/redux/features/cartSlice';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    discountPrice?: number;
    discount?: number;
    images: string[];
    category: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { id, name, price, discountPrice, discount, images, category } = product;
  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await addToCart({
        productId: id,
        quantity: 1,
        size: '50ml'
      }).unwrap();
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist(product);
    }
  };
  
  return (
    <div 
      className="group relative flex flex-col overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${id}`} className="block aspect-[3/4] relative w-full overflow-hidden">
        <div className="relative w-full h-full transform transition-transform duration-300 group-hover:scale-105">
          <Image 
            src={'/assets/frontend_assets/products/placeholdr.svg'}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center"
          />
          
          {/* Wishlist Button */}
          <button
            onClick={handleWishlistClick}
            className="absolute top-4 left-4 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
          >
            <svg
              className={`w-5 h-5 ${isInWishlist(id) ? 'text-primary' : 'text-white'}`}
              fill={isInWishlist(id) ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          
          {discount > 0 && (
            <div className="absolute top-4 right-4 bg-primary text-black px-2 py-1 text-xs font-medium">
              {discount}% OFF
            </div>
          )}
        </div>
      </Link>
      
      <div className="pt-4 flex-grow">
        <div className="text-xs uppercase text-textColor-muted mb-1">{category}</div>
        <Link href={`/products/${id}`} className="block">
          <h3 className="text-lg font-light text-textColor-secondary truncate hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>
        
        <div className="mt-2 flex items-center">
          {discount > 0 ? (
            <>
              <span className="text-primary font-medium">${discountPrice?.toFixed(2)}</span>
              <span className="ml-2 text-textColor-muted line-through text-sm">${price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-primary font-medium">${price.toFixed(2)}</span>
          )}
        </div>
      </div>
      
      <button
        onClick={handleAddToCart}
        disabled={isAddingToCart}
        className="mt-3 w-full py-2 flex justify-center items-center bg-black/80 text-primary hover:bg-primary hover:text-black transition-colors"
      >
        {isAddingToCart ? (
          <svg className="w-5 h-5 text-current animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
        )}
      </button>
    </div>
  );
} 



<div className="lg:col-span-2">
  <div className="bg-background-secondary border border-primary/5 rounded-lg overflow-hidden">
    {/* Table Headers */}
    <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-background-secondary text-textColor-muted text-sm">
      <div className="col-span-6">Product</div>
      <div className="col-span-2 text-center">Price</div>
      <div className="col-span-2 text-center">Quantity</div>
      <div className="col-span-2 text-center">Total</div>
    </div>

    {/* Cart Items */}
    <div className="divide-y divide-primary/5">
      {cart.map((item) => (
        <div key={`${item.id}-${item.size}`} className="p-4 md:py-6 md:grid grid-cols-12 gap-4 items-center hover:bg-primary/2.5 transition-colors">
          {/* Product Info */}
          <div className="col-span-6 flex items-center mb-4 md:mb-0">
            <div className="relative w-16 h-16 flex-shrink-0 bg-primary/5 rounded-lg overflow-hidden">
              <Image 
                src={'/assets/frontend_assets/products/placeholder.svg'} 
                alt={item.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100px, 150px"
              />
            </div>
            <div className="ml-4 min-w-0 flex-1">
              <h3 className="font-medium text-textColor-primary truncate">
                <Link 
                  href={`/products/${item.id}`} 
                  className="hover:text-primary hover:underline"
                >
                  {item.name}
                </Link>
              </h3>
              {item.size && (
                <p className="text-sm text-textColor-muted mt-1">Size: {item.size}</p>
              )}
              <button 
                onClick={() => handleRemoveItem(item.id, item.size)}
                className="text-sm text-red-500 hover:text-red-700 mt-2 flex items-center"
              >
                <TrashIcon className="w-4 h-4 mr-1" />
                Remove
              </button>
            </div>
          </div>
          
          {/* Price */}
          <div className="col-span-2 mt-4 md:mt-0">
            <div className="md:hidden text-sm text-textColor-muted mb-1">Price:</div>
            <div className="text-center">₹{item.price}</div>
          </div>
          
          {/* Quantity */}
          <div className="col-span-2 mt-4 md:mt-0">
            <div className="md:hidden text-sm text-textColor-muted mb-1">Quantity:</div>
            <div className="flex items-center justify-center">
              <button 
                onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                className="w-8 h-8 md:w-10 md:h-10 rounded-lg border border-primary/10 flex items-center justify-center text-primary hover:bg-primary/5 transition-colors"
              >
                <MinusIcon className="w-4 h-4" />
              </button>
              <span className="mx-3 min-w-[2rem] text-center">{item.quantity}</span>
              <button 
                onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                className="w-8 h-8 md:w-10 md:h-10 rounded-lg border border-primary/10 flex items-center justify-center text-primary hover:bg-primary/5 transition-colors"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Total */}
          <div className="col-span-2 mt-4 md:mt-0">
            <div className="md:hidden text-sm text-textColor-muted mb-1">Total:</div>
            <div className="text-center font-medium text-textColor-primary">
              ₹{(item.price * item.quantity).toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  {/* Action Buttons */}
  <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-between">
    <Link 
      href="/products" 
      className="btn-outline-primary px-6 py-3 flex items-center justify-center sm:justify-start"
    >
      <ArrowLeftIcon className="w-5 h-5 mr-2" />
      Continue Shopping
    </Link>
    
    <button 
      onClick={() => clearCart()}
      className="btn-outline-danger px-6 py-3 flex items-center justify-center sm:justify-start order-first sm:order-last"
    >
      <TrashIcon className="w-5 h-5 mr-2" />
      Clear Cart
    </button>
  </div>
</div>

// SVG Icons (add these to your component or icons file)
const TrashIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const PlusIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m6-6H6" />
  </svg>
);

const MinusIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
  </svg>
);

const ArrowLeftIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);





"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SigninPage() {
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const registered = searchParams.get('registered');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // useEffect(() => {
  //   if (registered) {
  //     setSuccessMessage('Account created successfully! Please sign in.');
  //   }
  // }, [registered]);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    return newErrors;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    
    try {
      // This would be your API call to authenticate a user
      // For demo purposes, we'll just simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, just create a mock user object
      const user = {
        id: 'user_1',
        firstName: 'John',
        lastName: 'Doe',
        email: formData.email,
        isLoggedIn: true
      };
      
      // Store user data in localStorage (in a real app, this would use cookies/session)
      localStorage.setItem('user', JSON.stringify(user));
      
      // Redirect to account page or dashboard
      router.push('/account/profile');
    } catch (error) {
      setErrors({
        form: 'Invalid email or password. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-background text-textColor-secondary font-primary">
    
      
      <main className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-md">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-light text-primary mb-4">Sign In</h1>
            <p className="text-textColor-muted">Welcome back to NOZE</p>
          </div>
          
          {successMessage && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-500 px-4 py-3 rounded mb-6">
              {successMessage}
            </div>
          )}
          
          {errors.form && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-3 rounded mb-6">
              {errors.form}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-normal mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`input-primary w-full ${errors.email ? 'border-red-500' : ''}`}
                placeholder="johndoe@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-normal">
                  Password
                </label>
                <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`input-primary w-full pr-10 ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-textColor-muted hover:text-primary focus:outline-none"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>
            
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="h-4 w-4 border border-primary/30 rounded accent-primary focus:ring-primary"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-textColor-muted">
                Remember me
              </label>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex justify-center items-center py-3"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-textColor-muted">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-primary hover:underline">
                Create an Account
              </Link>
            </p>
          </div>
        </div>
      </main>
      
    </div>
  );
} 

i want to make above code with left side img and right side rest stuff , and also add login with google icons

dont remove any thing just make responsesive and look good