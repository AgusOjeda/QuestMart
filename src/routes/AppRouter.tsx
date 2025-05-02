import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/Home/HomePage.tsx'
import SearchPage from '../pages/Search/SearchPage.tsx'
import ProductDetail from '../pages/Detail/ProductDetail.tsx';
import ContactPage from '../pages/Contact/ContactPage.tsx';
import SharePage from '../pages/Share/SharePage.tsx';

import CartPage from '../pages/cart/CartPage.tsx';
import HistoryPage from '../pages/History/HistoryPage.tsx';


const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/share" element={<SharePage />} />
        <Route path="/carrito" element={<CartPage />}/>
        <Route path="/historial" element={<HistoryPage />}/>
      </Routes>
    </Router>
  );
};

export default AppRouter;
