import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { ArrowRight, ChevronDown, Star, Shield, Clock, Zap } from 'lucide-react';
import WatchScene from '../components/Watch3D';
import WatchCard from '../components/WatchCard';
import watchesData from '../data/watches.json';

const Home = () => {
  const featuredWatches = watchesData.slice(0, 3);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-[#050505] astral-gradient flex items-center pt-20 overflow-hidden">
        {/* Background Animation / Stars */}
        <div className="absolute inset-0 z-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-20 animate-pulse-slow"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3}px`,
                height: `${Math.random() * 3}px`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-primary font-bold tracking-[0.4em] uppercase text-sm"
              >
                Beyond Earthly Precision
              </motion.span>
              <h1 className="text-6xl md:text-8xl font-bold leading-tight">
                THE <span className="gold-text">ASTRAL</span> <br />
                COLLECTION
              </h1>
            </div>
            
            <p className="text-xl text-foreground/60 max-w-lg leading-relaxed">
              Explore timepieces inspired by the vastness of the universe. Engineered with celestial precision and crafted for the explorers of tomorrow.
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <Link to="/collection" className="btn-primary flex items-center gap-3">
                Explore Collection <ArrowRight size={20} />
              </Link>
              <button className="btn-outline">
                Watch Story
              </button>
            </div>

            <div className="flex items-center gap-10 pt-10 border-t border-white/10">
              <div>
                <p className="text-3xl font-bold font-serif">50+</p>
                <p className="text-xs uppercase tracking-widest text-foreground/40">Exquisite Models</p>
              </div>
              <div>
                <p className="text-3xl font-bold font-serif">10k+</p>
                <p className="text-xs uppercase tracking-widest text-foreground/40">Happy Clients</p>
              </div>
              <div>
                <p className="text-3xl font-bold font-serif">5yr</p>
                <p className="text-xs uppercase tracking-widest text-foreground/40">Global Warranty</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[600px] flex items-center justify-center"
          >
            <Suspense fallback={<div className="text-primary animate-pulse">Loading Universe...</div>}>
              <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <ambientLight intensity={1.5} />
                <pointLight position={[10, 10, 10]} intensity={2} />
                <spotLight position={[-10, 20, 10]} angle={0.15} penumbra={1} intensity={2} />
                <WatchScene />
              </Canvas>
            </Suspense>
            
            {/* Floating Info Badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 right-0 glass-morphism p-4 rounded-xl border-primary/20"
            >
              <p className="text-xs font-bold text-primary uppercase tracking-widest">Material</p>
              <p className="text-sm font-serif">Space-grade Titanium</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-1/4 left-0 glass-morphism p-4 rounded-xl border-primary/20"
            >
              <p className="text-xs font-bold text-primary uppercase tracking-widest">Movement</p>
              <p className="text-sm font-serif">Automatic Caliber A-1</p>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-foreground/20"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="space-y-4">
              <span className="text-primary font-bold tracking-widest uppercase text-sm">Curated Selection</span>
              <h2 className="text-4xl md:text-5xl font-bold italic">Featured Timepieces</h2>
            </div>
            <Link to="/collection" className="text-primary hover:text-white transition-colors flex items-center gap-2 font-medium tracking-widest uppercase text-xs">
              View All Collection <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredWatches.map((watch) => (
              <WatchCard key={watch.id} watch={watch} />
            ))}
          </div>
        </div>
      </section>

      {/* Legacy Brands Section */}
      <section className="py-24 border-y border-white/5 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] block mb-4">Elite Manufacturers</span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif italic">The Pantheon of Horology</h2>
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-black to-transparent z-10" />
          
          <div className="animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-16 md:gap-24 px-8 md:px-12">
                {['ROLEX', 'PATEK PHILIPPE', 'AUDEMARS PIGUET', 'CASIO', 'OMEGA', 'CARTIER', 'HUBLOT', 'TUDOR', 'BREITLING', 'TAG HEUER', 'IWC', 'ZENITH'].map((brand) => (
                  <span 
                    key={brand} 
                    className="text-4xl md:text-6xl font-bold tracking-tighter text-white/10 hover:text-primary cursor-default transition-all duration-500 hover:scale-110"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Shield, title: "Authenticity", desc: "Every watch comes with a certified blockchain-backed digital identity." },
              { icon: Clock, title: "Precision", desc: "Swiss-grade accuracy tested in extreme cosmic-simulated environments." },
              { icon: Zap, title: "Self-Winding", desc: "Kinetic energy harvesting system ensures your watch never stops." },
              { icon: Star, title: "Limited Run", desc: "Exclusivity guaranteed with limited production batches per year." },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-4 group"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-background">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-foreground/50 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=2000&auto=format&fit=crop')] bg-fixed bg-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-7xl font-bold italic">Unveiling The Cosmos</h2>
            <p className="text-xl text-foreground/60 leading-relaxed">
              Our journey started with a single telescope and a dream to capture the essence of the stars. Today, we bring the universe to your wrist.
            </p>
            <Link to="/about" className="inline-block btn-outline">
              Our Philosophy
            </Link>
          </motion.div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-primary font-bold tracking-widest uppercase text-xs">Reach Out</span>
                <h2 className="text-5xl md:text-6xl font-bold italic">Join The Elite Circle</h2>
              </div>
              <p className="text-foreground/60 text-lg leading-relaxed">
                Whether you have a question about a specific timepiece or want to visit our boutique, our celestial experts are here to guide you.
              </p>
              
              <div className="space-y-6 pt-6">
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 text-primary transition-all group-hover:bg-primary group-hover:text-background">
                    <Star size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold text-foreground/40 mb-1">HQ Location</p>
                    <p className="font-medium">123 Cosmic Way, Mumbai, India</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 text-primary transition-all group-hover:bg-primary group-hover:text-background">
                    <Zap size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold text-foreground/40 mb-1">Direct Line</p>
                    <p className="font-medium">+91 1800-ASTRAL</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-morphism p-8 md:p-12 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-foreground/40 ml-1">Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 py-3 px-4 focus:outline-none focus:border-primary/50 text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-foreground/40 ml-1">Email</label>
                  <input type="email" placeholder="john@cosmos.com" className="w-full bg-white/5 border border-white/10 py-3 px-4 focus:outline-none focus:border-primary/50 text-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-foreground/40 ml-1">Message</label>
                <textarea rows={4} placeholder="Tell us about your cosmic interest..." className="w-full bg-white/5 border border-white/10 py-3 px-4 focus:outline-none focus:border-primary/50 text-sm resize-none"></textarea>
              </div>
              <button className="w-full btn-primary">Transmit Message</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
