import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from './components/product-list';
import ProductPage from './components/product-page';
import NoPage from './components/no-page';

const products = [
  { id: 1, name: 'Product 1', description: 'Description of Product 1', price: 20 },
  { id: 2, name: 'Product 2', description: 'Description of Product 2', price: 30 },
  // Add more products as needed
];

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<ProductList products={products} />} />
            <Route path="/products/:id" element={<ProductPage products={products} />} />
            <Route path="*" element={<NoPage />} />
        </Routes>
    </BrowserRouter>

  );
};

export default App;
