import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Watch } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
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
          <h1 className="text-4xl font-bold">Welcome Back</h1>
          <p className="text-foreground/50">Enter your credentials to access your celestial vault.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-foreground/70 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="commander@starfleet.com"
                className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">Password</label>
              <a href="#" className="text-[10px] text-primary hover:underline uppercase tracking-widest font-bold">Forgot?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>

          <button type="submit" className="w-full btn-primary flex items-center justify-center gap-3">
            Sign In <ArrowRight size={20} />
          </button>
        </form>

        <div className="text-center space-y-4">
          <div className="flex items-center gap-4 text-foreground/20">
            <div className="h-px bg-current flex-grow" />
            <span className="text-[10px] uppercase tracking-[0.3em]">Or continue with</span>
            <div className="h-px bg-current flex-grow" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="py-3 bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">Google</button>
            <button className="py-3 bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">Apple</button>
          </div>

          <p className="text-sm text-foreground/40 pt-4">
            New to Britime? <Link to="/signup" className="text-primary hover:underline font-bold">Create an account</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
