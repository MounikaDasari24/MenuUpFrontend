import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CustomerMenu.css';

const CustomerMenu = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        console.log(`Fetching menu for store: ${storeId}`);
        const response = await axios.get(`https://menuup.onrender.com/api/store/${storeId}/menu`);
        setMenuItems(response.data);
        console.log('Menu response:', response.data);
        if (response.data.length === 0) {
  console.warn('No menu items found for this store.');
}
      } catch (error) {
        console.error('Error fetching menu:', error.response ? error.response.data : error.message);
      }
    };

    if (storeId) fetchMenu();
  }, [storeId]);

  useEffect(() => {
    setCart([]); // Reset cart when returning to this page
  }, []);
  

  const updateCart = (item, change) => {
    const existingItem = cart.find(cartItem => cartItem._id === item._id);

    if (existingItem) {
      const updatedCart = cart.map(cartItem =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: Math.max(cartItem.quantity + change, 0) }
          : cartItem
      ).filter(cartItem => cartItem.quantity > 0);

      setCart(updatedCart);
    } else if (change > 0) {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const goToCart = () => {
    navigate('/cart', { state: { cart } });
  };

  const getItemQuantity = (itemId) => {
    const item = cart.find(cartItem => cartItem._id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="customer-menu">
      <div className="menu-header">
        <h2>Menu</h2>
        <div className="cart-icon" onClick={goToCart}>
          🛒 ({cart.length})
        </div>
      </div>
      {menuItems.length > 0 ? (
        <ul>
          {menuItems.map((item) => (
            <li key={item._id} className="menu-item">
              <span>{item.name}</span>
              <span>{item.price} /-</span>
              <div className="quantity-controls">
                <button onClick={() => updateCart(item, -1)}>-</button>
                <span>{getItemQuantity(item._id)}</span>
                <button onClick={() => updateCart(item, 1)}>+</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items available</p>
      )}
    </div>
  );
};

export default CustomerMenu;
