import { useNavigate } from 'react-router-dom';
import { brands } from '@/data/cars';

interface BrandFilterProps {
  activeBrand?: string;
}

export const BrandFilter = ({ activeBrand }: BrandFilterProps) => {
  const navigate = useNavigate();

  const handleBrandClick = (brandId?: string) => {
    if (brandId) {
      navigate(`/brand/${brandId}`);
    } else {
      navigate('/cars');
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 py-8">
      <button
        type="button"
        onClick={() => handleBrandClick()}
        className={`px-6 py-3 rounded-full border-2 font-medium transition-colors cursor-pointer select-none ${
          !activeBrand
            ? 'border-gold bg-gradient-gold text-foreground'
            : 'border-border hover:border-gold hover:text-gold'
        }`}
      >
        All Cars
      </button>
      {brands.map((brand) => (
        <button
          type="button"
          key={brand.id}
          onClick={() => handleBrandClick(brand.id)}
          className={`px-6 py-3 rounded-full border-2 font-medium transition-colors cursor-pointer select-none flex items-center gap-2 ${
            activeBrand === brand.id
              ? 'border-gold bg-gradient-gold text-foreground'
              : 'border-border hover:border-gold hover:text-gold'
          }`}
        >
          <img src={brand.logo} alt={brand.name} className="w-5 h-5 object-contain pointer-events-none" />
          {brand.name}
        </button>
      ))}
    </div>
  );
};
