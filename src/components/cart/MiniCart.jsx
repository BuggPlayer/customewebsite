"use client"
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

const MiniCart = () => {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();
  
  if (!cartOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      {/* Background overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" 
        aria-hidden="true"
        onClick={() => setCartOpen(false)}
      ></div>
      
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-background shadow-xl overflow-y-scroll">
            <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-light text-primary" id="slide-over-title">
                  Shopping Cart
                </h2>
                <div className="ml-3 h-7 flex items-center">
                  <button
                    type="button"
                    className="text-textColor-secondary hover:text-primary transition"
                    onClick={() => setCartOpen(false)}
                  >
                    <span className="sr-only">Close panel</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mt-8">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <p className="mt-4 text-textColor-muted">Your cart is empty</p>
                    <button 
                      className="mt-6 btn-outline text-sm px-6 py-2"
                      onClick={() => setCartOpen(false)}
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-primary/10">
                      {cart.map((item) => (
                        <li key={`${item.id}-${item.size?.id || 'default'}`} className="py-6 flex">
                          <div className="relative flex-shrink-0 w-24 h-24 overflow-hidden border border-primary/20">
                            <Image 
                              src={item.images[0]}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="ml-4 flex-1 flex flex-col">
                            <div>
                              <div className="flex justify-between text-base font-light text-textColor-secondary">
                                <h3>
                                  <Link href={`/products/${item.id}`} onClick={() => setCartOpen(false)} className="hover:text-primary">
                                    {item.name}
                                  </Link>
                                </h3>
                                <p className="ml-4 text-primary">
                                  ${((item.size ? item.size.price : item.price) * item.quantity).toFixed(2)}
                                </p>
                              </div>
                              {item.size && (
                                <p className="mt-1 text-sm text-textColor-muted">
                                  Size: {item.size.name}
                                </p>
                              )}
                            </div>
                            <div className="flex-1 flex items-end justify-between text-sm">
                              <div className="flex items-center space-x-2">
                                <p className="text-textColor-muted mr-2">Qty</p>
                                <button 
                                  onClick={() => item.quantity > 1 && updateQuantity(item.id, item.quantity - 1, item.size)}
                                  className="px-2 py-1 text-primary hover:bg-primary/10"
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </button>
                                <span className="text-textColor-secondary w-6 text-center">
                                  {item.quantity}
                                </span>
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                                  className="px-2 py-1 text-primary hover:bg-primary/10"
                                >
                                  +
                                </button>
                              </div>

                              <button
                                type="button"
                                className="text-primary hover:text-primary-dark"
                                onClick={() => removeFromCart(item.id, item.size)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {cart.length > 0 && (
              <div className="border-t border-primary/20 py-6 px-4 sm:px-6">
                <div className="flex justify-between text-base font-light text-textColor-secondary">
                  <p>Subtotal</p>
                  <p className="text-primary">${cartTotal.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-textColor-muted">Shipping and taxes calculated at checkout.</p>
                <div className="mt-6">
                  <Link href="/checkout" className="btn-primary w-full flex justify-center" onClick={() => setCartOpen(false)}>
                    Checkout
                  </Link>
                </div>
                <div className="mt-6 flex justify-center text-sm text-center text-textColor-muted">
                  <p>
                    or{' '}
                    <button
                      type="button"
                      className="text-primary hover:text-primary-dark font-light"
                      onClick={() => setCartOpen(false)}
                    >
                      Continue Shopping<span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniCart; 