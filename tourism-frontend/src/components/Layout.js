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
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {!isMobile && <Header />}
      <Box component="main" sx={{ 
        flexGrow: 1,
        pt: isMobile ? 0 : 8,
        pb: isMobile ? 7 : 3
      }}>
        {children}
      </Box>
      <ScrollToTop />
      {isMobile ? <MobileNavigation /> : <Footer />}
    </Box>
  );
}

export default Layout;
