"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import AccountSidebar from '@/components/account/AccountSidebar';
// In your OrderDetailPage component
import DownloadInvoiceButton from '../../../../components/invioce/DownloadInvoiceButton';
import { useDispatch, useSelector } from 'react-redux';
import { get_order } from '@/redux/features/orderSlice';

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
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { myOrder } = useSelector(state => state.order);
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user-info');
      if (!storedUser) {
        router.push('/auth/signin');
        return;
      }
      dispatch(get_order(id));
      // For demo purposes, find the order in our mock data
      // const foundOrder = mockOrders.find(order => order.id === id);
   
      if (!myOrder) {
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
  
  if (!myOrder) {
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
  
  const statusBadge = getStatusBadge(myOrder.
    delivery_status
    );
  const timelineSteps = getOrderTimeline(myOrder.
    delivery_status
    );
  console.log("myOrder--", myOrder)
  return (
    <div className="min-h-screen bg-background text-textColor-secondary font-primary">
    <main className="py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 lg:w-72 shrink-0">
            <AccountSidebar activePage="orders" />
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-background-secondary p-5 sm:p-7 lg:p-9 rounded-xl shadow-sm">
              {/* Order Header */}
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <Link href="/account/orders" className="text-primary flex items-center hover:underline mb-2 transition-colors duration-200">
                      <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                      </svg>
                      <span className="text-sm font-medium">Back to Orders</span>
                    </Link>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <h1 className="text-2xl lg:text-3xl font-light text-primary">
                    Order # ...{myOrder._id?.slice(-5)}
                  </h1>
                          <span className={`px-4 py-2 rounded-full text-sm ${statusBadge.bg} ${statusBadge.text} border ${statusBadge.border}`}>
                        {statusBadge?.label}
                      </span>
                    </div>
                    <p className="text-textColor-muted mt-2">
                      Placed on {formatDate(myOrder.createdAt)}
                    </p>
                  </div>
                </div>
                
                {/* Order Timeline */}
                <div className="   bg-primary-light/10 p-6 rounded-xl shadow-xs mb-8">
                  <h3 className="text-lg font-medium text-primary mb-6">Order Status Timeline</h3>
                  
                  <div className="relative">
                    <div className="hidden sm:block absolute top-7 left-20 right-20 h-[2px] bg-gray-200"></div>
                    <div className="grid sm:grid-cols-4 gap-6">
                      {timelineSteps.map((step, index) => (
                        <div key={step.id} className="flex items-center sm:block">
                          <div className="flex sm:flex-col items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center shrink-0 ${
                              step.completed 
                                ? 'border-primary bg-primary/10 text-primary' 
                                : 'border-gray-300 bg-gray-50 text-gray-400'
                            }`}>
                              {step.completed ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                                </svg>
                              ) : (
                                <span className="font-medium">{index + 1}</span>
                              )}
                            </div>
                            <div className="sm:text-center sm:mt-3">
                              <p className={`font-medium ${step.completed ? 'text-primary' : 'text-textColor-muted'}`}>
                                {step.label}
                              </p>
                              {step.date && (
                                <p className="text-sm text-textColor-muted mt-1.5">{step.date}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Order Items */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="   bg-primary-light/10 p-6 rounded-xl shadow-xs">
                    <h3 className="text-lg font-medium text-primary mb-6">Order Items ({myOrder?.products?.length})</h3>
                    
                    <div className="space-y-6">
                      {myOrder?.products?.map((item, index) => (
                        <div key={index} className="flex items-start gap-5">
                          <div className="w-24 h-24 relative rounded-lg overflow-hidden bg-gray-100 shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 96px, 128px"
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <Link 
                              href={`/products/${item?.id}`}
                              className="text-lg font-medium hover:text-primary transition-colors truncate block"
                            >
                              {item.name}
                            </Link>
                            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-textColor-muted">
                              <span className="bg-gray-100 px-3 py-1 rounded-md">Size: {item?.size}</span>
                              <span>Quantity: {item.quantity}</span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <span className="font-medium text-lg">₹{item?.price?.toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Address Section */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="   bg-primary-light/10 p-6 rounded-xl shadow-xs">
                      <h3 className="text-lg font-medium text-primary mb-4">Shipping Address</h3>
                      <div className="text-textColor-muted space-y-1.5">
                        {formatAddress(myOrder?.shippingInfo)}
                      </div>
                    </div>
                    
                    <div className="   bg-primary-light/10 p-6 rounded-xl shadow-xs">
                      <h3 className="text-lg font-medium text-primary mb-4">Billing Address</h3>
                      <div className="text-textColor-muted space-y-1.5">
                        {formatAddress(myOrder?.shippingInfo)}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Order Summary */}
                <div className="   bg-primary-light/10 p-6 rounded-xl shadow-xs h-fit sticky top-6">
                  <h3 className="text-lg font-medium text-primary mb-6">Order Summary</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-textColor-muted">Subtotal</span>
                      <span className="font-medium">₹{myOrder?.totalPrice?.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-textColor-muted">Shipping</span>
                      <span className="font-medium">
                        {myOrder.shipping === 0 ? 'Free' : `₹${myOrder?.shipping_fee?.toFixed(2)}`}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-textColor-muted">Tax</span>
                      <span className="font-medium">₹{0}</span>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span className="text-primary">₹{myOrder?.totalPrice?.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-base font-medium mb-3">Payment Method</h4>
                    <p className="text-textColor-muted">{myOrder?.paymentMethod}</p>
                    
                    {myOrder?.trackingNumber && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="text-base font-medium mb-3">Tracking Details</h4>
                        <p className="text-textColor-muted mb-1">Tracking Number:</p>
                        <p className="font-mono text-primary break-all">{myOrder?.trackingNumber}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    {/* <button className="w-full btn-outline-primary py-3.5 text-sm font-medium rounded-lg hover:shadow-sm transition-all">
                      Download Invoice
                    </button> */}
                    <DownloadInvoiceButton order={myOrder} />
                    {myOrder?.status === 'delivered' && (
                      <button className="w-full btn-primary py-3.5 text-sm font-medium rounded-lg hover:shadow-lg transition-all">
                        Write a Review
                      </button>
                    )}
                    
                    {(order?.status === 'processing' || order?.status === 'shipped') && (
                      <button className="w-full border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-3.5 text-sm font-medium rounded-lg transition-colors">
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
  </div>
  );
} 