import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Collection from './pages/Collection';
import WatchDetails from './pages/WatchDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import Brands from './pages/Brands';
import About from './pages/About';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/brands" element={<Brands />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/watch/:id" element={<WatchDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </main>
            <Footer />
          </div>
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
