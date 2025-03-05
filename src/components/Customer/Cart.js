import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, setCart] = React.useState(location.state?.cart || []);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const handlePlaceOrder = async () => {
    try {
      const { storeId } = cart[0]; // Assuming all items are from one store
      const storeResponse = await axios.get(`https://menuup.onrender.com/api/store/${storeId}`);
      const { upiId, storeName } = storeResponse.data;
  
      const totalAmount = getTotalPrice();

      const upiLink = `upi://pay?pa=${upiId}&pn=${storeName}&am=${totalAmount}&cu=INR`;
      console.log('UPI Payment Link:', upiLink);
  
      window.location.href = upiLink; // Opens UPI app like GPay or PhonePe
    } catch (error) {
      console.error('Error fetching store UPI ID or placing order:', error);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  const handleRemoveItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length > 0 ? (
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="cart-item">
              <span>{item.name}</span>
              <span> {item.quantity}</span>
              <span>{item.quantity * item.price} /-</span>
              <button className="remove-button" onClick={() => handleRemoveItem(index)}>✕</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty</p>
      )}

      {cart.length > 0 && (
        <div className="cart-summary">
          <div className="total-container">
            <span className='total'>Total:</span>
            <span className='total-price'>{getTotalPrice()} /-</span>
          </div>
          <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
