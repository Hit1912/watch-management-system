import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import WatchCard from '../components/WatchCard';
import watchesData from '../data/watches.json';

const Collection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  const [filteredWatches, setFilteredWatches] = useState(watchesData);

  const categories = ['All', ...new Set(watchesData.map(w => w.category))];

  useEffect(() => {
    let result = watchesData.filter(watch => 
      watch.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === 'All' || watch.category === category)
    );

    if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Name: A-Z') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredWatches(result);
  }, [searchTerm, category, sortBy]);

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold italic">The Collection</h1>
          <p className="text-foreground/50 max-w-2xl">
            A comprehensive catalog of our celestial timepieces. Each model is a tribute to a specific astronomical phenomenon.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-center bg-white/[0.02] border border-white/5 p-4 mb-12">
          {/* Search */}
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30" size={18} />
            <input
              type="text"
              placeholder="Search watches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 py-3 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-6 items-center w-full lg:w-auto">
            {/* Category Filter */}
            <div className="flex gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                    category === cat 
                    ? 'bg-primary text-background' 
                    : 'bg-white/5 text-foreground/60 hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="relative group ml-auto">
              <div className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 cursor-pointer">
                <SlidersHorizontal size={16} className="text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest">{sortBy}</span>
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
              </div>
              <div className="absolute top-full right-0 mt-2 w-48 bg-secondary border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                {['Featured', 'Price: Low to High', 'Price: High to Low', 'Name: A-Z'].map(option => (
                  <button
                    key={option}
                    onClick={() => setSortBy(option)}
                    className="w-full text-left px-4 py-3 text-xs uppercase tracking-widest hover:bg-primary hover:text-background transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 flex justify-between items-center text-sm text-foreground/40 font-medium">
          <span>Showing {filteredWatches.length} results</span>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
        >
          <AnimatePresence mode='popLayout'>
            {filteredWatches.map((watch) => (
              <WatchCard key={watch.id} watch={watch} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredWatches.length === 0 && (
          <div className="py-32 text-center space-y-4">
            <p className="text-2xl font-serif italic text-foreground/40">No celestial bodies found in this quadrant.</p>
            <button 
              onClick={() => {setSearchTerm(''); setCategory('All');}}
              className="text-primary hover:underline font-bold uppercase tracking-widest text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
