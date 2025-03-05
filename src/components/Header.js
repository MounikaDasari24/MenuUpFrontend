import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import './logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const storeId = localStorage.getItem('storeId');

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Close menu after navigation
  };

  const handleLogout = () => {
    localStorage.removeItem('storeId');
    navigate('/login');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="header">
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>
      <div className="logo">
        <img src='./logo.png' alt="Logo" />
      </div>
      {isMenuOpen && (
        <div className="overlay" onClick={() => setIsMenuOpen(false)}>
          <div className="menu-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setIsMenuOpen(false)}>✕</button><br/>
            <button onClick={() => handleNavigation(`/qr-code/${storeId}`)}>QR Code</button>
            <button onClick={() => handleNavigation('/orders')}>Orders</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
