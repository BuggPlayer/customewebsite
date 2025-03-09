import { Montserrat } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata = {
  title: 'NOZE - Premium Perfumes',
  description: 'Discover a world of exquisite fragrances at NOZE Perfumes.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-primary bg-background text-textColor-primary`}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}