import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Globe, Rocket } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Years of Excellence', value: '25+', icon: Award },
    { label: 'Global Boutiques', value: '40', icon: Globe },
    { label: 'Master Artisans', value: '150+', icon: Users },
    { label: 'Timepieces Crafted', value: '50k+', icon: Rocket },
  ];

  const milestones = [
    { year: '1998', title: 'The Genesis', desc: 'Shivam Watch was founded in a small workshop in Geneva, driven by a passion for celestial mechanics.' },
    { year: '2005', title: 'First Lunar Patent', desc: 'We revolutionized moon-phase accuracy with our proprietary Starlight movement.' },
    { year: '2015', title: 'Global Expansion', desc: 'Opened flagship boutiques in London, New York, and Mumbai.' },
    { year: '2023', title: 'The Astral Era', desc: 'Launched the first luxury watch integrated with blockchain authenticity.' },
  ];

  return (
    <div className="pt-32 pb-20 bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mb-24">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2000&auto=format&fit=crop" 
            alt="Master Watchmaker" 
            className="w-full h-full object-cover opacity-30 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
        </div>
        
        <div className="relative z-10 text-center space-y-6 max-w-4xl px-6">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-bold tracking-[0.5em] uppercase text-xs"
          >
            Since 1998
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold italic"
          >
            Our Celestial <span className="gold-text">Legacy</span>
          </motion.h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 space-y-32">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold font-serif italic">Beyond the Bounds of Time</h2>
            <div className="space-y-6 text-foreground/60 text-lg leading-relaxed">
              <p>
                Shivam Watch was born from a singular vision: to create timepieces that don't just measure seconds, but capture the essence of the cosmos. For over two decades, we have pushed the boundaries of traditional horology.
              </p>
              <p>
                Our master watchmakers combine centuries-old Swiss techniques with cutting-edge aerospace materials. The result is a collection of watches that are as durable as they are beautiful—engineered for the explorers of today and the legends of tomorrow.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 pt-6">
              {stats.map((stat, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-3 text-primary">
                    <stat.icon size={20} />
                    <span className="text-3xl font-bold font-serif">{stat.value}</span>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-foreground/40">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="glass-card p-4 rotate-3 transform transition-transform hover:rotate-0 duration-500">
              <img 
                src="https://images.unsplash.com/photo-1509048196580-d7883a99cc4a?q=80&w=1000&auto=format&fit=crop" 
                alt="Watch Movement" 
                className="w-full grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10" />
          </div>
        </div>

        {/* Timeline */}
        <section className="py-20 border-y border-white/5">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold italic mb-4">The Journey Through Space</h2>
            <p className="text-foreground/40 uppercase tracking-widest text-xs font-bold">Key Milestones in our history</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {milestones.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-4 relative"
              >
                <span className="text-6xl font-bold font-serif text-white/5 absolute -top-10 -left-4 leading-none">
                  {item.year}
                </span>
                <h3 className="text-xl font-bold text-primary relative z-10">{item.title}</h3>
                <p className="text-sm text-foreground/50 leading-relaxed relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Philosophy */}
        <div className="text-center max-w-3xl mx-auto space-y-10 pb-20">
          <h2 className="text-4xl font-bold italic">Our Philosophy</h2>
          <p className="text-2xl font-serif text-foreground/80 leading-relaxed italic">
            "Time is not a cage; it is a gateway to the infinite. We don't just sell watches; we provide the keys to the universe."
          </p>
          <div className="w-20 h-px bg-primary mx-auto" />
          <p className="text-foreground/40 uppercase tracking-[0.3em] font-bold text-sm">Shivam, Founder</p>
        </div>
      </div>
    </div>
  );
};

export default About;
