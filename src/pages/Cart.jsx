import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck, CreditCard, Smartphone, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalAmount, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isCheckout, setIsCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setIsCheckout(true);
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      placeOrder({
        items: cartItems,
        total: totalAmount * 1.18,
        paymentMethod,
        userEmail: user.email,
      });
      setIsProcessing(false);
      setOrderSuccess(true);
      clearCart();
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-40 pb-20 text-center space-y-8 min-h-screen">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto text-primary">
          {orderSuccess ? <CheckCircle size={40} className="text-green-500" /> : <ShoppingBag size={40} />}
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{orderSuccess ? "Order Placed Successfully!" : "Your Vault is Empty"}</h1>
          <p className="text-foreground/50">
            {orderSuccess 
              ? "Your celestial timepieces are being prepared for launch. Track them in your dashboard." 
              : "You haven't added any celestial timepieces to your collection yet."}
          </p>
        </div>
        <Link to={orderSuccess ? "/dashboard" : "/collection"} className="inline-block btn-primary">
          {orderSuccess ? "View Orders" : "Start Exploring"}
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-bold italic mb-12">Secure Payment Gateway</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-8">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="glass-card p-6 flex flex-col md:flex-row gap-8 items-center"
                >
                  <div className="w-32 h-32 bg-white/5 p-4 flex items-center justify-center shrink-0">
                    <img src={item.image} alt={item.name} referrerPolicy="no-referrer" className="w-full h-full object-contain" />
                  </div>
                  
                  <div className="flex-grow space-y-2 text-center md:text-left">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold">{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-foreground/20 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <p className="text-primary font-bold">₹{item.price.toLocaleString('en-IN')}</p>
                    <p className="text-xs text-foreground/40 uppercase tracking-widest">{item.category}</p>
                  </div>

                  <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-foreground/40 hover:text-primary transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-foreground/40 hover:text-primary transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="text-right shrink-0 min-w-[120px]">
                    <p className="text-sm text-foreground/40 uppercase tracking-widest font-bold mb-1">Subtotal</p>
                    <p className="text-xl font-bold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="space-y-8">
            <div className="glass-morphism p-8 space-y-8">
              <h2 className="text-2xl font-bold border-b border-white/5 pb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-foreground/60">
                  <span>Subtotal</span>
                  <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-foreground/60">
                  <span>Shipping</span>
                  <span className="text-green-500 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-foreground/60">
                  <span>Est. Tax</span>
                  <span>₹{(totalAmount * 0.18).toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                  <span className="text-xl font-bold italic">Total</span>
                  <span className="text-3xl font-bold text-primary">₹{(totalAmount * 1.18).toLocaleString('en-IN')}</span>
                </div>
              </div>

              {!isCheckout ? (
                <button onClick={handleCheckout} className="w-full btn-primary flex items-center justify-center gap-3">
                  Secure Checkout <ArrowRight size={20} />
                </button>
              ) : (
                <div className="space-y-6 pt-6 border-t border-white/5">
                  <h3 className="font-bold text-lg">Payment Method</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setPaymentMethod('upi')}
                      className={`flex flex-col items-center gap-2 p-4 border transition-colors ${paymentMethod === 'upi' ? 'border-primary bg-primary/10 text-primary' : 'border-white/10 text-foreground/50 hover:border-white/30'}`}
                    >
                      <Smartphone size={24} />
                      <span className="text-xs font-bold uppercase tracking-widest">UPI</span>
                    </button>
                    <button 
                      onClick={() => setPaymentMethod('card')}
                      className={`flex flex-col items-center gap-2 p-4 border transition-colors ${paymentMethod === 'card' ? 'border-primary bg-primary/10 text-primary' : 'border-white/10 text-foreground/50 hover:border-white/30'}`}
                    >
                      <CreditCard size={24} />
                      <span className="text-xs font-bold uppercase tracking-widest">Card</span>
                    </button>
                  </div>
                  
                  {paymentMethod === 'upi' && (
                    <input type="text" placeholder="Enter UPI ID (e.g. user@okicici)" className="w-full bg-white/5 border border-white/10 py-3 px-4 focus:outline-none focus:border-primary/50 text-sm" />
                  )}
                  {paymentMethod === 'card' && (
                    <div className="space-y-3">
                      <input type="text" placeholder="Card Number" className="w-full bg-white/5 border border-white/10 py-3 px-4 focus:outline-none focus:border-primary/50 text-sm" />
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="MM/YY" className="w-full bg-white/5 border border-white/10 py-3 px-4 focus:outline-none focus:border-primary/50 text-sm" />
                        <input type="text" placeholder="CVV" className="w-full bg-white/5 border border-white/10 py-3 px-4 focus:outline-none focus:border-primary/50 text-sm" />
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="w-full btn-primary flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isProcessing ? "Processing..." : `Pay ₹${(totalAmount * 1.18).toLocaleString('en-IN')}`}
                  </button>
                  <button onClick={() => setIsCheckout(false)} className="w-full text-center text-xs uppercase tracking-widest text-foreground/40 hover:text-primary font-bold transition-colors">
                    Cancel
                  </button>
                </div>
              )}

              <div className="space-y-4 pt-6 border-t border-white/5 text-[10px] uppercase tracking-widest font-bold text-foreground/40">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={14} className="text-primary" />
                  <span>Encrypted Transaction</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck size={14} className="text-primary" />
                  <span>Free Global Express Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
