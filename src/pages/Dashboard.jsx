import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, Package, Heart, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout, updateProfile } = useAuth();
  const { getOrdersByUser } = useOrders();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '' });

  React.useEffect(() => {
    if (user) {
      setEditForm({ name: user.name, email: user.email });
    }
  }, [user]);

  const handleSaveProfile = () => {
    updateProfile(editForm);
    setIsEditing(false);
  };

  const userOrders = user ? getOrdersByUser(user.email) : [];

  // Protect the route
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'orders', label: 'Order History', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Preferences', icon: Settings },
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold italic mb-2">Welcome, {user.name}</h1>
          <p className="text-foreground/50 tracking-widest uppercase text-xs font-bold">Your Celestial Vault</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 text-sm font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-background'
                    : 'bg-white/5 text-foreground/60 hover:bg-white/10 hover:text-primary'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-6 py-4 text-sm font-bold uppercase tracking-widest bg-white/5 text-red-500 hover:bg-red-500/10 transition-all mt-8 border border-red-500/20"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-grow glass-morphism p-8 md:p-12 min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                {activeTab === 'profile' && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold border-b border-white/5 pb-4">Profile Settings</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-foreground/50 font-bold ml-1">Full Name</label>
                        {isEditing ? (
                          <input 
                            type="text" 
                            value={editForm.name} 
                            onChange={e => setEditForm({...editForm, name: e.target.value})}
                            className="w-full bg-white/5 border border-primary/50 py-3 px-4 focus:outline-none"
                          />
                        ) : (
                          <div className="p-4 bg-white/5 border border-white/10 font-medium">{user.name}</div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-foreground/50 font-bold ml-1">Email Address</label>
                        {isEditing ? (
                          <input 
                            type="email" 
                            value={editForm.email} 
                            onChange={e => setEditForm({...editForm, email: e.target.value})}
                            className="w-full bg-white/5 border border-primary/50 py-3 px-4 focus:outline-none"
                          />
                        ) : (
                          <div className="p-4 bg-white/5 border border-white/10 font-medium">{user.email}</div>
                        )}
                      </div>
                    </div>
                    {isEditing ? (
                      <div className="flex gap-4">
                        <button onClick={handleSaveProfile} className="btn-primary text-sm py-2 px-6">Save Changes</button>
                        <button onClick={() => setIsEditing(false)} className="btn-outline text-sm py-2 px-6 border-white/20 text-foreground/50 hover:bg-white/10 hover:text-foreground hover:border-white/20">Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => setIsEditing(true)} className="btn-outline text-sm py-2 px-6">Edit Profile</button>
                    )}
                  </div>
                )}

                {activeTab === 'orders' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold border-b border-white/5 pb-4">Order History</h2>
                    {userOrders.length === 0 ? (
                      <div className="py-20 text-center border border-dashed border-white/10 bg-white/[0.02]">
                        <Package size={48} className="mx-auto text-foreground/20 mb-6" />
                        <p className="text-foreground/50 text-lg font-serif">No interstellar shipments found.</p>
                        <Link to="/collection" className="mt-6 inline-block text-primary hover:underline text-sm uppercase tracking-widest font-bold">Start Exploring</Link>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {userOrders.map((order) => (
                          <div key={order.id} className="glass-card p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div className="space-y-2">
                              <p className="text-sm font-bold uppercase tracking-widest text-primary">Order #{order.id}</p>
                              <p className="text-xs text-foreground/50 uppercase tracking-widest">{new Date(order.date).toLocaleDateString()}</p>
                              <div className="flex gap-2 mt-4">
                                {order.items.slice(0, 3).map((item, idx) => (
                                  <div key={idx} className="w-12 h-12 bg-white/5 p-1">
                                    <img src={item.image} alt={item.name} referrerPolicy="no-referrer" className="w-full h-full object-contain" />
                                  </div>
                                ))}
                                {order.items.length > 3 && (
                                  <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-xs font-bold">
                                    +{order.items.length - 3}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="text-left md:text-right space-y-2">
                              <p className="text-xl font-bold">₹{order.total.toLocaleString('en-IN')}</p>
                              <span className="inline-block px-3 py-1 bg-white/10 text-[10px] uppercase tracking-widest font-bold border border-white/5">
                                Paid via {order.paymentMethod.toUpperCase()}
                              </span>
                              <p className="text-xs font-bold text-green-500 uppercase tracking-widest mt-2">● {order.status}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'wishlist' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold border-b border-white/5 pb-4">Wishlist</h2>
                    <div className="py-20 text-center border border-dashed border-white/10 bg-white/[0.02]">
                      <Heart size={48} className="mx-auto text-foreground/20 mb-6" />
                      <p className="text-foreground/50 text-lg font-serif">Your celestial vault is empty.</p>
                      <button onClick={() => navigate('/collection')} className="mt-6 text-primary hover:underline text-sm uppercase tracking-widest font-bold">Discover Timepieces</button>
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold border-b border-white/5 pb-4">Preferences</h2>
                    <div className="space-y-6">
                      <label className="flex items-center gap-4 cursor-pointer group">
                        <div className="relative flex items-center justify-center w-6 h-6 border border-white/20 bg-white/5 group-hover:border-primary transition-colors">
                          <input type="checkbox" defaultChecked className="opacity-0 absolute w-full h-full cursor-pointer peer" />
                          <div className="w-3 h-3 bg-primary rounded-sm opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-foreground/80 font-medium">Receive Cosmic Event Newsletters</span>
                      </label>
                      <label className="flex items-center gap-4 cursor-pointer group">
                        <div className="relative flex items-center justify-center w-6 h-6 border border-white/20 bg-white/5 group-hover:border-primary transition-colors">
                          <input type="checkbox" defaultChecked className="opacity-0 absolute w-full h-full cursor-pointer peer" />
                          <div className="w-3 h-3 bg-primary rounded-sm opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-foreground/80 font-medium">SMS Delivery Updates</span>
                      </label>
                    </div>
                    <button className="btn-primary text-sm py-2 px-6 mt-4">Save Preferences</button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
