import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header';

function AddMenu() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/add-item');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Header />
      <button style={styles.button} onClick={handleClick}>
        Add Menu +
      </button>
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
    margin: '30%',
    cursor: 'pointer'
  }
};

export default AddMenu;
