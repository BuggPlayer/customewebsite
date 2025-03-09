"use client"
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Transition } from '@headlessui/react';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RelatedProducts from '@/components/products/RelatedProducts';
import { getProductById } from '@/utils/productService';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('50ml');
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const productDescRef = useRef(null);
  
  // Tab options
  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'details', label: 'Details' },
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'reviews', label: 'Reviews' },
  ];
  
  // Available sizes with pricing multipliers
  const sizes = [
    { id: '10ml', label: '10ml Traveler', multiplier: 0.4 },
    { id: '50ml', label: '50ml', multiplier: 1.0 },
    { id: '100ml', label: '100ml', multiplier: 1.8 },
  ];
  
  // Fetch product data
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await getProductById(id);
        if (productData) {
          setProduct(productData);
          setMainImage(productData.images[0]);
          
          // Scroll to top when product loads
          window.scrollTo(0, 0);
        } else {
          // If product not found, redirect to products page
          router.push('/products');
        }
      } catch (error) {
        console.error('Error loading product:', error);
        router.push('/products');
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [id, router]);
  
  // Handle adding to cart
  const handleAddToCart = () => {
    if (!product) return;
    
    setAddingToCart(true);
    
    // Get the price based on selected size
    const selectedSizeObj = sizes.find(size => size.id === selectedSize);
    const priceMultiplier = selectedSizeObj ? selectedSizeObj.multiplier : 1;
    
    const basePrice = product.discountPrice || product.price;
    const sizeAdjustedPrice = basePrice * priceMultiplier;
    
    addToCart({
      ...product,
      size: selectedSize,
      quantity,
      price: sizeAdjustedPrice
    });
    
    setTimeout(() => {
      setAddingToCart(false);
    }, 1000);
  };
  
  // Quantity controls
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  // Image zoom functionality
  const handleMouseMove = (e) => {
    if (!showZoom) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };
  
  // Social sharing
  const handleShare = (platform) => {
    if (!product) return;
    
    const url = window.location.href;
    const text = `Check out ${product.name} on NOZE Perfumes!`;
    
    let shareUrl;
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'pinterest':
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(mainImage)}&description=${encodeURIComponent(text)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank');
    setShowShareMenu(false);
  };
  
  // Extract structured data from description
  const extractProductFeatures = (description) => {
    if (!description) return [];
    
    const features = [];
    const lines = description.split('\n');
    
    lines.forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim();
        if (key && value && !key.includes('http')) {
          features.push({ key, value });
        }
      }
    });
    
    return features;
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background text-textColor-secondary flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen bg-background text-textColor-secondary flex flex-col items-center justify-center p-4">
        <svg className="w-24 h-24 text-primary/30 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h1 className="text-2xl font-light text-primary mb-4">Product Not Found</h1>
        <p className="text-textColor-muted text-center max-w-md mb-8">Sorry, we couldn't find the product you're looking for. It may have been removed or is temporarily unavailable.</p>
        <Link href="/products" className="btn-primary px-8 py-3">
          Browse Our Collection
        </Link>
      </div>
    );
  }
  
  const { 
    name, 
    brand, 
    price, 
    discountPrice, 
    discount, 
    description, 
    images = [], 
    stock, 
    category,
    scent = []
  } = product;
  
  const features = extractProductFeatures(description);
  const actualPrice = discountPrice || price;
  
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-background text-textColor-secondary pt-8 pb-24">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4">
          <div className="text-sm text-textColor-muted mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-primary">{name}</span>
          </div>
          
          {/* Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Product Images */}
            <div className="space-y-6">
              {/* Main Image */}
              <div 
                className="relative aspect-square overflow-hidden bg-background-secondary cursor-zoom-in"
                onMouseEnter={() => setShowZoom(true)}
                onMouseLeave={() => setShowZoom(false)}
                onMouseMove={handleMouseMove}
                onClick={() => window.open(mainImage, '_blank')}
              >
                <Image 
                  src={mainImage}
                  alt={name}
                  fill
                  unoptimized={mainImage?.startsWith('http')}
                  className="object-cover transition-transform duration-500"
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {showZoom && (
                  <div 
                    className="absolute inset-0 bg-cover bg-no-repeat opacity-0 hover:opacity-100 transition-opacity duration-200"
                    style={{
                      backgroundImage: `url(${mainImage})`,
                      backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      transform: 'scale(1.5)',
                    }}
                  />
                )}
              </div>
              
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex flex-wrap gap-3">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setMainImage(image)}
                      className={`relative aspect-square w-20 overflow-hidden border-2 transition-all ${
                        mainImage === image 
                          ? 'border-primary' 
                          : 'border-transparent hover:border-primary/50'
                      }`}
                    >
                      <Image 
                        src={image}
                        alt={`${name} - Image ${index + 1}`}
                        fill
                        unoptimized={image?.startsWith('http')}
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Details */}
            <div>
              {/* Brand */}
              <div className="text-sm text-primary tracking-wider mb-2 uppercase">{brand}</div>
              
              {/* Product Name */}
              <h1 className="text-3xl md:text-4xl font-light text-textColor-secondary mb-4">{name}</h1>
              
              {/* Scent Notes */}
              {scent && scent.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {scent.map((note, index) => (
                    <span key={index} className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                      {note}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Price */}
              <div className="flex items-center mb-8">
                {discount > 0 ? (
                  <>
                    <span className="text-2xl text-primary font-medium">₹{discountPrice.toFixed(2)}</span>
                    <span className="ml-3 text-textColor-muted line-through text-lg">₹{price.toFixed(2)}</span>
                    <span className="ml-3 bg-primary text-black text-sm font-medium px-2 py-1">
                      {discount}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-2xl text-primary font-medium">₹{price.toFixed(2)}</span>
                )}
              </div>
              
              {/* Short Description */}
              <div className="mb-8 text-textColor-muted" ref={productDescRef}>
                {description.split('\n')[0]}
              </div>
              
              {/* Size Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-light mb-3">Size</h3>
                <div className="flex flex-wrap gap-3">
                  {sizes.map(size => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.id)}
                      className={`relative text-sm px-5 py-3 border ${
                        selectedSize === size.id 
                          ? 'border-primary bg-primary/10' 
                          : 'border-primary/30 hover:border-primary'
                      } transition-colors`}
                    >
                      <div>{size.label}</div>
                      <div className="mt-1 text-primary/80">
                        ₹{(actualPrice * size.multiplier).toFixed(2)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quantity */}
              <div className="mb-8">
                <div className="flex justify-between mb-3">
                  <h3 className="text-lg font-light">Quantity</h3>
                  <span className={`text-sm ${stock < 10 ? 'text-amber-400' : 'text-green-400'}`}>
                    {stock < 10 ? `Only ${stock} left in stock` : 'In Stock'}
                  </span>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="w-12 h-12 flex justify-center items-center border border-primary/30 hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                    </svg>
                  </button>
                  <div className="w-20 h-12 flex justify-center items-center border-t border-b border-primary/30">
                    {quantity}
                  </div>
                  <button
                    onClick={increaseQuantity}
                    disabled={quantity >= stock}
                    className="w-12 h-12 flex justify-center items-center border border-primary/30 hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Add to Cart Button */}
              <div className="mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart || stock <= 0}
                  className="w-full bg-primary text-black py-4 text-center hover:bg-primary-dark transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {addingToCart ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding to Cart...
                    </>
                  ) : stock <= 0 ? (
                    'Out of Stock'
                  ) : (
                    'Add to Cart'
                  )}
                </button>
              </div>
              
              {/* Buy Now Button */}
              <div className="mb-8">
                <button
                  onClick={() => {
                    handleAddToCart();
                    setTimeout(() => router.push('/checkout'), 500);
                  }}
                  disabled={addingToCart || stock <= 0}
                  className="w-full bg-black border border-primary text-primary py-4 text-center hover:bg-primary/10 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  Buy Now
                </button>
              </div>
              
              {/* Shipping Info */}
              <div className="mb-8 space-y-4 text-sm text-textColor-muted">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                  </svg>
                  <span>Free shipping on orders over ₹1499</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Authentic product guaranteed</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  <span>Easy returns within 30 days</span>
                </div>
              </div>
              
              {/* Share */}
              <div className="relative">
                <button 
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center text-textColor-muted hover:text-primary transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                  </svg>
                  Share
                </button>
                
                <Transition
                  show={showShareMenu}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                  className="absolute z-10 mt-2 w-48 bg-background-secondary border border-primary/20 shadow-lg"
                >
                  <div className="py-1">
                    <button 
                      onClick={() => handleShare('facebook')}
                      className="flex items-center w-full px-4 py-2 text-sm text-textColor-muted hover:bg-primary/10 hover:text-primary"
                    >
                      <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.77,20.62H14.44V14.04h3.32l0.5-3.86H14.44V8.05c0-1.12,0.31-1.88,1.91-1.88h2.04V2.77c-0.35-0.05-1.56-0.15-2.97-0.15c-2.94,0-4.96,1.8-4.96,5.11v2.84H7.13v3.86h3.33v6.58H5.23c-0.54,0-0.98-0.44-0.98-0.98V4.36c0-0.54,0.44-0.98,0.98-0.98h14.54c0.54,0,0.98,0.44,0.98,0.98v15.28C19.75,20.18,19.31,20.62,18.77,20.62z"></path>
                      </svg>
                      Facebook
                    </button>
                    <button 
                      onClick={() => handleShare('twitter')}
                      className="flex items-center w-full px-4 py-2 text-sm text-textColor-muted hover:bg-primary/10 hover:text-primary"
                    >
                      <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.46,6c-0.77,0.35-1.6,0.58-2.46,0.69c0.88-0.53,1.56-1.37,1.88-2.38c-0.83,0.5-1.75,0.85-2.72,1.05C18.37,4.5,17.26,4,16,4c-2.35,0-4.27,1.92-4.27,4.29c0,0.34,0.04,0.67,0.11,0.98C8.28,9.09,5.11,7.38,3,4.79c-0.37,0.63-0.58,1.37-0.58,2.15c0,1.49,0.75,2.81,1.91,3.56c-0.71,0-1.37-0.2-1.95-0.5v0.03c0,2.08,1.48,3.82,3.44,4.21c-0.36,0.1-0.74,0.15-1.13,0.15c-0.27,0-0.54-0.03-0.8-0.08c0.54,1.69,2.11,2.95,3.96,2.99c-1.45,1.16-3.28,1.84-5.27,1.84c-0.34,0-0.68-0.02-1.02-0.06C3.44,20.29,5.7,21,8.12,21C16,21,20.33,14.46,20.33,8.79c0-0.19,0-0.37-0.01-0.56C21.17,7.65,21.88,6.87,22.46,6z"></path>
                      </svg>
                      Twitter
                    </button>
                    <button 
                      onClick={() => handleShare('pinterest')}
                      className="flex items-center w-full px-4 py-2 text-sm text-textColor-muted hover:bg-primary/10 hover:text-primary"
                    >
                      <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9.04,21.54c0.96,0.29,1.93,0.46,2.96,0.46c5.52,0,10-4.48,10-10S17.52,2,12,2S2,6.48,2,12c0,4.25,2.67,7.9,6.44,9.34c-0.09-0.79-0.18-2.01,0.03-2.87l1.15-4.89c0,0-0.29-0.58-0.29-1.45c0-1.36,0.79-2.37,1.77-2.37c0.84,0,1.24,0.63,1.24,1.38c0,0.84-0.53,2.09-0.81,3.26c-0.23,0.98,0.49,1.77,1.45,1.77c1.73,0,3.06-1.83,3.06-4.47c0-2.34-1.68-3.96-4.09-3.96c-2.79,0-4.44,2.08-4.44,4.23c0,0.84,0.32,1.74,0.73,2.23c0.08,0.1,0.09,0.18,0.07,0.28c-0.08,0.31-0.25,0.98-0.28,1.12c-0.04,0.18-0.15,0.22-0.34,0.13c-1.26-0.59-2.04-2.4-2.04-3.87c0-3.15,2.29-6.04,6.6-6.04c3.46,0,6.14,2.47,6.14,5.77c0,3.45-2.17,6.22-5.18,6.22c-1.01,0-1.97-0.53-2.29-1.15c0,0-0.5,1.91-0.62,2.38c-0.22,0.87-0.83,1.96-1.24,2.62C8.28,21.66,8.65,21.6,9.04,21.54z"></path>
                      </svg>
                      Pinterest
                    </button>
                    <button 
                      onClick={() => handleShare('email')}
                      className="flex items-center w-full px-4 py-2 text-sm text-textColor-muted hover:bg-primary/10 hover:text-primary"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      Email
                    </button>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
          
          {/* Product Information Tabs */}
          <div className="mb-20">
            <div className="border-b border-primary/20">
              <div className="flex overflow-x-auto hide-scrollbar">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 whitespace-nowrap ${
                      activeTab === tab.id 
                        ? 'text-primary border-b-2 border-primary' 
                        : 'text-textColor-muted hover:text-primary transition-colors'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="py-8">
              {activeTab === 'description' && (
                <div className="max-w-4xl mx-auto">
                  <div className="prose prose-invert prose-gold max-w-none">
                    <div className="text-textColor-muted whitespace-pre-line">
                      {description}
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'details' && (
                <div className="max-w-4xl mx-auto">
                  <div className="space-y-6">
                    {features.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        {features.map((feature, index) => (
                          <div key={index} className="border-b border-primary/10 pb-3">
                            <div className="text-sm text-textColor-muted">{feature.key}</div>
                            <div className="mt-1">{feature.value}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-textColor-muted">
                        <p>Product details:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                          <li>Brand: {brand}</li>
                          <li>Category: {category}</li>
                          {scent && scent.length > 0 && (
                            <li>Scent Notes: {scent.join(', ')}</li>
                          )}
                          <li>Available Sizes: 10ml, 50ml, 100ml</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {activeTab === 'ingredients' && (
                <div className="max-w-4xl mx-auto">
                  <div className="text-textColor-muted">
                    <p>Our fragrances are crafted with premium ingredients:</p>
                    <ul className="list-disc pl-5 mt-4 space-y-2">
                      <li>Alcohol Denat</li>
                      <li>Parfum (Fragrance)</li>
                      <li>Aqua (Water)</li>
                      <li>Limonene</li>
                      <li>Linalool</li>
                      <li>Coumarin</li>
                      <li>Citral</li>
                      <li>Geraniol</li>
                      <li>Citronellol</li>
                      <li>Eugenol</li>
                    </ul>
                    <p className="mt-4 text-sm">
                      * Ingredients may vary slightly between different fragrances. For a complete list of ingredients for a specific product, please contact our customer service.
                    </p>
                  </div>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div className="max-w-4xl mx-auto">
                  <div className="flex flex-col items-center justify-center py-10">
                    <svg className="w-16 h-16 text-primary/20 mb-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <h3 className="text-xl text-primary mb-2">Be the first to review this product</h3>
                    <p className="text-textColor-muted text-center max-w-md mb-6">
                      Share your thoughts with other customers and help them make informed decisions.
                    </p>
                    <button className="btn-outline-primary px-8 py-3">
                      Write a Review
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Related Products */}
          <div>
            <h2 className="text-2xl font-light text-primary mb-8 text-center">You May Also Like</h2>
            <RelatedProducts currentProductId={id} />
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Custom Styles */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .prose-gold a {
          color: #d2a34b;
        }
        
        .prose-gold strong {
          color: #e6c98f;
        }
      `}</style>
    </>
  );
}