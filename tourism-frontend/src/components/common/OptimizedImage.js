import React, { useState } from 'react';
import { Skeleton } from '@mui/material';

function OptimizedImage({ src, alt, width, height, ...props }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setError(true);
    setLoaded(true);
  };

  if (error) {
    return (
      <div 
        style={{ 
          width, 
          height, 
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <span>Image not available</span>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width, height }}>
      {!loaded && (
        <Skeleton 
          variant="rectangular" 
          width={width} 
          height={height}
          animation="wave"
        />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          display: loaded ? 'block' : 'none',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          ...props.style
        }}
        {...props}
      />
    </div>
  );
}

export default OptimizedImage;