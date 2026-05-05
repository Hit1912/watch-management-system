import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Watch } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signup(formData)) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen astral-gradient flex items-center justify-center px-6 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-morphism p-10 space-y-10"
      >
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <Watch className="text-primary w-10 h-10" />
          </Link>
          <h1 className="text-4xl font-bold">Join the Elite</h1>
          <p className="text-foreground/50">Start your journey with a timepiece that defines you.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-foreground/70 ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30" size={18} />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Arthur Dent"
                className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-foreground/70 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30" size={18} />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="commander@starfleet.com"
                className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-foreground/70 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30" size={18} />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>

          <button type="submit" className="w-full btn-primary flex items-center justify-center gap-3">
            Create Account <ArrowRight size={20} />
          </button>
        </form>

        <div className="text-center space-y-4">
          <p className="text-sm text-foreground/40">
            Already a member? <Link to="/login" className="text-primary hover:underline font-bold">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
