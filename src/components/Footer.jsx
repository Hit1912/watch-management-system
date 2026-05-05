import React from 'react';
import { Link } from 'react-router-dom';
import { Watch, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#050505] pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <Watch className="text-primary w-8 h-8" />
              <span className="font-serif text-2xl font-bold gold-text">SHIVAM WATCH</span>
            </Link>
            <p className="text-foreground/60 leading-relaxed max-w-xs">
              Crafting celestial timepieces for those who look beyond the horizon. Our watches blend cosmic inspiration with earthly precision.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full glass-card hover:text-primary transition-all font-bold text-xs">
                IG
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full glass-card hover:text-primary transition-all font-bold text-xs">
                FB
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full glass-card hover:text-primary transition-all font-bold text-xs">
                X
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-serif text-lg font-bold uppercase tracking-widest text-primary">Explore</h4>
            <ul className="space-y-4">
              <li><Link to="/collection" className="text-foreground/60 hover:text-primary transition-colors">Astral Collection</Link></li>
              <li><Link to="/collection" className="text-foreground/60 hover:text-primary transition-colors">New Arrivals</Link></li>
              <li><Link to="/collection" className="text-foreground/60 hover:text-primary transition-colors">Limited Edition</Link></li>
              <li><Link to="/collection" className="text-foreground/60 hover:text-primary transition-colors">Accessories</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h4 className="font-serif text-lg font-bold uppercase tracking-widest text-primary">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-foreground/60 hover:text-primary transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="text-foreground/60 hover:text-primary transition-colors">Contact Us</Link></li>
              <li><a href="#" className="text-foreground/60 hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-foreground/60 hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="font-serif text-lg font-bold uppercase tracking-widest text-primary">Visit Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-foreground/60">
                <MapPin size={18} className="text-primary shrink-0 mt-1" />
                <span>123 Cosmic Way, Star City,<br />Mumbai, MH 400001</span>
              </li>
              <li className="flex items-center gap-3 text-foreground/60">
                <Phone size={18} className="text-primary shrink-0" />
                <span>+91 1800-ASTRAL</span>
              </li>
              <li className="flex items-center gap-3 text-foreground/60">
                <Mail size={18} className="text-primary shrink-0" />
                <span>support@shivamwatch.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 text-center text-foreground/40 text-sm">
          <p>&copy; {new Date().getFullYear()} SHIVAM WATCH. All rights reserved. Designed for the Stars.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
