import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuManagement from './components/Owner/Menu/MenuManagement';
import QRCodePage from './components/QRCodePage';
import CustomerMenu from './components/Customer/CustomerMenu';
import Login from './components/Owner/Home/Login';
import Signup from './components/Owner/Home/Signup';
import Home from './components/Owner/Home/Home';
import AddMenu from './components/Owner/Menu/AddMenu';
import AddItem from './components/Owner/Menu/AddItem';
import Cart from './components/Customer/Cart';
import OrderManagement from './components/Owner/OrderManagement/OrderManagement';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/menu-management" element={<MenuManagement />} />
        <Route path="/add-menu" element={<AddMenu />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/qr-code/:storeId" element={<QRCodePage />} />
        <Route path="/customer-menu/:storeId" element={<CustomerMenu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<OrderManagement />} /> 
      </Routes>
    </Router>
  );
}

export default App;