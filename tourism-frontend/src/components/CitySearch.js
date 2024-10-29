import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Container } from '@mui/material';
import { searchCity } from '../services/api';

function CitySearch() {
  const { cityName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const searchAndNavigate = async () => {
      try {
        const city = await searchCity(decodeURIComponent(cityName));
        if (city && city.id) {
          navigate(`/city/${city.id}`);
        } else {
          navigate('/not-found');
        }
      } catch (error) {
        console.error('Error searching for city:', error);
        navigate('/not-found');
      }
    };

    searchAndNavigate();
  }, [cityName, navigate]);

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
      <CircularProgress />
    </Container>
  );
}

export default CitySearch;