import React from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography,
  Box,
  useTheme,
  useMediaQuery,
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
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const MotionBox = motion(Box);
const MotionContainer = motion(Container);

function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const sections = [
    {
      title: 'Explore Morocco',
      description: 'Discover the beauty and diversity of Morocco',
      icon: <Explore sx={{ fontSize: 48 }} />,
      path: '/explore'
    },
    {
      title: 'Regions',
      description: 'Explore different regions of Morocco',
      icon: <Landscape sx={{ fontSize: 48 }} />,
      path: '/regions'
    },
    {
      title: 'Cities',
      description: 'Visit beautiful Moroccan cities',
      icon: <LocationCity sx={{ fontSize: 48 }} />,
      path: '/cities'
    },
    {
      title: 'Monuments',
      description: 'Discover historical monuments',
      icon: <AccountBalance sx={{ fontSize: 48 }} />,
      path: '/monuments'
    },
    {
      title: 'Tourist Sites',
      description: 'Explore amazing tourist attractions',
      icon: <Place sx={{ fontSize: 48 }} />,
      path: '/tourist-sites'
    },
    {
      title: 'Accommodations',
      description: 'Find the perfect place to stay',
      icon: <Hotel sx={{ fontSize: 48 }} />,
      path: '/accommodations'
    }
  ];

  const stats = [
    { value: 12, label: 'Regions', suffix: '+' },
    { value: 40, label: 'Cities', suffix: '+' },
    { value: 30, label: 'Monuments', suffix: '+' },
    { value: 30, label: 'Tourist Sites', suffix: '+' }
  ];

  return (
    <Box 
      sx={{ 
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        pb: { xs: '50px', sm: 0 }
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '47vh', sm: '45vh', md: '60vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: 'linear-gradient(45deg, #005B5C 30%, #337C7D 90%)',
          borderRadius: { xs: '0 0 15px 15px', sm: '0 0 25px 25px', md: '0 0 50px 50px' },
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 2, md: 4 },
            p: { xs: 2, sm: 3, md: 6 },
            zIndex: 2
          }}
        >
          {/* Left side - Text Content */}
          <MotionBox
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              color: 'white',
              zIndex: 2,
              textAlign: { xs: 'center', md: 'left' },
              width: '100%'
            }}
          >
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                fontWeight: 800,
                mb: { xs: 1, md: 2 },
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              Discover Morocco
            </Typography>
            <Typography 
              variant="h5"
              sx={{ 
                mb: { xs: 2, md: 3 },
                maxWidth: '600px',
                lineHeight: 1.6,
                textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' }
              }}
            >
              From ancient medinas to stunning landscapes, experience the magic of Morocco's rich heritage and natural beauty.
            </Typography>

            {/* Statistics Section */}
            <Box 
              sx={{ 
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                gap: { xs: 1, sm: 2 },
                mt: { xs: 2, md: 4 },
                width: '100%',
                maxWidth: { xs: '340px', sm: 'none' },
                mx: { xs: 'auto', md: 0 }
              }}
            >
              {stats.map((stat, index) => (
                <MotionBox
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.2,
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 2,
                    p: 2,
                    textAlign: 'center',
                    border: '1px solid rgba(255,255,255,0.2)',
                    transition: 'all 0.3s ease',
                    width: '100%',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.2)',
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontWeight: 700,
                      color: 'secondary.main',
                      mb: 1,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                    }}
                  >
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      separator=","
                      suffix={stat.suffix}
                    />
                  </Typography>
                  <Typography 
                    variant="body1"
                    sx={{ 
                      fontWeight: 500,
                      color: 'white',
                      opacity: 0.9
                    }}
                  >
                    {stat.label}
                  </Typography>
                </MotionBox>
              ))}
            </Box>
          </MotionBox>

          {/* Right side - Image Grid - Now hidden on xs and sm breakpoints */}
          <MotionBox
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            sx={{
              display: { xs: 'none', md: 'grid' },
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 2,
              position: 'relative'
            }}
          >
            {[
              '/images/morocco-1.jpg',
              '/images/morocco-2.jpg',
              '/images/morocco-3.jpg',
              '/images/morocco-4.jpg'
            ].map((image, index) => (
              <MotionBox
                key={image}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  height: '160px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transform: index % 2 ? 'translateY(20px)' : 'translateY(0)'
                }}
              >
                <img
                  src={image}
                  alt={`Morocco ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </MotionBox>
            ))}
          </MotionBox>
        </Box>

        {/* Decorative background elements */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            background: 'url(/images/pattern.avif) repeat',
            zIndex: 1
          }}
        />
      </Box>

      {/* Categories Section */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          py: { xs: 4, md: 8 },
          flex: 1
        }}
      >
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {sections.map((section, index) => (
            <Grid item xs={12} sm={6} md={4} key={section.title}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  component={Link}
                  to={section.path}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    borderRadius: 4,
                    overflow: 'hidden',
                    background: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 48px rgba(0,0,0,0.2)',
                      '& .icon': {
                        transform: 'scale(1.1) rotate(5deg)',
                        color: 'secondary.main'
                      }
                    }
                  }}
                >
                  <CardContent sx={{ 
                    flexGrow: 1, 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 4
                  }}>
                    <Box 
                      className="icon"
                      sx={{ 
                        color: 'primary.main',
                        mb: 3,
                        transition: 'all 0.3s ease',
                        p: 2,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0,91,92,0.1)'
                      }}
                    >
                      {section.icon}
                    </Box>
                    <Typography 
                      gutterBottom 
                      variant="h5" 
                      component="h2" 
                      color="primary.main"
                      sx={{ 
                        fontWeight: 600,
                        mb: 2
                      }}
                    >
                      {section.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {section.description}
                    </Typography>
                  </CardContent>
                </Card>
              </MotionBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default HomePage;