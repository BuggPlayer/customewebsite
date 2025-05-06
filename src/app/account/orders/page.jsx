"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AccountSidebar from '@/components/account/AccountSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { get_orders } from '@/redux/features/orderSlice';

export default function OrdersPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { myOrders } = useSelector(state => state.order);
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
    const storedUser = JSON.parse(localStorage.getItem("user-info"));
    const checkAuth = () => {
      if (!storedUser) {
        router.push('/auth/signin');
        return;
      }
      
      dispatch(get_orders({ 
        status: activeFilter, 
        customerId: storedUser?._id || '' 
      }));
      setLoading(false);
    };
    
    checkAuth();
  }, [router, activeFilter, dispatch]);

  // Format date function with fallback
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    } catch {
      return 'N/A';
    }
  };
  
  // Get status badge styles with fallback
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
      },
      pending: {
        bg: 'bg-purple-500/10',
        text: 'text-purple-500',
        border: 'border-purple-500/30',
        label: 'Pending'
      },
      unpaid: {
        bg: 'bg-orange-500/10',
        text: 'text-orange-500',
        border: 'border-orange-500/30',
        label: 'Unpaid'
      }
    };
    
    return statusMap[status?.toLowerCase()] || statusMap.processing;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-textColor-secondary font-primary">
        <main className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
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
                <div className="mb-8">
                  <h1 className="text-2xl lg:text-3xl font-light text-primary">My Orders</h1>
                  <p className="text-textColor-muted mt-2">View and track your orders</p>
                </div>
                
                {/* Filter Tabs */}
                <div className="mb-8 border-b border-primary/10">
                  <div className="flex overflow-x-auto hide-scrollbar">
                    {filters.map(filter => (
                      <button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        className={`px-4 py-3 sm:px-6 sm:py-3 relative whitespace-nowrap transition-colors duration-200 ${
                          activeFilter === filter.id 
                            ? 'text-primary' 
                            : 'text-textColor-muted hover:text-primary/80'
                        }`}
                      >
                        {filter.label}
                        {activeFilter === filter.id && (
                          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-all duration-300"></span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Orders List */}
                {!myOrders || myOrders.length === 0 ? (
                  <div className="text-center py-12 lg:py-16">
                    <svg className="w-20 h-20 mx-auto text-primary/20 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                    </svg>
                    <h3 className="text-xl text-textColor-muted">No orders found</h3>
                    <p className="mt-2 text-textColor-muted/70 max-w-md mx-auto">
                      {activeFilter === 'all' 
                        ? "You haven't placed any orders yet." 
                        : `You don't have any ${activeFilter} orders.`}
                    </p>
                    <Link href="/" className="btn-primary inline-block mt-6 px-8 py-3.5 text-sm font-medium rounded-lg">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-5 sm:space-y-6">
                    {myOrders.map(order => {
                      const statusBadge = getStatusBadge(order?.delivery_status || order?.order_status);
                      const orderId = order?._id ? `...${order._id.slice(-5)}` : 'N/A';
                      const orderDate = formatDate(order?.createdAt);
                      const totalPrice = order?.totalPrice?.toFixed(2) || '0.00';
                      
                      return (
                        <div key={order._id || Math.random()} className="border bg-primary-light/10 border-primary/10 rounded-xl overflow-hidden shadow-xs hover:shadow-sm transition-shadow duration-200">
                          {/* Order Header */}
                          <div className="bg-background-primary p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-5">
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                                <h3 className="text-lg sm:text-xl font-light text-primary">
                                  Order #{orderId}
                                </h3>
                                <span className={`px-3 py-1.5 rounded-full text-sm ${statusBadge.bg} ${statusBadge.text} border ${statusBadge.border}`}>
                                  {statusBadge.label}
                                </span>
                              </div>
                              <p className="text-sm text-textColor-muted mt-1.5">
                                Placed on {orderDate}
                              </p>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                              <span className="text-base sm:text-lg text-textColor-muted">
                                Total: <span className="text-primary font-medium">₹{totalPrice}</span>
                              </span>
                              <Link
                                href={`/account/orders/${order._id}`}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
                          
                          {/* Order Items */}
                          <div className="p-4 sm:p-5">
                            <div className="space-y-4 sm:space-y-5">
                              {order.products?.map((item, index) => (
                                <div key={index} className="flex items-start gap-4 sm:gap-5">
                                  <div className="w-20 h-20 sm:w-24 sm:h-24 relative rounded-lg overflow-hidden bg-background-primary shrink-0">
                                    {item?.image && (
                                      <Image
                                        src={item.image}
                                        alt={item?.name || 'Product image'}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 640px) 80px, 96px"
                                        onError={(e) => {
                                          e.target.src = '/placeholder-product.jpg';
                                        }}
                                      />
                                    )}
                                  </div>
                                  
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-base sm:text-lg truncate">
                                      {item?.name || 'Unnamed Product'}
                                    </h4>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 text-sm sm:text-base text-textColor-muted mt-2">
                                      {item?.size && (
                                        <>
                                          <span className="flex items-center gap-1.5">
                                            <span className="hidden sm:inline">Size:</span>
                                            <span className="bg-background-primary px-2.5 py-1 rounded-md text-sm">
                                              {item.size}
                                            </span>
                                          </span>
                                          <span className="hidden sm:inline">•</span>
                                        </>
                                      )}
                                      <span>Qty: {item?.quantity || 1}</span>
                                      <span className="hidden sm:inline">•</span>
                                      <span className="font-medium text-primary">
                                        ₹{(item?.price || 0).toFixed(2)}
                                      </span>
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