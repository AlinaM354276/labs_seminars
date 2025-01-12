import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import './App.css';
import AboutUs from './components/About'; 
import FormSection from './components/FormSection';
import Home from './pages/Home';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Box width="400px" sx={{ width: { xl: '1488px' } }} m="auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/form" element={<FormSection />} /> {/* Маршрут для FormSection */}
      </Routes>
      <FormSection /> 
    </Box>
  );
};

export default App;
