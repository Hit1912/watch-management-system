import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Filter } from 'lucide-react';
import watchesData from '../data/watches.json';
import WatchCard from '../components/WatchCard';

const Brands = () => {
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(watchesData.map(w => w.brand))];
    return ['All', ...uniqueBrands.sort()];
  }, []);

  const filteredWatches = useMemo(() => {
    return watchesData.filter(watch => {
      const matchesBrand = selectedBrand === 'All' || watch.brand === selectedBrand;
      const matchesSearch = watch.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           watch.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesBrand && matchesSearch;
    });
  }, [selectedBrand, searchQuery]);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-16 space-y-4">
          <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs">Curated Collections</span>
          <h1 className="text-5xl md:text-7xl font-bold italic">Browse by Brand</h1>
          <p className="text-foreground/50 text-lg max-w-2xl leading-relaxed">
            Discover timepieces from the world's most prestigious horological houses. Filter by your favorite brand to find your next masterpiece.
          </p>
        </header>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-8 mb-16 items-center justify-between sticky top-24 z-30 py-4 bg-background/80 backdrop-blur-md">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 group-focus-within:text-primary transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search brands or models..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-6 focus:outline-none focus:border-primary/50 transition-all font-medium"
            />
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-6 py-2 text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${
                  selectedBrand === brand 
                    ? 'bg-primary border-primary text-background' 
                    : 'bg-transparent border-white/10 text-foreground/50 hover:border-primary/50 hover:text-primary'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-8 flex justify-between items-end border-b border-white/5 pb-4">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-foreground/40">
            Showing <span className="text-foreground">{filteredWatches.length}</span> Timepieces
          </p>
          {selectedBrand !== 'All' && (
            <button 
              onClick={() => setSelectedBrand('All')}
              className="text-[10px] uppercase tracking-widest font-bold text-primary hover:underline"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Watches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredWatches.map((watch) => (
              <motion.div
                key={watch.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <WatchCard watch={watch} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredWatches.length === 0 && (
          <div className="py-40 text-center space-y-6">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto text-foreground/20">
              <Filter size={32} />
            </div>
            <h2 className="text-2xl font-bold font-serif italic text-foreground/40">No timepieces match your criteria</h2>
            <button 
              onClick={() => {setSelectedBrand('All'); setSearchQuery('');}}
              className="btn-outline text-xs"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Brands;
