"use client"
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cart, cartTotal, cartCount } = useCart();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  
  const cartRef = useRef(null);
  const userMenuRef = useRef(null);
  
  // Check if user is logged in
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse("storedUser"));
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking auth state:', error);
        setUser(null);
      }
    };
    
    checkAuth();
    window.addEventListener('storage', checkAuth); // Listen for storage changes
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle page navigation (close mobile menu)
  useEffect(() => {
    setIsMenuOpen(false);
    setIsCartOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsUserMenuOpen(false);
    router.push('/');
  };
  
  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/products' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'My Profile', href: '/account/profile' }
  ];
  
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/frontend_assets/logo/logo.png"
              alt="NOZE Perfumes"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={`text-sm hover:text-primary transition-colors ${
                  pathname === link.href ? 'text-primary' : 'text-textColor-secondary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Icon */}
            <button className="text-textColor-secondary hover:text-primary transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
            
            {/* Account Icon & Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="text-textColor-secondary hover:text-primary transition-colors flex items-center"
              >
                {user ? (
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {user.firstName?.charAt(0) || 'U'}
                    </div>
                    <svg className={`w-4 h-4 ml-1 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                )}
              </button>
              
              {/* User Menu Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-background shadow-lg rounded-lg overflow-hidden z-30 border border-primary/10">
                  {user ? (
                    <>
                      <div className="p-4 border-b border-primary/10">
                        <p className="text-sm text-textColor-muted">Signed in as</p>
                        <p className="font-medium truncate">{user.email}</p>
                      </div>
                      <div className="py-2">
                        <Link href="/account/profile" className="block px-4 py-2 text-sm hover:bg-primary/5 hover:text-primary">
                          My Profile
                        </Link>
                        <Link href="/account/orders" className="block px-4 py-2 text-sm hover:bg-primary/5 hover:text-primary">
                          My Orders
                        </Link>
                        <Link href="/account/addresses" className="block px-4 py-2 text-sm hover:bg-primary/5 hover:text-primary">
                          My Addresses
                        </Link>
                        <Link href="/account/wishlist" className="block px-4 py-2 text-sm hover:bg-primary/5 hover:text-primary">
                          My Wishlist
                        </Link>
                      </div>
                      <div className="border-t border-primary/10 py-2">
                        <button 
                          onClick={handleLogout}
                          className="w-full text-left block px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                        >
                          Sign Out
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link href="/auth/signin" className="block px-4 py-3 text-center hover:bg-primary hover:text-black transition-colors">
                        Sign In
                      </Link>
                      <div className="border-t border-primary/10">
                        <Link href="/auth/signup" className="block px-4 py-3 text-center text-textColor-muted hover:text-primary">
                          Create an Account
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
            
            {/* Cart Icon & Dropdown */}
            <div className="relative" ref={cartRef}>
              <button 
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="text-textColor-secondary hover:text-primary transition-colors relative"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
                
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-black w-5 h-5 flex items-center justify-center rounded-full text-xs">
                    {cartCount}
                  </span>
                )}
              </button>
              
              {/* Cart Dropdown */}
              {isCartOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-background shadow-lg rounded-lg overflow-hidden z-30 border border-primary/10">
                  <div className="p-4 border-b border-primary/10 flex justify-between items-center">
                    <h3 className="font-medium">Shopping Cart</h3>
                    <span className="text-sm text-textColor-muted">
                      {cartCount} {cartCount === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                  
                  {cart.length === 0 ? (
                    <div className="p-6 text-center">
                      <svg className="w-10 h-10 mx-auto text-primary/20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                      </svg>
                      <p className="mt-3 text-textColor-muted">Your cart is empty</p>
                      <Link 
                        href="/products"
                        className="mt-4 inline-block px-6 py-2 bg-primary text-black hover:bg-primary-dark transition-colors"
                        onClick={() => setIsCartOpen(false)}
                      >
                        Shop Now
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="max-h-60 overflow-y-auto">
                        {cart.map((item) => (
                          <div key={`${item.id}-${item.size}`} className="flex items-center p-4 border-b border-primary/5">
                            <div className="w-14 h-14 relative rounded-md overflow-hidden bg-background-primary shrink-0">
                              <Image
                                src={'/assets/frontend_assets/products/placeholdr.svg'}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            
                            <div className="ml-3 flex-1 min-w-0">
                              <Link 
                                href={`/products/${item.id}`}
                                className="text-sm font-medium hover:text-primary truncate block"
                                onClick={() => setIsCartOpen(false)}
                              >
                                {item.name}
                              </Link>
                              <div className="flex text-xs text-textColor-muted mt-1">
                                <span>{item.size}</span>
                                <span className="mx-1">·</span>
                                <span>Qty: {item.quantity}</span>
                              </div>
                              <div className="text-sm mt-1">₹{item.price.toFixed(2)}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="p-4 border-t border-primary/10">
                        <div className="flex justify-between mb-4">
                          <span className="font-medium">Subtotal</span>
                          <span className="font-medium text-primary">₹{cartTotal.toFixed(2)}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <Link
                            href="/cart"
                            className="btn-outline-primary py-2 text-center text-sm"
                            onClick={() => {router.push('/cart');
                              setIsCartOpen(false);
                              
                            }}
                          >
                            View Cart 
                          </Link>
                          <Link
                            href="/checkout"
                            className="btn-primary py-2 text-center text-sm"
                            onClick={() => {
                              setIsCartOpen(false);
                              router.push('/checkout');
                            }}
                          >
                            Checkout
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile Menu & Icons */}
          <div className="flex items-center space-x-4 md:hidden">
            {/* Cart Icon */}
            <button 
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="text-textColor-secondary relative"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-black w-5 h-5 flex items-center justify-center rounded-full text-xs">
                  {cartCount}
                </span>
              )}
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-textColor-secondary"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Cart Dropdown */}
      {isCartOpen && (
        <div className="absolute right-4 left-4 mt-2 md:hidden bg-background shadow-lg rounded-lg overflow-hidden z-30 border border-primary/10">
          <div className="p-4 border-b border-primary/10 flex justify-between items-center">
            <h3 className="font-medium">Shopping Cart</h3>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="text-textColor-muted"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          {cart.length === 0 ? (
            <div className="p-6 text-center">
              <svg className="w-10 h-10 mx-auto text-primary/20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              <p className="mt-3 text-textColor-muted">Your cart is empty</p>
              <Link 
                href="/products"
                className="mt-4 inline-block px-6 py-2 bg-primary text-black hover:bg-primary-dark transition-colors"
                onClick={() => setIsCartOpen(false)}
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <>
              <div className="max-h-60 overflow-y-auto">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex items-center p-4 border-b border-primary/5">
                    <div className="w-14 h-14 relative rounded-md overflow-hidden bg-background-primary shrink-0">
                      <Image
                        src={'/assets/frontend_assets/products/placeholder.jpg'}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="ml-3 flex-1 min-w-0">
                      <Link 
                        href={`/products/${item.id}`}
                        className="text-sm font-medium hover:text-primary truncate block"
                        onClick={() => setIsCartOpen(false)}
                      >
                        {item.name}
                      </Link>
                      <div className="flex text-xs text-textColor-muted mt-1">
                        <span>{item.size}</span>
                        <span className="mx-1">·</span>
                        <span>Qty: {item.quantity}</span>
                      </div>
                      <div className="text-sm mt-1">₹{item.price.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-primary/10">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-medium text-primary">₹{cartTotal.toFixed(2)}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event bubbling
                      console.log("hwlooo")
                      setIsCartOpen(false);
                      router.push('/cart');
                    }}
                    className="btn-outline-primary py-2 text-center text-sm"
                  >
                    View Cart 33
                  </button>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      router.push('/checkout');
                    }}
                    className="btn-primary py-2 text-center text-sm"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      
      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background shadow-lg md:hidden z-30 border-t border-primary/10">
          <div className="py-2">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={`block px-4 py-3 hover:bg-primary/5 transition-colors ${
                  pathname === link.href ? 'text-primary' : 'text-textColor-secondary'
                }`}
                onClick={() =>{ setIsMenuOpen(false) , router.push(`/${link.label}`)}}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="border-t border-primary/10 mt-2 pt-2">
              {user ? (
                <>
                  <div className="px-4 py-3">
                    <p className="text-sm text-textColor-muted">Signed in as</p>
                    <p className="font-medium truncate">{user.email}</p>
                  </div>
                  <Link
                    href="/account/profile"
                    className="block px-4 py-3 hover:bg-primary/5 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/account/orders"
                    className="block px-4 py-3 hover:bg-primary/5 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="block px-4 py-3 hover:bg-primary/5 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="block px-4 py-3 hover:bg-primary/5 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Create an Account
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 