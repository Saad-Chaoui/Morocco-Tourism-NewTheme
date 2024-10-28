import React, { useState } from 'react';
import {
  Box,
  Modal,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

function ImageGallery({ images }) {
  const [open, setOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpen = (index) => {
    setCurrentImageIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePrevious = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 2,
          mb: 3,
        }}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            onClick={() => handleOpen(index)}
            sx={{
              position: 'relative',
              paddingTop: '66.67%', // 3:2 aspect ratio
              cursor: 'pointer',
              borderRadius: 2,
              overflow: 'hidden',
              '&:hover': {
                '& img': {
                  transform: 'scale(1.05)',
                },
              },
            }}
          >
            <img
              src={image}
              alt={`Gallery image ${index + 1}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease',
              }}
            />
          </Box>
        ))}
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(0, 0, 0, 0.9)',
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0,91,92,0.9)',
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh',
            outline: 'none',
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: -40,
              top: -40,
              color: 'white',
            }}
          >
            <CloseIcon />
          </IconButton>

          <img
            src={images[currentImageIndex]}
            alt={`Gallery image ${currentImageIndex + 1}`}
            style={{
              maxWidth: '100%',
              maxHeight: '90vh',
              objectFit: 'contain',
            }}
          />

          {images.length > 1 && (
            <>
              <IconButton
                onClick={handlePrevious}
                sx={{
                  position: 'absolute',
                  left: isMobile ? 8 : -56,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'white',
                  backgroundColor: 'rgba(0,91,92,0.6)',
                  '&:hover': {
                    backgroundColor: 'rgba(0,91,92,0.8)',
                  },
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                onClick={handleNext}
                sx={{
                  position: 'absolute',
                  right: isMobile ? 8 : -56,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'white',
                  backgroundColor: 'rgba(0,91,92,0.6)',
                  '&:hover': {
                    backgroundColor: 'rgba(0,91,92,0.8)',
                  },
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default ImageGallery;
