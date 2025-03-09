"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AccountSidebar = ({ activePage }) => {
  const router = useRouter();
  
  const menuItems = [
    {
      id: 'profile',
      label: 'My Profile',
      href: '/account/profile',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
      )
    },
    {
      id: 'orders',
      label: 'My Orders',
      href: '/account/orders',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
        </svg>
      )
    },
    {
      id: 'addresses',
      label: 'My Addresses',
      href: '/account/addresses',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      )
    },
    {
      id: 'wishlist',
      label: 'My Wishlist',
      href: '/account/wishlist',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      )
    }
  ];
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/auth/signin');
  };
  
  return (
    <div className="bg-background-secondary rounded-lg overflow-hidden">
      <div className="p-4 bg-primary/10">
        <h2 className="text-lg font-medium text-primary">My Account</h2>
      </div>
      
      <div className="py-2">
        {menuItems.map(item => (
          <Link
            key={item.id}
            href={item.href}
            className={`flex items-center px-4 py-3 transition-colors ${
              activePage === item.id
                ? 'bg-primary/5 text-primary border-l-2 border-primary'
                : 'text-textColor-muted hover:bg-primary/5 hover:text-primary'
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </Link>
        ))}
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 text-textColor-muted hover:bg-primary/5 hover:text-primary transition-colors"
        >
          <span className="mr-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
          </span>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AccountSidebar; 