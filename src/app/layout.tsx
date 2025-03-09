import { Montserrat } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata = {
  title: 'NOZE - Premium Perfumes',
  description: 'Discover a world of exquisite fragrances at NOZE Perfumes.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-primary bg-background text-textColor-primary`}>
        <WishlistProvider>
          <CartProvider>
          <Navbar/>
            {children}
            <Footer />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}