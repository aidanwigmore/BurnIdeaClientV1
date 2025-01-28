import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from '@context/AuthContext';
import { IdeaProvider } from '@context/IdeaContext';
import { CategoryProvider } from '@context/CategoryContext';
import { AboutProvider } from '@context/AboutContext';
import { FaqProvider } from '@context/FAQContext';
// import AdminHomePage from '@pages/AdminHomePage';
// import CustomerHomePage from '@pages/CustomerHomePage';
// import CustomerCategoryPage from '@pages/CustomerCategoryPage';
// import CustomerProductPage from '@pages/CustomerProductPage';
// import OurStores from '@pages/OurStores';
// import Directions from '@pages/Directions';
// import FAQPage from '@pages/FAQPage';
// import AboutUsPage from '@pages/AboutUsPage';

// import BurnHomePage from '@pages/BurnHomePage';

import LandingPage from './LandingPage';

import customTheme from './theme';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <LandingPage/>
      {/* <Router>
        <Routes>
          <Route path="/" element={<CustomerHomePage />} />
          <Route path="/admin" element={<AdminHomePage />} />
          <Route path="/categories/:id" element={<CustomerCategoryPage />} />
          <Route path="/products/:id" element={<CustomerProductPage />} />
          <Route path="/stores" element={<OurStores />} />
          <Route path="/directions" element={<Directions />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />

          <Route path="/burn-idea" element={<BurnHomePage />} />
        </Routes>
      </Router> */}
    </ThemeProvider>
  )
}

export default App;
