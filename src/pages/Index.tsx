import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Truck, Clock } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CarCard } from '@/components/CarCard';
import { Button } from '@/components/ui/button';
import { brands, cars } from '@/data/cars';
import dubaiHero from '@/assets/dubai-downtown-hero.jpg';
const Index = () => {
  const featuredCars = cars.slice(0, 8);
  return <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: `url(${dubaiHero})`
      }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.h1 initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            Luxury Car Rental
            <br />
            <span className="text-gradient-gold">in Dubai</span>
          </motion.h1>
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto">
            Experience the finest supercars and luxury vehicles in the heart of UAE
          </motion.p>
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.4
        }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-gold text-foreground hover:opacity-90 text-lg px-8">
              <Link to="/cars">View All Cars</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white bg-white text-foreground hover:bg-white/90 text-lg px-8">
              <a href="tel:+971502362889">Call Now</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">
            Our <span className="text-gradient-gold">Premium Brands</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {brands.map((brand, index) => <motion.div key={brand.id} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.4,
            delay: index * 0.1
          }} viewport={{
            once: true
          }}>
                <Link to={`/brand/${brand.id}`} className="flex flex-col items-center gap-3 group">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-background shadow-card flex items-center justify-center p-4 group-hover:shadow-gold transition-shadow">
                    <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" />
                  </div>
                  <span className="font-medium text-sm group-hover:text-gold transition-colors">
                    {brand.name}
                  </span>
                </Link>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
            icon: Truck,
            title: 'Free Delivery',
            desc: 'Complimentary delivery across Dubai'
          }, {
            icon: Shield,
            title: 'Full Insurance',
            desc: 'Comprehensive coverage included'
          }, {
            icon: Clock,
            title: 'No Deposit',
            desc: 'Book without any upfront deposit'
          }].map((feature, index) => <motion.div key={feature.title} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.4,
            delay: index * 0.1
          }} viewport={{
            once: true
          }} className="flex items-center gap-4 p-6 bg-secondary rounded-lg">
                <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-7 h-7 text-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.desc}</p>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold">Most rented cars<span className="text-gradient-gold"></span>
            </h2>
            <Link to="/cars" className="flex items-center gap-2 text-gold font-medium hover:underline">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCars.map((car, index) => <CarCard key={car.id} car={car} index={index} />)}
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Index;