import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { brands } from '@/data/cars';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-display font-bold tracking-tight">
              BRECCIA RENTALS <span className="text-gradient-gold">DUBAI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium hover:text-gold transition-colors">
              Home
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium hover:text-gold transition-colors">
                Brands
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border border-border">
                {brands.map((brand) => (
                  <DropdownMenuItem key={brand.id} asChild>
                    <Link to={`/brand/${brand.id}`} className="cursor-pointer">
                      {brand.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/cars" className="text-sm font-medium hover:text-gold transition-colors">
              All Cars
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-gold transition-colors">
              Contact
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+971502362889" className="flex items-center gap-2 text-gold font-medium">
              <Phone className="w-4 h-4" />
              +971 50 236 2889
            </a>
            <Button variant="default" className="bg-gradient-gold text-foreground hover:opacity-90">
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link to="/" className="text-sm font-medium py-2" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link to="/cars" className="text-sm font-medium py-2" onClick={() => setIsOpen(false)}>
                All Cars
              </Link>
              {brands.map((brand) => (
                <Link
                  key={brand.id}
                  to={`/brand/${brand.id}`}
                  className="text-sm font-medium py-2 pl-4 text-muted-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  {brand.name}
                </Link>
              ))}
              <a href="tel:+971502362889" className="flex items-center gap-2 text-gold font-medium py-2">
                <Phone className="w-4 h-4" />
                +971 50 236 2889
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
