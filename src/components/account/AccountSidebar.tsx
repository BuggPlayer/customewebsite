'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { href: '/account', label: 'Dashboard', icon: 'dashboard' },
  { href: '/account/orders', label: 'Orders', icon: 'shopping-bag' },
  { href: '/account/wishlist', label: 'Wishlist', icon: 'heart' },
  { href: '/account/profile', label: 'Profile', icon: 'user' },
  { href: '/account/addresses', label: 'Addresses', icon: 'map-pin' },
];

export default function AccountSidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {menuItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-3 text-sm font-light transition-colors ${
              isActive
                ? 'bg-primary text-black'
                : 'hover:bg-primary/10 text-textColor-secondary'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
} 