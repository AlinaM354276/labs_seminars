import React from 'react';
import { Box, Typography } from '@mui/material';
import AboutImage from '../assets/images/img.png';  

const AboutUs = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${AboutImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
        color: '#FFFFFF',  
        textAlign: 'center',
        height: '400px',  
        borderRadius: '15px',
        display: 'flex', // Используем flex для центрирования
        flexDirection: 'column', // Вертикальное расположение
        justifyContent: 'center', // Центрирование по вертикали
        alignItems: 'center', // Центрирование по горизонтали
      }}
    >
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" sx={{ fontSize: '1.5rem', lineHeight: 1.8, textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
          About Us
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1.2rem', lineHeight: 1.8, textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)' }}>
          We are a team of professionals dedicated to transforming healthcare through modern technology. Our primary goal is to help individuals better understand their health and make informed decisions.
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1.2rem', lineHeight: 1.8, textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)' }}>
          We utilize <strong>machine learning</strong> to analyze medical data and create predictive models. By processing your data on our server, we can forecast the likelihood of cancer and other diseases.
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1.2rem', lineHeight: 1.8, textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)' }}>
          Our system takes into account numerous factors, including medical history, lifestyle, and genetic predispositions. We aim to provide you with accurate and reliable results so that you can seek medical assistance in a timely manner.
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1.2rem', lineHeight: 1.8, textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)' }}>
          Your health is our priority. We are committed to making diagnostics more accessible and effective.
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutUs;

