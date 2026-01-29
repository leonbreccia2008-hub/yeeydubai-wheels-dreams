import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, getHorsepower, getDescription } from '@/data/cars';

interface CarCardProps {
  car: Car;
  index?: number;
}

export const CarCard = ({ car, index = 0 }: CarCardProps) => {
  const horsepower = getHorsepower(car.model);
  const description = getDescription(car.model);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/car/${car.id}`} className="group block h-full">
        <div className="bg-card rounded-lg overflow-hidden shadow-card hover-lift border border-border h-full flex flex-col">
          <div className="aspect-[4/3] overflow-hidden bg-muted">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="font-display text-lg font-semibold mb-1 group-hover:text-gold transition-colors">
              {car.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {car.year} • {car.color} • {horsepower} HP
            </p>
            <p className="text-xs text-muted-foreground/80 mb-3 line-clamp-2 italic flex-grow">
              {description}
            </p>
            <div className="flex items-baseline justify-between mt-auto">
              <div>
                <span className="text-2xl font-bold text-gradient-gold">
                  {car.pricePerDay.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground ml-1">AED / day</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
