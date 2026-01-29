import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ImageGallery } from '@/components/ImageGallery';
import { CarCard } from '@/components/CarCard';
import { getCarById, brands, getHorsepower, getDescription, cars } from '@/data/cars';
import { useMemo, useRef } from 'react';

const CarDetail = () => {
  const { id } = useParams();
  const car = getCarById(id || '');
  const brand = brands.find(b => b.id === car?.brand);
  const horsepower = car ? getHorsepower(car.model) : 0;
  const description = car ? getDescription(car.model) : '';

  // Get 6 random cars excluding the current one
  const randomCars = useMemo(() => {
    const otherCars = cars.filter(c => c.id !== id);
    const shuffled = [...otherCars].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 6);
  }, [id]);

  // Scroll navigation
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  if (!car) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Car not found</h1>
          <Link to="/cars" className="text-gold hover:underline">Back to all cars</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <Link to="/cars" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to all cars
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images with Swipe Gallery */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <ImageGallery images={car.images} altText={car.name} />
            </motion.div>

            {/* Details */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              {brand && (
                <div className="flex items-center gap-3 mb-4">
                  <img src={brand.logo} alt={brand.name} className="w-10 h-10 object-contain" />
                  <span className="text-muted-foreground font-medium">{brand.name}</span>
                </div>
              )}

              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">{car.name}</h1>
              
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-bold text-gradient-gold">
                  {car.pricePerDay.toLocaleString()} AED
                </span>
                <span className="text-muted-foreground">/ day</span>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Model Year', value: car.year },
                  { label: 'Horsepower', value: `${horsepower} HP` },
                  { label: 'Color', value: car.color },
                  { label: 'Delivery', value: car.specs.delivery },
                  { label: 'Insurance', value: car.specs.insurance },
                  { label: 'Daily KMs', value: `${car.specs.kilometers} km` },
                  { label: 'Deposit', value: car.specs.deposit },
                  { label: 'Min Age', value: `${car.specs.minAge} years` },
                ].map((spec) => (
                  <div key={spec.label} className="bg-secondary rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">{spec.label}</p>
                    <p className="font-semibold">{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="font-display text-xl font-semibold mb-4">Included</h3>
                <ul className="space-y-2">
                  {['Free Delivery', 'Full Insurance', 'No Deposit Required', '24/7 Support'].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-gold" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-4">
                <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#1ebe5a] text-white text-lg py-6 w-full">
                  <a 
                    href={`https://wa.me/971552184418?text=${encodeURIComponent(`Hi, I'm interested in renting the ${car.name} (${car.year}, ${car.color}). Please let me know about availability and pricing.`)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Book via WhatsApp
                  </a>
                </Button>
              </div>

              {/* Description */}
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-muted-foreground italic text-lg leading-relaxed">{description}</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Random Cars Section */}
        <section className="mt-20 -mx-4 px-0">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 px-4">
            You May Also Like
          </h2>
          <div className="relative">
            {/* Left Arrow */}
            <button 
              onClick={scrollLeft}
              className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gold/20 hover:bg-gold/40 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gold" />
            </button>
            
            {/* Right Arrow */}
            <button 
              onClick={scrollRight}
              className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gold/20 hover:bg-gold/40 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gold" />
            </button>

            <div 
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide pl-[19px] pr-4"
            >
              {randomCars.map((randomCar, index) => (
                <div key={randomCar.id} className="flex-shrink-0 w-[280px]">
                  <CarCard car={randomCar} index={index} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CarDetail;
