import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Header from './Header';
import MobileNavigation from './MobileNavigation';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

function Layout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      bgcolor: 'background.default'
    }}>
      {!isMobile && <Header />}
      <Box 
        component="main" 
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {children}
      </Box>
      <ScrollToTop />
      {isMobile ? <MobileNavigation /> : <Footer />}
    </Box>
  );
}

export default Layout;