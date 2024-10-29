import React from 'react';
import { Box, Container, Typography, Link, Grid, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        py: 3,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                <img
                  src="/images/morocco-flag.png"
                  alt="Morocco Flag"
                  style={{
                    height: '23px',
                    width: 'auto',
                    borderRadius: '2px',
                    marginRight: '8px',
                    paddingTop: '6px'
                  }}
                />
                Morocco Tourism
              </Typography>
              <Typography variant="body2" sx={{ color: 'white' }}>
                Discover the beauty and culture of Morocco
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <IconButton sx={{ color: 'white' }}>
                <Facebook />
              </IconButton>
              <IconButton sx={{ color: 'white' }}>
                <Twitter />
              </IconButton>
              <IconButton sx={{ color: 'white' }}>
                <Instagram />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', sm: 'flex-end' },
              gap: 1
            }}>

              <Typography variant="body2" sx={{ color: 'white' }}>
                © {new Date().getFullYear()} NewDev MAROC
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Link href="#" color="inherit" underline="hover">
                  Privacy Policy
                </Link>
                <Link href="#" color="inherit" underline="hover">
                  Terms
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;