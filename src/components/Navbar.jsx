import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Watch, Trash2, LogOut, Package, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  
  const { cartItems, cartCount, totalAmount, removeFromCart } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/collection' },
    { name: 'Brands', path: '/brands' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? 'py-4 glass-morphism' : 'py-8 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Watch className="text-primary w-8 h-8 transition-transform duration-500 group-hover:rotate-180" />
          <span className="font-serif text-2xl font-bold tracking-tighter gold-text">
            BRITIME
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`nav-link ${
                location.pathname === link.path ? 'text-primary' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Cart Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsCartOpen(true)}
            onMouseLeave={() => setIsCartOpen(false)}
          >
            <Link to="/cart" className="p-2 text-foreground/80 hover:text-primary transition-colors flex items-center">
              <div className="relative">
                <ShoppingCart size={22} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-background text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>

            <AnimatePresence>
              {isCartOpen && cartCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full pt-4 w-80 z-50"
                >
                  <div className="glass-morphism p-6 space-y-4">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-primary">Your Vault</h4>
                    <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-4 items-center">
                          <img src={item.image} alt={item.name} className="w-12 h-12 bg-white/5 p-1 object-contain" />
                          <div className="flex-grow min-w-0">
                            <p className="text-xs font-bold truncate">{item.name}</p>
                            <p className="text-[10px] text-primary">₹{item.price.toLocaleString('en-IN')}</p>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-foreground/20 hover:text-red-500 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-white/10">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Subtotal</span>
                        <span className="text-sm font-bold">₹{totalAmount.toLocaleString('en-IN')}</span>
                      </div>
                      <Link to="/cart" className="btn-primary w-full text-[10px] py-2 text-center block">View All & Checkout</Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* User Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsUserOpen(true)}
            onMouseLeave={() => setIsUserOpen(false)}
          >
            {user ? (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-2 p-2 text-foreground/80 hover:text-primary transition-colors"
                >
                  <User size={22} strokeWidth={1.5} />
                  <span className="text-xs font-bold uppercase tracking-widest hidden lg:block max-w-[80px] truncate">{user.name}</span>
                </button>

                <AnimatePresence>
                  {isUserOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full pt-4 w-48 z-50"
                    >
                      <div className="glass-morphism p-2 space-y-1">
                        <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-foreground/60 hover:bg-white/5 hover:text-primary transition-all">
                          <Package size={14} /> Order History
                        </Link>
                        <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-foreground/60 hover:bg-white/5 hover:text-primary transition-all">
                          <Settings size={14} /> Settings
                        </Link>
                        <button 
                          onClick={() => { logout(); navigate('/'); }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-all border-t border-white/5"
                        >
                          <LogOut size={14} /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="p-2 text-foreground/80 hover:text-primary transition-colors">
                <User size={22} strokeWidth={1.5} />
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <Link to="/cart" className="relative p-2">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-background text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground p-2"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-morphism overflow-hidden"
          >
            <div className="px-6 py-10 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-xl font-serif tracking-widest text-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-white/10 my-2" />
              {user ? (
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="text-xl font-serif tracking-widest text-primary"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-xl font-serif tracking-widest text-primary"
                >
                  Login / Signup
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
