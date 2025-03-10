"use client"
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <Image
          src="/assets/frontend_assets/about/hero.jpg"
          alt="About NOZE"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4">Our Story</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Crafting exceptional fragrances that capture moments and create memories
          </p>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-primary mb-6">Our Mission</h2>
              <p className="text-textColor-secondary mb-6">
                At NOZE, we believe that fragrance is more than just a scent—it's an experience, a memory, 
                a statement. Our mission is to create exceptional perfumes that not only smell extraordinary 
                but also tell a story and evoke emotions.
              </p>
              <p className="text-textColor-secondary">
                We combine traditional perfumery techniques with modern innovation to craft unique fragrances 
                that stand the test of time while pushing the boundaries of olfactory art.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/assets/frontend_assets/about/mission.jpg"
                alt="Our Mission"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="bg-background-secondary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-light text-primary text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🌿",
                title: "Sustainability",
                description: "We are committed to sustainable practices in our production and packaging, ensuring our impact on the environment is minimal."
              },
              {
                icon: "✨",
                title: "Quality",
                description: "We source the finest ingredients and maintain the highest standards in our perfume creation process."
              },
              {
                icon: "🤝",
                title: "Integrity",
                description: "Transparency and honesty are at the core of everything we do, from sourcing to customer service."
              }
            ].map((value, index) => (
              <div key={index} className="bg-background p-8 rounded-lg shadow-sm border border-primary/10">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-medium mb-3">{value.title}</h3>
                <p className="text-textColor-secondary">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-light text-primary text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Master Perfumer",
                image: "/assets/frontend_assets/team/perfumer.jpg"
              },
              {
                name: "Michael Chen",
                role: "Creative Director",
                image: "/assets/frontend_assets/team/creative.jpg"
              },
              {
                name: "Emma Williams",
                role: "Head of Design",
                image: "/assets/frontend_assets/team/designer.jpg"
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative h-[300px] rounded-lg overflow-hidden mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                <p className="text-textColor-secondary">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary text-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">Experience NOZE</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Discover our collection of unique fragrances and find your perfect scent.
          </p>
          <Link 
            href="/products" 
            className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>
      
    </div>
  );
} 