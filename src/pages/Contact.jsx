import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageSquare, ShieldCheck, Globe } from 'lucide-react';

const Contact = () => {
  return (
    <div className="pt-32 pb-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-20 text-center space-y-4">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-primary font-bold tracking-[0.4em] uppercase text-xs"
          >
            Connect With Us
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold italic"
          >
            Bespoke <span className="gold-text">Consultation</span>
          </motion.h1>
          <p className="text-foreground/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Experience the pinnacle of service. Whether you're seeking a rare vintage piece or modern astral masterpiece, our curators are at your service.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
          {/* Contact Methods */}
          <div className="lg:col-span-1 space-y-8">
            <div className="glass-card p-8 space-y-6">
              <h3 className="text-xl font-bold border-b border-white/5 pb-4">Our Boutiques</h3>
              
              <div className="space-y-8">
                <div className="flex gap-6 group">
                  <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-background transition-all">
                    <MapPin size={20} />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-sm uppercase tracking-widest">Global HQ</p>
                    <p className="text-foreground/60 text-sm leading-relaxed">123 Cosmic Way, Star City,<br />Mumbai, MH 400001</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-background transition-all">
                    <Phone size={20} />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-sm uppercase tracking-widest">Concierge</p>
                    <p className="text-foreground/60 text-sm font-medium">+91 1800-ASTRAL</p>
                    <p className="text-xs text-foreground/40">Mon-Sat: 10AM - 8PM IST</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-background transition-all">
                    <Mail size={20} />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-sm uppercase tracking-widest">Digital Liaison</p>
                    <p className="text-foreground/60 text-sm font-medium">support@shivamwatch.in</p>
                    <p className="text-xs text-foreground/40">Response within 2 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-morphism p-8 space-y-6">
              <div className="flex items-center gap-3 text-primary">
                <ShieldCheck size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">Secure Communication</span>
              </div>
              <p className="text-xs text-foreground/40 leading-relaxed font-bold uppercase tracking-widest">
                All inquiries are treated with the highest level of confidentiality and discretion.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 glass-morphism p-8 md:p-16">
            <form className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-widest font-bold text-foreground/50 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="E.g. Alexander Vance"
                    className="w-full bg-white/5 border-b border-white/10 py-3 focus:outline-none focus:border-primary transition-all text-lg placeholder:text-foreground/20"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-widest font-bold text-foreground/50 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="vance@heritage.com"
                    className="w-full bg-white/5 border-b border-white/10 py-3 focus:outline-none focus:border-primary transition-all text-lg placeholder:text-foreground/20"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs uppercase tracking-widest font-bold text-foreground/50 ml-1">Inquiry Type</label>
                <div className="flex flex-wrap gap-4 pt-2">
                  {['Purchase', 'Service', 'Authentication', 'Boutique Visit', 'Custom Build'].map((type) => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" name="type" className="hidden peer" />
                      <div className="w-4 h-4 border border-white/20 rounded-full peer-checked:bg-primary peer-checked:border-primary transition-all" />
                      <span className="text-sm text-foreground/50 peer-checked:text-white transition-colors uppercase tracking-widest font-bold">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs uppercase tracking-widest font-bold text-foreground/50 ml-1">Your Message</label>
                <textarea 
                  rows={4} 
                  placeholder="Tell us about the timepiece you desire..."
                  className="w-full bg-white/5 border border-white/10 p-4 focus:outline-none focus:border-primary transition-all text-lg placeholder:text-foreground/20 resize-none"
                />
              </div>

              <button className="btn-primary w-full md:w-auto flex items-center justify-center gap-3 py-4 px-12">
                Initiate Consultation <MessageSquare size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Global Presence */}
        <section className="border-t border-white/5 pt-20">
          <div className="text-center mb-16">
            <Globe className="text-primary mx-auto mb-6" size={32} />
            <h2 className="text-3xl font-bold italic mb-2">Our Global Boutiques</h2>
            <p className="text-xs uppercase tracking-[0.3em] font-bold text-foreground/40">From Geneva to the World</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { city: 'Geneva', area: 'Rue du Rhône' },
              { city: 'Mumbai', area: 'Colaba Causeway' },
              { city: 'New York', area: 'Fifth Avenue' },
              { city: 'London', area: 'Bond Street' },
            ].map((loc, i) => (
              <div key={i} className="text-center space-y-1">
                <p className="text-xl font-bold">{loc.city}</p>
                <p className="text-[10px] uppercase tracking-widest text-primary font-bold">{loc.area}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
