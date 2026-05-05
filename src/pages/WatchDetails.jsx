import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Share2, ShieldCheck, RefreshCw, Truck, ArrowLeft, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import watchesData from '../data/watches.json';
import WatchCard from '../components/WatchCard';

const WatchDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [watch, setWatch] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const foundWatch = watchesData.find(w => w.id === parseInt(id));
    setWatch(foundWatch);
    // In a real app, I'd fetch this from an API
  }, [id]);

  if (!watch) return <div className="pt-32 text-center">Loading timepiece...</div>;

  const relatedWatches = watchesData.filter(w => w.category === watch.category && w.id !== watch.id).slice(0, 4);

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumbs */}
        <Link to="/collection" className="inline-flex items-center gap-2 text-foreground/40 hover:text-primary transition-colors mb-12 uppercase tracking-widest text-xs font-bold">
          <ArrowLeft size={16} /> Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Image Gallery */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card aspect-square relative flex items-center justify-center p-12 overflow-hidden"
            >
              <img 
                src={watch.image} 
                alt={watch.name} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain transition-transform duration-500 hover:scale-110 cursor-zoom-in"
              />
              <div className="absolute top-6 right-6 flex flex-col gap-3">
                <button className="w-10 h-10 flex items-center justify-center rounded-full glass-card hover:bg-primary hover:text-background transition-all">
                  <Heart size={18} />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full glass-card hover:bg-primary hover:text-background transition-all">
                  <Share2 size={18} />
                </button>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-4 gap-4">
              {[watch.image, watch.image, watch.image, watch.image].map((img, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`glass-card aspect-square p-4 flex items-center justify-center transition-all ${activeImage === i ? 'border-primary' : 'hover:border-primary/50'}`}
                >
                  <img src={img} alt={`${watch.name} view ${i}`} referrerPolicy="no-referrer" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-primary font-bold tracking-widest uppercase text-xs px-3 py-1 border border-primary/30">
                  {watch.category}
                </span>
                <div className="flex text-primary">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} />)}
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold">{watch.name}</h1>
              <p className="text-3xl font-serif text-primary font-bold">₹{watch.price.toLocaleString('en-IN')}</p>
            </div>

            <p className="text-foreground/60 text-lg leading-relaxed">
              {watch.description}
            </p>

            <div className="space-y-6">
              <h4 className="font-bold uppercase tracking-widest text-xs text-foreground/40">Core Features</h4>
              <div className="grid grid-cols-2 gap-4">
                {watch.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-medium">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button 
                onClick={() => addToCart(watch)}
                className="btn-primary flex-grow flex items-center justify-center gap-3"
              >
                <ShoppingCart size={20} /> Add to Cart
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-10 border-t border-white/5">
              <div className="flex flex-col items-center text-center gap-3">
                <Truck className="text-primary" size={24} />
                <span className="text-[10px] uppercase tracking-widest font-bold text-foreground/50">Free Express Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <ShieldCheck className="text-primary" size={24} />
                <span className="text-[10px] uppercase tracking-widest font-bold text-foreground/50">5 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <RefreshCw className="text-primary" size={24} />
                <span className="text-[10px] uppercase tracking-widest font-bold text-foreground/50">30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedWatches.length > 0 && (
          <div className="space-y-12">
            <h2 className="text-3xl font-bold italic">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {relatedWatches.map(w => (
                <WatchCard key={w.id} watch={w} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchDetails;
