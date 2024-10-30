import React from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box 
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Explore,
  LocationCity,
  Landscape,
  AccountBalance,
  Hotel,
  Place
} from '@mui/icons-material';

function HomePage() {
  const sections = [
    {
      title: 'Explore Morocco',
      description: 'Discover the beauty and diversity of Morocco',
      icon: <Explore sx={{ fontSize: 40 }} />,
      path: '/explore'
    },
    {
      title: 'Regions',
      description: 'Explore different regions of Morocco',
      icon: <Landscape sx={{ fontSize: 40 }} />,
      path: '/regions'
    },
    {
      title: 'Cities',
      description: 'Visit Morocco\'s historic cities',
      icon: <LocationCity sx={{ fontSize: 40 }} />,
      path: '/cities'
    },
    {
      title: 'Accommodations',
      description: 'Find the perfect place to stay',
      icon: <Hotel sx={{ fontSize: 40 }} />,
      path: '/accommodations'
    },
    {
      title: 'Monuments',
      description: 'Discover historical monuments',
      icon: <AccountBalance sx={{ fontSize: 40 }} />,
      path: '/monuments'
    },
    {
      title: 'Tourist Sites',
      description: 'Visit amazing tourist attractions',
      icon: <Place sx={{ fontSize: 40 }} />,
      path: '/tourist-sites'
    }
    
    
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom color="primary">
          Welcome to Morocco
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          Explore the magic of Morocco's culture, history, and hospitality
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {sections.map((section) => (
          <Grid item xs={12} sm={6} md={4} key={section.title}>
            <Card 
              component={Link} 
              to={section.path}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 3,
                },
              }}
            >
              <CardContent sx={{ 
                flexGrow: 1, 
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2
              }}>
                <Box sx={{ 
                  color: 'primary.main',
                  mb: 2
                }}>
                  {section.icon}
                </Box>
                <Typography gutterBottom variant="h5" component="h2" color="primary">
                  {section.title}
                </Typography>
                <Typography color="text.secondary">
                  {section.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default HomePage;