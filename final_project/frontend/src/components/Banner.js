import React from 'react';
import { Typography, Button, Grid, Box } from '@mui/material';
import MainBannerImage from '../assets/images/img2.png';

const MainBanner = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: `url(${MainBannerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Grid container alignItems="center" sx={{ height: '100%', padding: '20px' }}>
        <Grid item xs={12} lg={6}>
          <Typography color="#ffffff" fontWeight="600" fontSize="56px">
            Cancer Prediction
          </Typography>
          <Typography color="#ffffff" fontSize="22px" lineHeight="35px" mb={4}>
          With this website, you can find out if you have cancer by filling out the form below.
          </Typography>
          <Button
            variant="contained"
            color="error"
            href="#form-section"
            sx={{ backgroundColor: '#132D46', padding: '20px' }}
          >
            Predict Cancer Lung
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainBanner;
