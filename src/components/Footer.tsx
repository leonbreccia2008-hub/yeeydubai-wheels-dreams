import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import { brands } from '@/data/cars';

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-2xl font-display font-bold mb-4">
              YEEY<span className="text-gold">DUBAI</span>
            </h3>
            <p className="text-muted-foreground mb-6">
              Premium luxury car rental in Dubai, UAE. Experience the finest supercars and luxury vehicles.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center hover:bg-gold hover:text-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center hover:bg-gold hover:text-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-gold">Brands</h4>
            <ul className="space-y-2">
              {brands.map((brand) => (
                <li key={brand.id}>
                  <Link to={`/brand/${brand.id}`} className="text-muted-foreground hover:text-gold transition-colors">
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-gold">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-gold transition-colors">Home</Link></li>
              <li><Link to="/cars" className="text-muted-foreground hover:text-gold transition-colors">All Cars</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-gold">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold" />
                <a href="tel:+971502362889" className="text-muted-foreground hover:text-gold transition-colors">
                  +971 50 236 2889
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold" />
                <a href="mailto:info@yeeydubai.com" className="text-muted-foreground hover:text-gold transition-colors">
                  info@yeeydubai.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-muted-foreground">Dubai, United Arab Emirates</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-muted-foreground/20 mt-12 pt-8 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} YEEYDUBAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
