import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography, Grid, Card, TextField, Box, CircularProgress, Rating,
  useTheme, useMediaQuery, Pagination, Container
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationCity as LocationCityIcon,
  People as PeopleIcon
} from '@mui/icons-material';
import { getCities } from '../services/api';

function CityList() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const data = await getCities(page, itemsPerPage, searchTerm);
        setCities(data.cities);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cities:', error);
        setLoading(false);
      }
    };
    fetchCities();
  }, [page, searchTerm]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };


  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          Explore Cities
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search cities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
            sx: { borderRadius: 2 }
          }}
          sx={{ mb: 3 }}
        />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {cities.map((city) => (
                <Grid item xs={12} sm={6} md={4} key={city.id}>
                  <Card
                    component={Link}
                    to={`/city/${city.id}`}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 20px rgba(0,91,92,0.12)',
                      },
                      border: '1px solid rgba(0,91,92,0.12)',
                      borderRadius: 3,
                      overflow: 'hidden',
                    }}
                  >
                    <Box sx={{ p: 2 }}>
                      <Typography variant="h6" color="primary.main" gutterBottom>
                        {city.name}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <LocationCityIcon sx={{ color: 'primary.main' }} fontSize="small" />
                        <Typography variant="body2" color="text.secondary">
                          {city.region_name}
                        </Typography>
                      </Box>

                      {city.population && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <PeopleIcon sx={{ color: 'primary.main' }} fontSize="small" />
                          <Typography variant="body2" color="text.secondary">
                            {city.population.toLocaleString()} inhabitants
                          </Typography>
                        </Box>
                      )}

                      {city.tourism_rating && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Rating
                            value={city.tourism_rating}
                            readOnly
                            size="small"
                            precision={0.5}
                            sx={{ color: 'accent.main' }}
                          />
                        </Box>
                      )}
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChangePage}
                color="primary"
                size={isMobile ? 'small' : 'medium'}
              />
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}

export default CityList;