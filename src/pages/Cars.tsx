import { useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CarCard } from '@/components/CarCard';
import { BrandFilter } from '@/components/BrandFilter';
import { cars, getCarsByBrand, brands } from '@/data/cars';
const Cars = () => {
  const {
    brandId
  } = useParams();
  const displayCars = brandId ? getCarsByBrand(brandId) : cars;
  const brand = brands.find(b => b.id === brandId);
  return <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">
            {brand ? brand.name : 'All Cars'}
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            {displayCars.length} vehicles available for rent
          </p>

          <BrandFilter activeBrand={brandId} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {displayCars.map((car, index) => <CarCard key={car.id} car={car} index={index} />)}
          </div>
        </div>
      </main>

      <Footer />
    </div>;
};
export default Cars;