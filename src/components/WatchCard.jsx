import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

const WatchCard = ({ watch }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="glass-card aspect-[4/5] overflow-hidden relative flex items-center justify-center p-8">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
        
        {/* Image */}
        <motion.img
          src={watch.image}
          alt={watch.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
        />

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
          <Link
            to={`/watch/${watch.id}`}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-background hover:bg-primary hover:text-background transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
          >
            <Eye size={20} />
          </Link>
          <button
            onClick={() => addToCart(watch)}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-background hover:bg-white transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 delay-75"
          >
            <ShoppingCart size={20} />
          </button>
        </div>

        {/* Category Label */}
        <div className="absolute top-4 left-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80 px-2 py-1 border border-primary/20">
            {watch.category}
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-serif text-xl font-bold group-hover:text-primary transition-colors">
            {watch.name}
          </h3>
          <span className="font-sans font-bold text-primary">
            ₹{watch.price.toLocaleString('en-IN')}
          </span>
        </div>
        <p className="text-sm text-foreground/50 line-clamp-2">
          {watch.description}
        </p>
      </div>
    </motion.div>
  );
};

export default WatchCard;
