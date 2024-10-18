import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail'; 
import Login from './components/Login';
import CartPage from './pages/CartPage';
import Wishlist from './pages/wishList';

const App = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && <Navbar />} {/* Render Navbar except on Login page */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:barcode" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </>
  );
};

// Wrap the App component in Router
const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
