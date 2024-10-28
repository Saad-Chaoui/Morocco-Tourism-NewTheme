import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Monument Not Found
      </Typography>
      <Typography variant="body1" paragraph>
        The monument you're looking for doesn't exist or has been removed.
      </Typography>
      <Button component={Link} to="/monuments" variant="contained" color="primary">
        Back to Monuments List
      </Button>
    </Container>
  );
}

export default NotFound;

