import React from 'react';
import { motion } from 'framer-motion';

const ThreeDTransition = ({ isVisible }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#2196f3',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 style={{ color: 'white', fontSize: '3rem' }}>Welcome to Tourism Explorer</h1>
      </motion.div>
    </motion.div>
  );
};

export default ThreeDTransition;
