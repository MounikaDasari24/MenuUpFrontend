import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderManagement.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const storeId = localStorage.getItem('storeId');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/store/${storeId}/orders`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error.response ? error.response.data : error.message);
      }
    };

    if (storeId) fetchOrders();
  }, [storeId]);

  return (
    <div className="order-management">
      <h2>Order Management</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map(order => (
            <li key={order._id} className="order-item">
              <div className="order-details">
                <span className="order-items">{order.items.map(item => `${item.name} x${item.quantity}`).join(', ')}</span>
                <span className="order-total">Total: {order.totalAmount} /-</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders available</p>
      )}
    </div>
  );
};

export default OrderManagement;
