import React from 'react';
import { Box, ImageList, ImageListItem, useMediaQuery, useTheme } from '@mui/material';

function ImageGallery({ images }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const optimizeImageUrl = (url) => {
    return `/api/images/optimize?url=${encodeURIComponent(url)}&width=${isMobile ? 400 : 800}`;
  };

  return (
    <Box sx={{ width: '100%', overflowX: 'hidden' }}>
      <ImageList variant="masonry" cols={isMobile ? 2 : 3} gap={8}>
        {images.map((img, index) => (
          <ImageListItem key={index}>
            <img
              src={optimizeImageUrl(img)}
              alt={`Gallery image ${index + 1}`}
              loading="lazy"
              style={{ borderRadius: 8 }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

export default ImageGallery;
