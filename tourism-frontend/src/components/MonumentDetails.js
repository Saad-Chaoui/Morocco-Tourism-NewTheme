import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  IconButton,
  useTheme,
  Link as MuiLink,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  LocationOn as LocationIcon,
  AccessTime as AccessTimeIcon,
  AttachMoney as AttachMoneyIcon,
  History as HistoryIcon,
  CalendarMonth as CalendarIcon,
  CheckCircle as OpenIcon,
  Cancel as ClosedIcon,
  Warning as MaintenanceIcon,
} from '@mui/icons-material';
import { getMonument } from '../services/api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MonumentDetails.css';

// Fix for the default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function MonumentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [monument, setMonument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchMonument = async () => {
      try {
        setLoading(true);
        const data = await getMonument(id);
        setMonument(data);
      } catch (error) {
        console.error('Error fetching monument:', error);
        setError('Failed to load monument details');
      } finally {
        setLoading(false);
      }
    };

    fetchMonument();
  }, [id]);

  const handleImageClick = () => {
    if (monument.images && monument.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % monument.images.length);
    }
  };

  const getEmbedUrl = (videoUrl) => {
    try {
      // Handle YouTube URLs (including Shorts)
      if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
        let videoId;

        // Handle YouTube Shorts
        if (videoUrl.includes('/shorts/')) {
          videoId = videoUrl.split('/shorts/')[1].split('?')[0];
        }
        // Handle regular YouTube URLs
        else if (videoUrl.includes('youtu.be')) {
          videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
        }
        else {
          videoId = videoUrl.split('v=')[1].split('&')[0];
        }

        return `https://www.youtube.com/embed/${videoId}`;
      }

      // Handle TikTok URLs
      if (videoUrl.includes('tiktok.com')) {
        // Extract video ID from TikTok URL
        let videoId;

        // Handle TikTok web URLs
        if (videoUrl.includes('/video/')) {
          videoId = videoUrl.split('/video/')[1].split('?')[0];
        }
        // Handle shortened TikTok URLs
        else if (videoUrl.includes('vm.tiktok.com') || videoUrl.includes('vt.tiktok.com')) {
          videoId = videoUrl.split('/')[3].split('?')[0];
        }

        // Return TikTok embed URL
        return `https://www.tiktok.com/embed/v2/${videoId}`;
      }

      return videoUrl;
    } catch (error) {
      console.error('Error parsing video URL:', error);
      return null;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open':
        return <OpenIcon sx={{ color: 'success.main' }} />;
      case 'closed':
        return <ClosedIcon sx={{ color: 'error.main' }} />;
      case 'under_maintenance':
        return <MaintenanceIcon sx={{ color: 'warning.main' }} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!monument) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="info">Monument not found</Alert>
      </Container>
    );
  }

  // Map Section Component
  const MapSection = ({ latitude, longitude, name }) => {
    if (!latitude || !longitude) return null;

    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary.main">
            Location
          </Typography>
          <Box sx={{ height: '300px', width: '100%', borderRadius: 1, overflow: 'hidden' }}>
            <MapContainer
              center={[latitude, longitude]}
              zoom={13}
              style={{ height: '100%', width: '100%', borderRadius: '8px' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[latitude, longitude]}>
                <Popup>
                  {name}
                </Popup>
              </Marker>
            </MapContainer>
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 2,
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        p: 2,
        borderRadius: 1
      }}>
        <IconButton color="inherit" onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6">Back to Monuments</Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          {/* Title */}
          <Typography variant="h4" gutterBottom color="primary.main" paddingBottom={1}>
            {monument.name}
          </Typography>

          {/* Main Image */}
          {monument.images && monument.images.length > 0 && (
            <Box
              sx={{
                mb: 3,
                cursor: monument.images.length > 1 ? 'pointer' : 'default',
                position: 'relative'
              }}
              onClick={handleImageClick}
            >
              <img
                src={monument.images[currentImageIndex]}
                alt={monument.name}
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
              {monument.images.length > 1 && (
                <Typography
                  sx={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    bgcolor: 'rgba(0,0,0,0.6)',
                    color: 'white',
                    px: 1,
                    borderRadius: 1,
                  }}
                >
                  {currentImageIndex + 1}/{monument.images.length}
                </Typography>
              )}
            </Box>
          )}

          {/* Description */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary.main">
                About
              </Typography>
              <Typography variant="body1" paragraph>
                {monument.description}
              </Typography>
              {monument.historical_significance && (
                <Typography variant="body1">
                  <HistoryIcon sx={{ mr: 1, verticalAlign: 'middle' }} color="primary" />
                  {monument.historical_significance}
                </Typography>
              )}
            </CardContent>
          </Card>

          {/* Video */}
          {monument.video && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary.main">
                  Video Tour
                </Typography>
                <Box sx={{
                  position: 'relative',
                  paddingBottom: monument.video.includes('tiktok.com') ? '177.77%' : '56.25%', // Adjust aspect ratio for TikTok
                  height: 0,
                  overflow: 'hidden',
                  marginTop: 2,
                  borderRadius: 1,
                  maxWidth: monument.video.includes('tiktok.com') ? '325px' : '100%', // Adjust width for TikTok
                  margin: monument.video.includes('tiktok.com') ? '0 auto' : '0', // Center TikTok videos
                }}>
                  <iframe
                    src={getEmbedUrl(monument.video)}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      borderRadius: '8px'
                    }}
                    title="Video tour"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    {...(monument.video.includes('tiktok.com') ? {
                      'allow-scripts': true,
                      'allow-same-origin': true,
                    } : {})}
                  />
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={4}>
          {/* Visit Information */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary.main">
                Visit Information
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationIcon color="primary" />
                  <Typography>
                    <MuiLink
                      component={Link}
                      to={`/city/${monument.city_id}`}
                      sx={{
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      {monument.city_name}
                    </MuiLink>
                    , {monument.region_name}
                  </Typography>
                </Box>

                {monument.opening_hours && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTimeIcon color="primary" />
                    <Typography>
                      {monument.opening_hours}
                    </Typography>
                  </Box>
                )}

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AttachMoneyIcon color="primary" />
                  <Typography>
                    Entry Fee: {monument.entry_fee === 0 ? 'Free' : `${monument.entry_fee} MAD`}
                  </Typography>
                </Box>

                {monument.creation_date && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarIcon color="primary" />
                    <Typography>
                      Built in: {new Date(monument.creation_date).getFullYear()}
                    </Typography>
                  </Box>
                )}

                {monument.nearest_cities && Array.isArray(monument.nearest_cities) && monument.nearest_cities.length > 0 && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationIcon color="primary" />
                    <Typography component="span">
                      Near: {monument.nearest_cities.map((city, index) => {
                        // Handle both string and object formats
                        const cityName = typeof city === 'string' ? city : city.name;
                        return (
                          <React.Fragment key={index}>
                            {index > 0 && ', '}
                            <MuiLink
                              component={Link}
                              to={`/cities/search/${encodeURIComponent(cityName)}`}
                              sx={{
                                textDecoration: 'none',
                                '&:hover': {
                                  textDecoration: 'underline'
                                }
                              }}
                            >
                              {cityName}
                            </MuiLink>
                          </React.Fragment>
                        );
                      })}
                    </Typography>
                  </Box>
                )}

                {monument.status && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getStatusIcon(monument.status)}
                    <Typography>
                      Status: {monument.status.replace('_', ' ')}
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>

          {/* Map */}
          {monument && (
            <MapSection
              latitude={parseFloat(monument.latitude)}
              longitude={parseFloat(monument.longitude)}
              name={monument.name}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default MonumentDetails;