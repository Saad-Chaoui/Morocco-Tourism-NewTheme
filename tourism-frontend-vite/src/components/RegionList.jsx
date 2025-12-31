import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Grid, Card, CardContent, Typography,
  Rating, Box, CircularProgress, CardActionArea
} from '@mui/material';
import { getAllRegions } from '../services/api';

function RegionList() {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await getAllRegions();
        // Check if response.data exists and is an array
        if (response && response.data && Array.isArray(response.data)) {
          setRegions(response.data);
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching regions:', error);
        setError('Failed to load regions');
      } finally {
        setLoading(false);
      }
    };
    fetchRegions();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, flexDirection: 'column', pb: { xs: '65px', sm: 0 } }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        color="primary"
        sx={{
          mb: 4,
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        Explore Morocco's Regions
      </Typography>
      <Grid container spacing={3}>
        {Array.isArray(regions) && regions.map((region) => (
          <Grid item xs={12} sm={6} md={4} key={region.id}>
            <Card
              elevation={3}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 8px 20px rgba(196,155,59,0.3)',
                },
                borderRadius: 2,
                overflow: 'hidden'
              }}
            >
              <CardActionArea
                component={Link}
                to={`/region/${region.id}`}
                sx={{ height: '100%', p: 2 }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{
                      color: 'primary.main',
                      fontWeight: 600,
                      mb: 2
                    }}
                  >
                    {region.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    paragraph
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      mb: 2
                    }}
                  >
                    {region.description}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mt: 'auto'
                    }}
                  >
                    <Rating
                      value={Number(region.tourism_rating)}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ ml: 1 }}
                    >
                      ({region.tourism_rating})
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default RegionList;