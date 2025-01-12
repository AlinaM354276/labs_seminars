import { Box } from '@mui/material';
import Banner from '../components/Banner';
import AboutUs from '../components/About'; // Импортируем AboutUs

const Home = () => {
  return (
    <Box>
      <Banner />
      <AboutUs /> {/* Добавляем компонент AboutUs */}
    </Box>
  );
};

export default Home;
