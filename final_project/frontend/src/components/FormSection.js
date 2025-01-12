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
      color: '#FFFFFF', // Белый цвет для всех текстов
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
  
    // Проверка на пустые поля
    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.surname) newErrors.surname = 'Surname is required.';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required.';
  
    // Проверка на возраст
    if (!formData.age || isNaN(formData.age) || formData.age < 0 || formData.age > 120) {
      newErrors.age = 'Please enter a valid age (0-120).';
    }
  
    // Проверка на выбор для полей с 1 или 2
    ['smoking', 'anxiety', 'peerPressure', 'chronicDisease', 'fatigue', 'allergy', 'wheezing', 'alcohol', 'coughing', 'shortnessOfBreath', 'swallowingDifficulty', 'chestPain'].forEach(
      (field) => {
        if (!formData[field]) {
          newErrors[field] = `Please select an option for ${field}.`;
        }
      }
    );
  
    console.log('Validation Errors:', newErrors); // Логи для проверки ошибок
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Если есть ошибки, валидация не пройдёт
  };  

  const handleSubmit = () => {
    console.log('Button clicked'); // Проверка клика
    if (validate()) {
      console.log('Validation passed'); // Валидация пройдена
      setResult('Lung Cancer Probability: 80%'); // Устанавливаем результат
    } else {
      console.log('Validation failed'); // Валидация провалена
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
          {/* Поля для имени, фамилии и номера телефона */}
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

          {/* Пол для ввода пола */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel style={{ color: '#FFFFFF' }}>Gender</InputLabel>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                sx={{ color: '#FFFFFF' }}
              >
                <MenuItem value="M" style={{ color: '#132D46' }}>Male</MenuItem>
                <MenuItem value="F" style={{ color: '#132D46' }}>Female</MenuItem>
              </Select>
              {errors.gender && <FormHelperText error>{errors.gender}</FormHelperText>}
            </FormControl>
          </Grid>

          {/* Поле для возраста */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel style={{ color: '#FFFFFF' }}>Age</InputLabel>
              <Select
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                sx={{ 
                  color: '#FFFFFF',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#00000',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#FFFFFF',
                  },  
                }}
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

          {/* Поле для выбора Smoking */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel style={{ color: '#FFFFFF' }}>Smoking Yes=1, No=0</InputLabel>
              <Select
                name="smoking"
                value={formData.smoking}
                onChange={handleInputChange}
                sx={{ color: '#FFFFFF' }}
              >
                <MenuItem value="0" style={{ color: '#132D46' }}>0</MenuItem>
                <MenuItem value="1" style={{ color: '#132D46' }}>1</MenuItem>
              </Select>
              {errors.smoking && <FormHelperText error>{errors.smoking}</FormHelperText>}
            </FormControl>
          </Grid>

          {[
            { name: 'anxiety', label: 'Anxiety Yes=1, No = 0' },
            { name: 'peerPressure', label: 'Peer Pressure Yes=1, No = 0' },
            { name: 'chronicDisease', label: 'Chronic Disease Yes=1, No = 0' },
            { name: 'fatigue', label: 'Fatigue Yes=1, No = 0' },
            { name: 'allergy', label: 'Allergy Yes=1, No = 0' },
            { name: 'wheezing', label: 'Wheezing Yes=1, No = 0' },
            { name: 'alcohol', label: 'Alcohol Yes=1, No = 0' },
            { name: 'coughing', label: 'Coughing Yes=1, No = 0' },
            { name: 'shortnessOfBreath', label: 'Shortness of Breath Yes=1, No = 0' },
            { name: 'swallowingDifficulty', label: 'Swallowing Difficulty Yes=1, No = 0' },
            { name: 'chestPain', label: 'Chest Pain Yes=1, No = 0 ' },
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
                  <MenuItem value="0" style={{ color: '#132D46' }} >0</MenuItem>
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
