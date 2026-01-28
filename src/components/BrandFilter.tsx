import { Link } from 'react-router-dom';
import { brands } from '@/data/cars';

interface BrandFilterProps {
  activeBrand?: string;
}

export const BrandFilter = ({ activeBrand }: BrandFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 py-8">
      <Link
        to="/cars"
        className={`px-6 py-3 rounded-full border-2 font-medium transition-all ${
          !activeBrand
            ? 'border-gold bg-gradient-gold text-foreground'
            : 'border-border hover:border-gold hover:text-gold'
        }`}
      >
        All Cars
      </Link>
      {brands.map((brand) => (
        <Link
          key={brand.id}
          to={`/brand/${brand.id}`}
          className={`px-6 py-3 rounded-full border-2 font-medium transition-all flex items-center gap-2 ${
            activeBrand === brand.id
              ? 'border-gold bg-gradient-gold text-foreground'
              : 'border-border hover:border-gold hover:text-gold'
          }`}
        >
          <img src={brand.logo} alt={brand.name} className="w-5 h-5 object-contain" />
          {brand.name}
        </Link>
      ))}
    </div>
  );
};
