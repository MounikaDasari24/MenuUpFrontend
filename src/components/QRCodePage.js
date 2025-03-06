import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodePage = () => {
  const { storeId } = useParams(); // Get storeId from URL params
  const navigate = useNavigate();

  const qrCodeUrl = `https://menuupfrontend.onrender.com/customer-menu/${storeId}`;
  
  const downloadQRCode = () => {
    const canvas = document.getElementById('store-qr-code');
    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'store-qr-code.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2 style={styles.h2}>Your Store QR Code</h2>
      <QRCodeCanvas id="store-qr-code" value={qrCodeUrl} size={256} includeMargin={true} />
      <br />
      <button onClick={downloadQRCode} style={styles.button}>Download QR Code</button>
      <button onClick={goBack} style={styles.backButton}>Go Back</button>
    </div>
  );
};

const styles = {
  h2: {
    color: '#FF9A16'
  },
  button: {
    padding: '10px 20px',
    margin: '10px',
    color: '#FF9A16',
    border: 'solid',
    borderColor: '#FF9A16',
    borderRadius: '10px',
    cursor: 'pointer',
    backgroundColor: 'white'
  },
  backButton: {
    padding: '10px 20px',
    backgroundColor: '#FF9A16',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  }
};

export default QRCodePage;
