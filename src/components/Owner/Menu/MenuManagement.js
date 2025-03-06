import React, { useState } from 'react';
import axios from 'axios';
import './MenuManagement.css';

function MenuManagement({ onClose, onAddItem }) {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const handleAddItem = async (e) => {
    e.preventDefault();
    const storeId = localStorage.getItem('storeId');
    console.log('Store ID being sent:', storeId);
    const newItem = { name: itemName, price: itemPrice };
    
    try {
      const response = await axios.post(`https://menuup.onrender.com/api/store/${localStorage.getItem('storeId')}/menu`, newItem);
      onAddItem(response.data); // Pass the item added from backend response
      setItemName('');
      setItemPrice('');
      alert('Item added successfully!');
      if (onClose) onClose(); // Close modal after adding item
    } catch (error) {
      console.error('Error adding item:', error.response ? error.response.data : error.message);
      alert(`Failed to add item: ${error.response ? error.response.data.message : error.message}`);
    }
  };
  

  return (
    <div className="menu-management">
      <form onSubmit={handleAddItem} className="menu-form">
        <label>Item Name</label>
        <br />
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
        <br />
        <label>Item Price</label>
        <br />
        <input
          type="number"
          placeholder="Item Price"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
          required
        />
        <br />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default MenuManagement;
