import { Montserrat } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Providers } from '@/redux/provider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from '@vercel/analytics/next';


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
      <GoogleOAuthProvider  clientId="347410691860-i1gudm0eg5hcq1visjsianmabh5d4otc.apps.googleusercontent.com">
        <Providers>
          <WishlistProvider>
            <CartProvider>
              <Navbar />
              {children}
              <Analytics />

              <Footer />
            </CartProvider>
          </WishlistProvider>
          <ToastContainer />

        </Providers>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}