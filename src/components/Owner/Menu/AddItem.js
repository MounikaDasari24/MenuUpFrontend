import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuManagement from './MenuManagement';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header';

function AddItem() {
  const [showMenu, setShowMenu] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const storeId = localStorage.getItem('storeId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`https://menuup.onrender.com/api/store/${storeId}/menu`);
        const uniqueItems = response.data.filter(
          (item, index, self) => index === self.findIndex(i => i._id === item._id)
        );
        setMenuItems(uniqueItems);
      } catch (error) {
        console.error('Error fetching menu:', error.response ? error.response.data : error.message);
      }
    };

    if (storeId) fetchMenu();
  }, [storeId]);

  const handleOpenMenu = () => {
    setShowMenu(true);
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  const handleAddItem = async (newItem) => {
    try {
      if (!storeId) {
        alert('Store ID is missing! Please log in again.');
        return;
      }

      const response = await axios.post(`https://menuup.onrender.com/api/store/${storeId}/menu`, newItem);

      // Ensure item is not duplicated in the menuItems state
      setMenuItems(prevItems => {
        const itemExists = prevItems.some(item => item._id === response.data._id);
        return itemExists ? prevItems : [...prevItems, response.data];
      });

      handleCloseMenu();
    } catch (error) {
      console.error('Error adding menu item:', error.response ? error.response.data : error.message);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`https://menuup.onrender.com/api/store/${storeId}/menu/${itemId}`);
      setMenuItems(prevItems => prevItems.filter(item => item._id !== itemId));
      alert('Item deleted successfully!');
    } catch (error) {
      console.error('Error deleting menu item:', error.response ? error.response.data : error.message);
      alert('Failed to delete item. Please try again.');
    }
  };

  const handleShowQRCode = () => {
    setShowMenu(false);
    navigate(`/qr-code/${storeId}`);
  };

  return (
    <div style={{ textAlign: 'center', position: 'relative' }}>
      <Header />
      {!showMenu && (
        <button style={styles.button} onClick={handleOpenMenu}>
          Add Item +
        </button>
      )}
      <br/>

      {menuItems.length > 0 && (
        <button style={styles.qrButton} onClick={handleShowQRCode}>
          Generate QR
        </button>
      )}

      {menuItems.map((item) => (
        <div key={item._id} style={styles.itemContainer}>
          <span style={styles.item}>{item.name} - {item.price}/-</span>
          <button style={styles.deleteButton} onClick={() => handleDeleteItem(item._id)}>
            🗑️
          </button>
        </div>
      ))}

      {showMenu && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <button style={styles.closeButton} onClick={handleCloseMenu}>
              &times;
            </button>
            <MenuManagement onAddItem={handleAddItem} />
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  button: {
    border: 'solid',
    borderColor: '#FF9A16',
    borderRadius: '8px',
    backgroundColor: 'white',
    color: '#FF9A16',
    padding: '8px',
    fontSize: '24px',
    fontWeight: 'bold',
    fontFamily: 'Itim',
    margin: '30% 0 10px 0',
    cursor: 'pointer'
  },
  qrButton: {
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#FF9A16',
    color: 'white',
    padding: '8px',
    fontSize: '20px',
    fontWeight: 'bold',
    fontFamily: 'Itim',
    margin: '10px',
    cursor: 'pointer'
  },
  itemContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px',
    margin: '5px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  item: {
    fontFamily: 'Itim',
    fontSize: '24px',
    color: '#FF9A16',
    fontWeight: 'bold'
  },
  deleteButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#FF9A16'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'flex-end'
  },
  modal: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    padding: '20px',
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
    position: 'relative'
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#FF9A16'
  }
};

export default AddItem;
