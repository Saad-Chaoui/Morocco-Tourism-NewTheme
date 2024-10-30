import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Rating,
  Divider,
  ImageList,
  ImageListItem,
  Skeleton,
  Button,
  IconButton,
  Dialog,
  DialogContent,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  LocationOn,
  Hotel,
  Pool,
  LocalParking,
  Wifi,
  Restaurant,
  AcUnit,
  Phone,
  Email,
  Language,
  ArrowBack,
  AttachMoney,
  Close as CloseIcon,
  NavigateBefore,
  NavigateNext
} from '@mui/icons-material';
import { getAccommodation } from '../services/api';
import MapView from './MapView';
import './AccommodationDetails.css';

function AccommodationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [accommodation, setAccommodation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchAccommodationDetails();
  }, [id]);

  const fetchAccommodationDetails = async () => {
    try {
      setLoading(true);
      const data = await getAccommodation(id);
      setAccommodation(data);
      if (data.media?.length > 0) {
        setSelectedImage(data.media[0].url);
      }
    } catch (err) {
      setError('Failed to fetch accommodation details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderAmenities = (details) => {
    const amenities = [];
    if (details?.has_pool) amenities.push({ icon: <Pool />, label: 'Swimming Pool' });
    if (details?.has_parking) amenities.push({ icon: <LocalParking />, label: 'Parking' });
    if (details?.has_wifi) amenities.push({ icon: <Wifi />, label: 'WiFi' });
    if (details?.has_restaurant) amenities.push({ icon: <Restaurant />, label: 'Restaurant' });
    if (details?.has_ac) amenities.push({ icon: <AcUnit />, label: 'Air Conditioning' });
    
    return amenities;
  };

  const createMapMarkers = (accommodation) => {
    if (!accommodation || !accommodation.latitude || !accommodation.longitude) {
      return [];
    }

    return [{
      id: accommodation.id,
      latitude: parseFloat(accommodation.latitude),
      longitude: parseFloat(accommodation.longitude),
      name: accommodation.name,
      description: `${accommodation.type} in ${accommodation.city_name}`
    }];
  };

  const renderPriceRange = (priceRange) => {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Typography variant="body2" color="text.secondary">Price Range:</Typography>
        {[1, 2, 3].map((index) => (
          <AttachMoney 
            key={index}
            sx={{ 
              color: 'primary.main',
              opacity: priceRange?.length >= index ? 1 : 0.3
            }} 
          />
        ))}
      </Box>
    );
  };

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    setOpenImageDialog(true);
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    if (accommodation?.media) {
      setCurrentImageIndex((prev) => 
        prev === accommodation.media.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    if (accommodation?.media) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? accommodation.media.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={400} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  if (!accommodation) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <IconButton 
          onClick={() => navigate(-1)} 
          sx={{ mr: 2, color: 'primary.main' }}
          aria-label="go back"
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" component="h1" color="primary">
          {accommodation?.name || <Skeleton width={300} />}
        </Typography>
      </Box>

      {accommodation?.media && accommodation.media.length > 0 && (
        <Box sx={{ mb: 3, position: 'relative' }}>
          <Box 
            className="main-image-container"
            sx={{
              height: { xs: '250px', sm: '400px' },
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 2,
            }}
          >
            <img
              src={accommodation.media[currentImageIndex].url}
              alt={`${accommodation.name} - ${currentImageIndex + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            
            {accommodation.media.length > 1 && (
              <>
                <IconButton
                  onClick={handlePrevImage}
                  className="nav-button prev"
                  sx={{
                    position: 'absolute',
                    left: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'white',
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    '&:hover': { 
                      bgcolor: 'rgba(0, 0, 0, 0.7)',
                    },
                    zIndex: 2
                  }}
                >
                  <NavigateBefore />
                </IconButton>
                <IconButton
                  onClick={handleNextImage}
                  className="nav-button next"
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'white',
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    '&:hover': { 
                      bgcolor: 'rgba(0, 0, 0, 0.7)',
                    },
                    zIndex: 2
                  }}
                >
                  <NavigateNext />
                </IconButton>
              </>
            )}

            <Box
              className="image-counter"
              sx={{
                position: 'absolute',
                bottom: 16,
                right: 16,
                bgcolor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                px: 2,
                py: 1,
                borderRadius: 1,
                fontSize: '0.875rem',
                zIndex: 2
              }}
            >
              {currentImageIndex + 1} / {accommodation.media.length}
            </Box>
          </Box>

          {accommodation.media.length > 1 && (
            <ImageList
              sx={{
                mt: 1,
                display: { xs: 'none', sm: 'grid' },
                gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr)) !important',
                gap: '8px !important'
              }}
              rowHeight={80}
              gap={8}
            >
              {accommodation.media.map((image, index) => (
                <ImageListItem 
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  sx={{ 
                    cursor: 'pointer',
                    opacity: currentImageIndex === index ? 1 : 0.7,
                    transition: 'opacity 0.3s ease',
                    '&:hover': {
                      opacity: 1
                    }
                  }}
                >
                  <img
                    src={image.url}
                    alt={`${accommodation.name} - ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </Box>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Rating value={accommodation?.rating || 0} precision={0.5} readOnly />
                  {renderPriceRange(accommodation?.price_range)}
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Hotel color="primary" />
                    <Typography>{accommodation?.type}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOn color="primary" />
                    <Typography>
                      {accommodation?.city_name}, {accommodation?.region_name}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Typography variant="body1" paragraph>
                {accommodation.description}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom color="primary">
                Amenities
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {renderAmenities(accommodation.details).map((amenity, index) => (
                  <Grid item xs={6} sm={4} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {amenity.icon}
                      <Typography variant="body2">{amenity.label}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom color="primary">
                Contact Information
              </Typography>
              <Grid container spacing={2}>
                {accommodation.phone && (
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Phone color="primary" />
                      <Typography variant="body2">{accommodation.phone}</Typography>
                    </Box>
                  </Grid>
                )}
                {accommodation.email && (
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Email color="primary" />
                      <Typography variant="body2">{accommodation.email}</Typography>
                    </Box>
                  </Grid>
                )}
                {accommodation.website && (
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Language color="primary" />
                      <Button
                        href={accommodation.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                      >
                        Visit Website
                      </Button>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Location
              </Typography>
              {accommodation?.latitude && accommodation?.longitude ? (
                <Box sx={{ height: 300, mb: 2 }}>
                  <MapView
                    center={[parseFloat(accommodation.latitude), parseFloat(accommodation.longitude)]}
                    zoom={15}
                    accommodations={[{
                      id: accommodation.id,
                      name: accommodation.name,
                      type: accommodation.type,
                      city_name: accommodation.city_name,
                      rating: accommodation.rating,
                      latitude: parseFloat(accommodation.latitude),
                      longitude: parseFloat(accommodation.longitude)
                    }]}
                  />
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Location information not available
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AccommodationDetails;