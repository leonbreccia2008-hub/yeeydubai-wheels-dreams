import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { cars, getHorsepower } from '@/data/cars';

export const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof cars>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setQuery('');
        setResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    
    if (searchQuery.trim().length < 2) {
      setResults([]);
      return;
    }

    const normalizedQuery = searchQuery.toLowerCase().trim();
    const filtered = cars.filter((car) => {
      return (
        car.name.toLowerCase().includes(normalizedQuery) ||
        car.brand.toLowerCase().includes(normalizedQuery) ||
        car.model.toLowerCase().includes(normalizedQuery) ||
        car.color.toLowerCase().includes(normalizedQuery) ||
        car.year.toString().includes(normalizedQuery)
      );
    }).slice(0, 6);

    setResults(filtered);
  };

  const handleSelect = (carId: string) => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
    navigate(`/car/${carId}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery('');
      setResults([]);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:text-gold transition-colors"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search cars..."
              className="w-[200px] md:w-[280px] pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              maxLength={50}
            />
          </div>
          <button
            onClick={() => {
              setIsOpen(false);
              setQuery('');
              setResults([]);
            }}
            className="p-2 hover:text-gold transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full right-0 mt-2 w-[300px] md:w-[360px] bg-background border border-border rounded-lg shadow-xl z-50 overflow-hidden">
          <div className="max-h-[400px] overflow-y-auto">
            {results.map((car) => {
              const horsepower = getHorsepower(car.model);
              return (
                <button
                  key={car.id}
                  onClick={() => handleSelect(car.id)}
                  className="w-full flex items-center gap-3 p-3 hover:bg-secondary transition-colors text-left"
                >
                  <div className="w-16 h-12 rounded overflow-hidden flex-shrink-0 bg-muted">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{car.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {car.year} • {car.color} • {horsepower} HP
                    </p>
                    <p className="text-xs font-semibold text-gold">
                      {car.pricePerDay.toLocaleString()} AED/day
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
          <Link
            to="/cars"
            onClick={() => {
              setIsOpen(false);
              setQuery('');
              setResults([]);
            }}
            className="block w-full p-3 text-center text-sm font-medium text-gold hover:bg-secondary transition-colors border-t border-border"
          >
            View All Cars
          </Link>
        </div>
      )}

      {/* No Results */}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full right-0 mt-2 w-[300px] md:w-[360px] bg-background border border-border rounded-lg shadow-xl z-50 p-6 text-center">
          <p className="text-muted-foreground text-sm">No cars found for "{query}"</p>
          <Link
            to="/cars"
            onClick={() => {
              setIsOpen(false);
              setQuery('');
            }}
            className="inline-block mt-2 text-sm font-medium text-gold hover:underline"
          >
            Browse all cars
          </Link>
        </div>
      )}
    </div>
  );
};
