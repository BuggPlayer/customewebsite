"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AccountSidebar from '@/components/account/AccountSidebar';

// Mock orders data (in a real app, this would come from API)
const mockOrders = [
  {
    id: 'ORD123456',
    date: '2023-06-15',
    total: 2499,
    status: 'delivered',
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
    status: 'delivered',
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
    status: 'processing',
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

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Filter options
  const filters = [
    { id: 'all', label: 'All Orders' },
    { id: 'processing', label: 'Processing' },
    { id: 'shipped', label: 'Shipped' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'cancelled', label: 'Cancelled' }
  ];
  
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        router.push('/auth/signin');
        return;
      }
      
      // For demo purposes, we'll use mock data
      // In a real app, you would fetch orders from an API
      setOrders(mockOrders);
      setLoading(false);
    };
    
    checkAuth();
  }, [router]);
  
  // Filter orders based on status
  const filteredOrders = activeFilter === 'all'
    ? orders
    : orders.filter(order => order.status === activeFilter);
  
  // Format date function
  const formatDate = (dateString) => {
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
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background text-textColor-secondary font-primary">
        <Navbar />
        <main className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background text-textColor-secondary font-primary">
      <Navbar />
      
      <main className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64 shrink-0">
              <AccountSidebar activePage="orders" />
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-background-secondary p-6 md:p-8 rounded-lg">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                  <div>
                    <h1 className="text-2xl font-light text-primary">My Orders</h1>
                    <p className="text-textColor-muted mt-1">View and track your orders</p>
                  </div>
                </div>
                
                {/* Filter Tabs */}
                <div className="mb-8 border-b border-primary/10">
                  <div className="flex overflow-x-auto hide-scrollbar">
                    {filters.map(filter => (
                      <button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        className={`px-6 py-3 relative whitespace-nowrap ${
                          activeFilter === filter.id 
                            ? 'text-primary' 
                            : 'text-textColor-muted hover:text-primary'
                        }`}
                      >
                        {filter.label}
                        {activeFilter === filter.id && (
                          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Orders List */}
                {filteredOrders.length === 0 ? (
                  <div className="text-center py-16">
                    <svg className="w-16 h-16 mx-auto text-primary/20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                    </svg>
                    <h3 className="mt-4 text-xl text-textColor-muted">No orders found</h3>
                    <p className="mt-2 text-textColor-muted/70">
                      {activeFilter === 'all' 
                        ? "You haven't placed any orders yet." 
                        : `You don't have any ${activeFilter} orders.`}
                    </p>
                    <Link href="/products" className="btn-primary inline-block mt-6 px-8 py-3">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredOrders.map(order => {
                      const statusBadge = getStatusBadge(order.status);
                      
                      return (
                        <div key={order.id} className="border border-primary/10 rounded-lg overflow-hidden">
                          {/* Order Header */}
                          <div className="bg-background-primary p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-lg font-light text-primary">Order #{order.id}</h3>
                                <span className={`px-3 py-1 rounded-full text-xs ${statusBadge.bg} ${statusBadge.text} border ${statusBadge.border}`}>
                                  {statusBadge.label}
                                </span>
                              </div>
                              <p className="text-sm text-textColor-muted mt-1">
                                Placed on {formatDate(order.date)}
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <span className="text-textColor-muted">
                                Total: <span className="text-primary">₹{order.total.toFixed(2)}</span>
                              </span>
                              <Link 
                                href={`/account/orders/${order.id}`}
                                className="btn-outline-primary px-4 py-2 text-sm"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
                          
                          {/* Order Items */}
                          <div className="p-4 sm:p-6">
                            <div className="space-y-4">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-4">
                                  <div className="w-16 h-16 relative rounded-md overflow-hidden bg-background-primary shrink-0">
                                    <Image
                                      src={item.image || '/assets/frontend_assets/products/placeholder.jpg'}
                                      alt={item.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-base truncate">{item.name}</h4>
                                    <div className="flex gap-4 text-sm text-textColor-muted mt-1">
                                      <span>Size: {item.size}</span>
                                      <span>Qty: {item.quantity}</span>
                                      <span>₹{item.price.toFixed(2)}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
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
      `}</style>
    </div>
  );
} 