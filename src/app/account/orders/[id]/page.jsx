"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import AccountSidebar from '@/components/account/AccountSidebar';

// Mock orders data (in a real app, this would come from API)
const mockOrders = [
  {
    id: 'ORD123456',
    date: '2023-06-15',
    total: 2499,
    subtotal: 2450,
    shipping: 49,
    tax: 379.58,
    status: 'delivered',
    paymentMethod: 'Credit Card (ending in 4242)',
    trackingNumber: 'TRK123456789',
    deliveredOn: '2023-06-19',
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400001',
      country: 'India',
      phone: '+91 98765 43210'
    },
    billingAddress: {
      name: 'John Doe',
      address: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400001',
      country: 'India'
    },
    items: [
      {
        id: 1,
        name: 'Eros Eau de Parfum',
        image: '/assets/frontend_assets/products/product-1.jpg',
        price: 1499,
        quantity: 1,
        size: '50ml'
      },
      {
        id: 2,
        name: 'Neroli Sunset',
        image: '/assets/frontend_assets/products/product-2.jpg',
        price: 999,
        quantity: 1,
        size: '50ml'
      }
    ]
  },
  {
    id: 'ORD789012',
    date: '2023-05-22',
    total: 1899,
    subtotal: 1899,
    shipping: 0,
    tax: 289.84,
    status: 'delivered',
    paymentMethod: 'Credit Card (ending in 4242)',
    trackingNumber: 'TRK987654321',
    deliveredOn: '2023-05-27',
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400001',
      country: 'India',
      phone: '+91 98765 43210'
    },
    billingAddress: {
      name: 'John Doe',
      address: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400001',
      country: 'India'
    },
    items: [
      {
        id: 3,
        name: 'Amber Oud Perfume',
        image: '/assets/frontend_assets/products/product-3.jpg',
        price: 1899,
        quantity: 1,
        size: '100ml'
      }
    ]
  },
  {
    id: 'ORD345678',
    date: '2023-07-01',
    total: 699,
    subtotal: 650,
    shipping: 49,
    tax: 106.59,
    status: 'processing',
    paymentMethod: 'Debit Card (ending in 1234)',
    trackingNumber: null,
    deliveredOn: null,
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400001',
      country: 'India',
      phone: '+91 98765 43210'
    },
    billingAddress: {
      name: 'John Doe',
      address: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400001',
      country: 'India'
    },
    items: [
      {
        id: 4,
        name: 'Sandalwood Dreams',
        image: '/assets/frontend_assets/products/product-4.jpg',
        price: 699,
        quantity: 1,
        size: '10ml'
      }
    ]
  }
];

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        router.push('/auth/signin');
        return;
      }
      
      // For demo purposes, find the order in our mock data
      const foundOrder = mockOrders.find(order => order.id === id);
      
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        // Order not found, redirect to orders list
        router.push('/account/orders');
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, [id, router]);
  
  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Get status badge styles
  const getStatusBadge = (status) => {
    const statusMap = {
      processing: {
        bg: 'bg-blue-500/10',
        text: 'text-blue-500',
        border: 'border-blue-500/30',
        label: 'Processing'
      },
      shipped: {
        bg: 'bg-yellow-500/10',
        text: 'text-yellow-500',
        border: 'border-yellow-500/30',
        label: 'Shipped'
      },
      delivered: {
        bg: 'bg-green-500/10',
        text: 'text-green-500',
        border: 'border-green-500/30',
        label: 'Delivered'
      },
      cancelled: {
        bg: 'bg-red-500/10',
        text: 'text-red-500',
        border: 'border-red-500/30',
        label: 'Cancelled'
      }
    };
    
    return statusMap[status] || statusMap.processing;
  };
  
  // Order timeline steps
  const getOrderTimeline = (status) => {
    const steps = [
      { id: 'ordered', label: 'Order Placed', completed: true, date: order?.date },
      { id: 'processing', label: 'Processing', completed: ['processing', 'shipped', 'delivered'].includes(status), date: status === 'processing' ? 'In progress' : (status === 'shipped' || status === 'delivered' ? formatDate(order?.date) : null) },
      { id: 'shipped', label: 'Shipped', completed: ['shipped', 'delivered'].includes(status), date: status === 'shipped' ? 'In transit' : (status === 'delivered' ? formatDate(order?.date) : null) },
      { id: 'delivered', label: 'Delivered', completed: status === 'delivered', date: status === 'delivered' ? formatDate(order?.deliveredOn) : null }
    ];
    
    return steps;
  };
  
  // Render address
  const formatAddress = (address) => {
    if (!address) return 'N/A';
    
    return (
      <>
        <p>{address.name}</p>
        <p>{address.address}</p>
        <p>{address.city}, {address.state} {address.postalCode}</p>
        <p>{address.country}</p>
        {address.phone && <p>{address.phone}</p>}
      </>
    );
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background text-textColor-secondary font-primary">
        <main className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="min-h-screen bg-background text-textColor-secondary font-primary">
        <main className="py-12 md:py-16">
          <div className="container mx-auto px-4 text-center py-20">
            <h2 className="text-2xl font-light text-primary mb-4">Order Not Found</h2>
            <p className="text-textColor-muted mb-8">The order you're looking for could not be found.</p>
            <Link href="/account/orders" className="btn-primary px-8 py-3">
              Back to Orders
            </Link>
          </div>
        </main>
      </div>
    );
  }
  
  const statusBadge = getStatusBadge(order.status);
  const timelineSteps = getOrderTimeline(order.status);
  
  return (
    <div className="min-h-screen bg-background text-textColor-secondary font-primary">
      
      <main className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64 flex-shrink-0">
              <AccountSidebar activePage="orders" />
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-background-secondary p-6 md:p-8 rounded-lg">
                {/* Order Header */}
                <div className="mb-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                      <Link href="/account/orders" className="text-primary flex items-center hover:underline mb-2">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        Back to Orders
                      </Link>
                      <h1 className="text-2xl font-light text-primary">Order #{order.id}</h1>
                      <p className="text-textColor-muted mt-1">
                        Placed on {formatDate(order.date)}
                      </p>
                    </div>
                    
                    <span className={`px-4 py-2 rounded-full text-sm ${statusBadge.bg} ${statusBadge.text} border ${statusBadge.border}`}>
                      {statusBadge.label}
                    </span>
                  </div>
                  
                  {/* Order Timeline */}
                  <div className="bg-background p-6 rounded-lg mb-8">
                    <h3 className="text-lg font-light text-primary mb-6">Order Status</h3>
                    
                    <div className="flex flex-col sm:flex-row items-start justify-between">
                      {timelineSteps.map((step, index) => (
                        <div key={step.id} className="flex flex-1 items-center mb-4 sm:mb-0">
                          <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2 ${step.completed ? 'border-primary bg-primary/10 text-primary' : 'border-gray-300 bg-gray-50 text-gray-300'}`}>
                              {step.completed ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                              ) : (
                                index + 1
                              )}
                            </div>
                            <div className="text-center">
                              <p className={`font-medium ${step.completed ? 'text-primary' : 'text-textColor-muted'}`}>{step.label}</p>
                              {step.date && <p className="text-xs text-textColor-muted mt-1">{step.date}</p>}
                            </div>
                          </div>
                          
                          {index < timelineSteps.length - 1 && (
                            <div className={`hidden sm:block h-[1px] flex-1 mx-2 ${step.completed ? 'bg-primary' : 'bg-gray-300'}`}></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Order Items */}
                  <div className="lg:col-span-2">
                    <div className="bg-background p-6 rounded-lg mb-8">
                      <h3 className="text-lg font-light text-primary mb-6">Items ({order.items.length})</h3>
                      
                      <div className="space-y-6">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-start gap-4">
                            <div className="w-20 h-20 relative rounded-md overflow-hidden bg-background-primary shrink-0">
                              <Image
                                src={item.image || '/assets/frontend_assets/products/placeholder.jpg'}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <Link href={`/products/${item.id}`} className="text-base hover:text-primary truncate block">
                                {item.name}
                              </Link>
                              <div className="flex gap-4 text-sm text-textColor-muted mt-1">
                                <span>Size: {item.size}</span>
                                <span>Qty: {item.quantity}</span>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <span className="font-medium">₹{item.price.toFixed(2)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Shipping and Billing */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="bg-background p-6 rounded-lg">
                        <h3 className="text-lg font-light text-primary mb-4">Shipping Address</h3>
                        <div className="text-textColor-muted">
                          {formatAddress(order.shippingAddress)}
                        </div>
                      </div>
                      
                      <div className="bg-background p-6 rounded-lg">
                        <h3 className="text-lg font-light text-primary mb-4">Billing Address</h3>
                        <div className="text-textColor-muted">
                          {formatAddress(order.billingAddress)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Order Summary */}
                  <div className="bg-background p-6 rounded-lg h-fit">
                    <h3 className="text-lg font-light text-primary mb-6">Order Summary</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-textColor-muted">Subtotal</span>
                        <span>₹{order.subtotal.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-textColor-muted">Shipping</span>
                        <span>{order.shipping === 0 ? 'Free' : `₹${order.shipping.toFixed(2)}`}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-textColor-muted">Tax</span>
                        <span>₹{order.tax.toFixed(2)}</span>
                      </div>
                      
                      <div className="border-t border-primary/10 pt-4 flex justify-between font-medium">
                        <span>Total</span>
                        <span className="text-primary">₹{order.total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-primary/10">
                      <h4 className="text-base font-medium mb-3">Payment Information</h4>
                      <p className="text-textColor-muted mb-2">{order.paymentMethod}</p>
                      
                      {order.trackingNumber && (
                        <div className="mt-4 pt-4 border-t border-primary/10">
                          <h4 className="text-base font-medium mb-3">Tracking Information</h4>
                          <p className="text-textColor-muted mb-1">Tracking Number:</p>
                          <p className="text-primary font-mono">{order.trackingNumber}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-8">
                      <button className="w-full btn-outline-primary py-3">
                        Download Invoice
                      </button>
                      
                      {order.status === 'delivered' && (
                        <button className="w-full btn-primary py-3 mt-3">
                          Write a Review
                        </button>
                      )}
                      
                      {(order.status === 'processing' || order.status === 'shipped') && (
                        <button className="w-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-3 mt-3 transition-colors">
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
            
      {/* Custom Styles */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
} 