import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header>
        <motion.img
          src="/logo.png"
          alt="Logo"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 10 }}
          style={{ width: 40, height: 40, marginRight: 10 }}
        />
      </Header>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

export default Layout;
