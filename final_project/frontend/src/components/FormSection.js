import React from 'react';
import {
  createTheme,
  ThemeProvider,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Button,
  Box,
  TextField,
} from '@mui/material';

const theme = createTheme({
  typography: {
    allVariants: {
      color: '#FFFFFF',
    },
  },
});

const FormSection = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    surname: '',
    phoneNumber: '',
    gender: '',
    age: '',
    smoking: '',
    anxiety: '',
    peerPressure: '',
    chronicDisease: '',
    fatigue: '',
    allergy: '',
    wheezing: '',
    alcohol: '',
    coughing: '',
    shortnessOfBreath: '',
    swallowingDifficulty: '',
    chestPain: '',
  });

  const [errors, setErrors] = React.useState({});
  const [result, setResult] = React.useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.surname) newErrors.surname = 'Surname is required.';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required.';
    if (!formData.age || isNaN(formData.age) || formData.age < 0 || formData.age > 120) {
      newErrors.age = 'Please enter a valid age (0-120).';
    }
    ['smoking', 'anxiety', 'peerPressure', 'chronicDisease', 'fatigue', 'allergy', 'wheezing', 'alcohol', 'coughing', 'shortnessOfBreath', 'swallowingDifficulty', 'chestPain'].forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `Please select an option for ${field}.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      const transformedData = {
        name: formData.name,
        family_name: formData.surname, // Поле "surname" преобразуется в "family_name"
        phone: formData.phoneNumber, // Поле "phoneNumber" преобразуется в "phone"
        gender: formData.gender === 'Female', // Female -> True, Male -> False
        age: Number(formData.age), // Возраст преобразуется в число
        smoking: formData.smoking === '1', // "1" -> True, "0" -> False
        anxiety: formData.anxiety === '1',
        peer_pressure: formData.peerPressure === '1',
        chronic_disease: formData.chronicDisease === '1',
        fatigue: formData.fatigue === '1',
        allergy: formData.allergy === '1',
        wheezing: formData.wheezing === '1',
        alcohol: formData.alcohol === '1',
        coughing: formData.coughing === '1',
        shortness_of_breath: formData.shortnessOfBreath === '1', // Поле преобразуется
        swallowing_difficulty: formData.swallowingDifficulty === '1', // Поле преобразуется
        chest_pain: formData.chestPain === '1', // Поле преобразуется
      };      
  
      console.log('Transformed Data:', transformedData);
  
      try {
        const response = await fetch('https://labs-seminars.onrender.com/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(transformedData),
        });
  
        console.log('Response Status:', response.status);
        const responseData = await response.json();
        console.log('Response Data:', responseData);
  
        if (response.status === 200) {
          setResult(responseData.result === 1 ? 'Lung cancer: yes' : 'Lung cancer: no');
        } else {
          setResult('Server error: Unable to process request.');
        }
      } catch (error) {
        console.error('Error:', error);
        setResult('Error: Unable to reach the server.');
      }
    }
  };
  


  return (
    <ThemeProvider theme={theme}>
      <Box
        id="form-section"
        sx={{
          padding: '40px',
          backgroundColor: '#132D46',
          minHeight: '100vh',
        }}
      >
        <Typography fontWeight="600" fontSize="32px" textAlign="center" mb={4}>
          Enter Patient Information
        </Typography>
        <Grid container spacing={4} sx={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleInputChange}
              variant="outlined"
              InputLabelProps={{ style: { color: '#FFFFFF' } }}
              InputProps={{
                sx: { color: '#FFFFFF', backgroundColor: '#132D46' },
              }}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              name="surname"
              label="Surname"
              value={formData.surname}
              onChange={handleInputChange}
              variant="outlined"
              InputLabelProps={{ style: { color: '#FFFFFF' } }}
              InputProps={{
                sx: { color: '#FFFFFF', backgroundColor: '#132D46' },
              }}
              error={!!errors.surname}
              helperText={errors.surname}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              name="phoneNumber"
              label="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              variant="outlined"
              InputLabelProps={{ style: { color: '#FFFFFF' } }}
              InputProps={{
                sx: { color: '#FFFFFF', backgroundColor: '#132D46' },
              }}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel style={{ color: '#FFFFFF' }}>Gender</InputLabel>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                sx={{ color: '#FFFFFF' }}
              >
                <MenuItem value="Male" style={{ color: '#132D46' }}>Male</MenuItem>
                <MenuItem value="Female" style={{ color: '#132D46' }}>Female</MenuItem>
              </Select>
              {errors.gender && <FormHelperText error>{errors.gender}</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel style={{ color: '#FFFFFF' }}>Age</InputLabel>
              <Select
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                sx={{ color: '#FFFFFF' }}
              >
                {[...Array(121).keys()].map((age) => (
                  <MenuItem key={age} value={age} style={{ color: '#132D46' }}>
                    {age}
                  </MenuItem>
                ))}
              </Select>
              {errors.age && <FormHelperText error>{errors.age}</FormHelperText>}
            </FormControl>
          </Grid>

          {[
            { name: 'smoking', label: 'Smoking (1 = Yes, 0 = No)' },
            { name: 'anxiety', label: 'Anxiety (1 = Yes, 0 = No)' },
            { name: 'peerPressure', label: 'Peer Pressure (1 = Yes, 0 = No)' },
            { name: 'chronicDisease', label: 'Chronic Disease (1 = Yes, 0 = No)' },
            { name: 'fatigue', label: 'Fatigue (1 = Yes, 0 = No)' },
            { name: 'allergy', label: 'Allergy (1 = Yes, 0 = No)' },
            { name: 'wheezing', label: 'Wheezing (1 = Yes, 0 = No)' },
            { name: 'alcohol', label: 'Alcohol (1 = Yes, 0 = No)' },
            { name: 'coughing', label: 'Coughing (1 = Yes, 0 = No)' },
            { name: 'shortnessOfBreath', label: 'Shortness of Breath (1 = Yes, 0 = No)' },
            { name: 'swallowingDifficulty', label: 'Swallowing Difficulty (1 = Yes, 0 = No)' },
            { name: 'chestPain', label: 'Chest Pain (1 = Yes, 0 = No)' },
          ].map((field) => (
            <Grid item xs={12} md={6} key={field.name}>
              <FormControl fullWidth>
                <InputLabel style={{ color: '#FFFFFF' }}>{field.label}</InputLabel>
                <Select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  sx={{ color: '#FFFFFF' }}
                >
                  <MenuItem value="0" style={{ color: '#132D46' }}>0</MenuItem>
                  <MenuItem value="1" style={{ color: '#132D46' }}>1</MenuItem>
                </Select>
                {errors[field.name] && <FormHelperText error>{errors[field.name]}</FormHelperText>}
              </FormControl>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#FFFFFF',
              color: '#132D46',
            }}
            onClick={handleSubmit}
          >
            Get results
          </Button>
        </Box>
        {result && (
          <Typography variant="h6" style={{ color: '#FFFFFF', textAlign: 'center', marginTop: '20px' }}>
            {result}
          </Typography>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default FormSection;
