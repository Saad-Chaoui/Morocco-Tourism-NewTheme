import React, { Suspense } from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoadingFallback = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
    <CircularProgress />
  </Box>
);

function OptimizedRoute({ component: Component, ...props }) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Component {...props} />
    </Suspense>
  );
}

export default OptimizedRoute;
