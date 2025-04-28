import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage.tsx'
import SearchPage from '../pages/SearchPage.tsx'
import ProductDetail from '../pages/ProductDetail.tsx';
import ContactPage from '../pages/ContactPage.tsx';
import SharePage from '../pages/SharePage.tsx';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/share" element={<SharePage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
