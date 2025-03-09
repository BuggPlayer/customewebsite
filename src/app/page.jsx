import HeroSlider from '@/components/home/HeroSlider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import BrandStory from '@/components/home/BrandStory';
import Testimonials from '@/components/home/Testimonials';
import NewsletterSignup from '@/components/home/NewsletterSignup';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-textColor-secondary">
      <Navbar />
      
      <main>
        {/* Hero Slider */}
        <HeroSlider />
        
        {/* Featured Products */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-light text-center text-primary mb-12">
              Our Signature Collection
            </h2>
            <FeaturedProducts />
          </div>
        </section>
        
        {/* Brand Story Section */}
        <BrandStory />
        
        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-background-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-light text-center text-primary mb-12">
              What Our Customers Say
            </h2>
            <Testimonials />
          </div>
        </section>
        
        {/* Newsletter Signup */}
        <NewsletterSignup />
      </main>
      
      <Footer />
    </div>
  );
} 