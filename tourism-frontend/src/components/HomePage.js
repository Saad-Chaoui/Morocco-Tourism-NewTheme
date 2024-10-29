import React from 'react';
import { Typography, Button, Box, Grid, Container, Fade, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { LocationCity, Landscape, BeachAccess, AccountBalance } from '@mui/icons-material';

function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const categories = [
    {
      title: 'Regions',
      icon: <Landscape sx={{ color: 'white' }} />,
      color: theme.palette.primary.main,
      link: '/regions',
      description: 'Explore Morocco\'s diverse regions'
    },
    {
      title: 'Cities',
      icon: <LocationCity sx={{ color: 'white' }} />,
      color: theme.palette.primary.main,
      link: '/cities',
      description: 'Discover historic Moroccan cities'
    },
    {
      title: 'Monuments',
      icon: <AccountBalance sx={{ color: 'white' }} />,
      color: theme.palette.primary.main,
      link: '/monuments',
      description: 'Visit magnificent monuments'
    },
    {
      title: 'Tourist Sites',
      icon: <BeachAccess sx={{ color: 'white' }} />,
      color: theme.palette.primary.main,
      link: '/tourist-sites',
      description: 'Experience amazing attractions'
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        minHeight: `calc(100vh - ${isMobile ? '0px' : '64px'})`, // Adjust for header height
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url("/morocco-background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', // Optional: creates a parallax effect
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        pt: isMobile ? 4 : 0, // Remove padding top on desktop
        pb: isMobile ? 4 : 8
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant={isMobile ? "h3" : "h2"}
          component="h1"
          gutterBottom
          align="center"
          color="primary"
          sx={{
            fontWeight: 'bold',
            mb: 3,
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          Discover Morocco
        </Typography>
        <Typography
          variant={isMobile ? "h6" : "h5"}
          align="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 6 }}
        >
          Your Gateway to Moroccan Wonders
        </Typography>
        <Grid container spacing={isMobile ? 3 : 4} sx={{ mt: 2 }}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={3} key={category.title}>
              <Fade in={true} timeout={1000} style={{ transitionDelay: `${index * 200}ms` }}>
                <Box
                  sx={{
                    bgcolor: 'white',
                    borderRadius: 2,
                    p: 3,
                    height: '100%',
                    textAlign: 'center',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: `0 8px 20px ${theme.palette.primary.main}40`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      color: 'white',
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      boxShadow: '0 4px 12px rgba(196,155,59,0.3)',
                      '& svg': {
                        fontSize: 40,
                      },
                    }}
                  >
                    {category.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      mb: 1
                    }}
                  >
                    {category.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {category.description}
                  </Typography>
                  <Button
                    component={Link}
                    to={category.link}
                    variant="outlined"
                    sx={{
                      mt: 'auto',
                      color: theme.palette.primary.main,
                      borderColor: theme.palette.primary.main,
                      '&:hover': {
                        bgcolor: theme.palette.primary.main,
                        color: 'white',
                        borderColor: theme.palette.primary.main,
                      },
                      px: 4,
                      py: 1,
                    }}
                  >
                    Explore
                  </Button>
                </Box>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default HomePage;