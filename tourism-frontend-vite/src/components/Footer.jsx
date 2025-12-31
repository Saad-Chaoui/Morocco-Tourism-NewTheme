import React from 'react';
import { Box, Container, Typography, Link, Grid, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(45deg, #005B5C 30%, #337C7D 90%)',
        color: 'white',
        py: 3,
        mt: 'auto',
        position: 'relative',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Left Section - Logo and Slogan */}
          <Grid item xs={12} md={5}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: 1
            }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                mb: 1
              }}>
                <img
                  src="/images/morocco-flag.png"
                  alt="Morocco Flag"
                  style={{
                    height: '25px',
                    width: 'auto',
                    borderRadius: '3px',
                    marginRight: '10px'
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Morocco Tourism
                </Typography>
              </Box>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: 'rgba(255,255,255,0.9)',
                  fontStyle: 'italic',
                  borderLeft: '3px solid #FF6B6B',
                  pl: 2,
                  maxWidth: '300px'
                }}
              >
                Where ancient traditions embrace modern adventures
              </Typography>
            </Box>
          </Grid>

          {/* Middle Section - Social Links */}
          <Grid item xs={12} md={3}>
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-start' },
              gap: 2
            }}>
              <Typography variant="subtitle2" sx={{ opacity: 0.9, letterSpacing: 1 }}>
                CONNECT WITH US
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                gap: 1.5
              }}>
                {[Facebook, Twitter, Instagram, LinkedIn].map((Icon, index) => (
                  <IconButton 
                    key={index}
                    size="small"
                    sx={{ 
                      color: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.2)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Icon fontSize="small" />
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Right Section - Copyright and Links */}
          <Grid item xs={12} md={4}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-end' },
              gap: 2
            }}>
              <Box sx={{ 
                display: 'flex', 
                gap: 3,
                '& a': {
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    width: '0',
                    height: '2px',
                    bottom: '-4px',
                    left: '0',
                    backgroundColor: '#FF6B6B',
                    transition: 'width 0.2s ease'
                  },
                  '&:hover:after': {
                    width: '100%'
                  }
                }
              }}>
                <Link href="#">Privacy</Link>
                <Link href="#">Terms</Link>
                <Link href="#">Contact</Link>
              </Box>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'rgba(255,255,255,0.9)',
                  letterSpacing: 0.5
                }}
              >
                © {new Date().getFullYear()} NewDev MAROC. All rights reserved.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;