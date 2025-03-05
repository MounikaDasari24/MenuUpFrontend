import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => navigate('/login');
  const handleSignupClick = () => navigate('/signup');

  return (
    <div className="home-container">
      <h1 className="home-title">MenuUp</h1>
      <p className="home-description">Welcome to MenuUp, your go-to platform for managing and exploring menus effortlessly.</p>
      <div className="home-buttons">
        <button className="home-button login" onClick={handleLoginClick}>Login</button>
        <button className="home-button signup" onClick={handleSignupClick}>Sign Up</button>
      </div>
    </div>
  );
}

export default Home;
