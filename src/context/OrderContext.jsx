import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('watch_orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem('watch_orders', JSON.stringify(orders));
  }, [orders]);

  const placeOrder = (orderDetails) => {
    const newOrder = {
      ...orderDetails,
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      date: new Date().toISOString(),
      status: 'Processing',
    };
    
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrdersByUser = (email) => {
    return orders.filter(order => order.userEmail === email);
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, getOrdersByUser }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
