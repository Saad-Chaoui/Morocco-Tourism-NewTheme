import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
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
  Link as MuiLink
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  LocationOn as LocationIcon,
  AccessTime as AccessTimeIcon,
  AttachMoney as AttachMoneyIcon,
  Category as CategoryIcon,
  DirectionsWalk as AccessibilityIcon,
  CheckCircle as OpenIcon,
  Cancel as ClosedIcon,
  Warning as MaintenanceIcon
} from '@mui/icons-material';
import { getTouristSite } from '../services/api';
import './MonumentDetails.css';

// Fix for the default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function TouristSiteDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const parseNearestCities = (citiesString) => {
    if (!citiesString) return [];
    try {
      // If it's already an array, return it directly
      if (Array.isArray(citiesString)) {
        return citiesString;
      }
      // Parse the string and ensure we get an array of strings
      return JSON.parse(citiesString);
    } catch (e) {
      console.error('Error parsing nearest cities:', e);
      return [];
    }
  };

  useEffect(() => {
    const fetchSite = async () => {
      try {
        setLoading(true);
        const data = await getTouristSite(id);

        // Parse nearest_cities before setting the state
        data.nearest_cities = parseNearestCities(data.nearest_cities);
        setSite(data);
      } catch (error) {
        console.error('Error fetching tourist site:', error);
        setError('Failed to load tourist site details');
      } finally {
        setLoading(false);
      }
    };

    fetchSite();
  }, [id]);

  const handleImageClick = () => {
    if (site.images && site.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % site.images.length);
    }
  };

  const getEmbedUrl = (videoUrl) => {
    try {
      // Handle YouTube URLs (including Shorts)
      if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
        let videoId;

        if (videoUrl.includes('/shorts/')) {
          videoId = videoUrl.split('/shorts/')[1].split('?')[0];
        }
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
        let videoId;

        if (videoUrl.includes('/video/')) {
          videoId = videoUrl.split('/video/')[1].split('?')[0];
        }
        else if (videoUrl.includes('vm.tiktok.com') || videoUrl.includes('vt.tiktok.com')) {
          videoId = videoUrl.split('/')[3].split('?')[0];
        }

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

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;
  if (error) return <Container maxWidth="lg" sx={{ py: 4 }}><Alert severity="error">{error}</Alert></Container>;
  if (!site) return <Container maxWidth="lg" sx={{ py: 4 }}><Alert severity="info">Tourist site not found</Alert></Container>;

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
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
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom color="primary.main" paddingBottom={1}>
            {site.name}
          </Typography>

          {site.images && site.images.length > 0 && (
            <Box
              sx={{
                mb: 3,
                cursor: site.images.length > 1 ? 'pointer' : 'default',
                position: 'relative'
              }}
              onClick={handleImageClick}
            >
              <img
                src={site.images[currentImageIndex]}
                alt={site.name}
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
              {site.images.length > 1 && (
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
                  {currentImageIndex + 1}/{site.images.length}
                </Typography>
              )}
            </Box>
          )}

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary.main">
                About
              </Typography>
              <Typography variant="body1" paragraph>
                {site.description}
              </Typography>
            </CardContent>
          </Card>

          {site.video && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary.main">
                  Video Tour
                </Typography>
                <Box sx={{
                  position: 'relative',
                  paddingBottom: site.video.includes('tiktok.com') ? '177.77%' : '56.25%',
                  height: 0,
                  overflow: 'hidden',
                  marginTop: 2,
                  borderRadius: 1,
                  maxWidth: site.video.includes('tiktok.com') ? '325px' : '100%',
                  margin: site.video.includes('tiktok.com') ? '0 auto' : '0',
                }}>
                  <iframe
                    src={getEmbedUrl(site.video)}
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
                    {...(site.video.includes('tiktok.com') ? {
                      'allow-scripts': true,
                      'allow-same-origin': true,
                    } : {})}
                  />
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary.main">
                Visit Information
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {site.nearest_cities && site.nearest_cities.length > 0 && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationIcon color="primary" />
                    <Typography component="span">
                      Near: {site.nearest_cities.map((cityName, index) => (
                        <React.Fragment key={index}>
                          {index > 0 && ', '}
                          <MuiLink
                            component={Link}
                            to={`/city/search/${encodeURIComponent(cityName)}`}
                            sx={{
                              color: 'primary.main',
                              textDecoration: 'none',
                              '&:hover': {
                                textDecoration: 'underline'
                              }
                            }}
                          >
                            {cityName}
                          </MuiLink>
                        </React.Fragment>
                      ))}
                    </Typography>
                  </Box>
                )}

                {site.type && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CategoryIcon color="primary" />
                    <Typography>
                      Type: {site.type}
                    </Typography>
                  </Box>
                )}

                {site.opening_hours && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTimeIcon color="primary" />
                    <Typography>
                      {site.opening_hours}
                    </Typography>
                  </Box>
                )}

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AttachMoneyIcon color="primary" />
                  <Typography>
                    Entry Fee: {site.entry_fee === 0 ? 'Free' : `${site.entry_fee} MAD`}
                  </Typography>
                </Box>

                {site.accessibility && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessibilityIcon color="primary" />
                    <Typography>
                      {site.accessibility}
                    </Typography>
                  </Box>
                )}

                {site.status && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getStatusIcon(site.status)}
                    <Typography>
                      Status: {site.status.replace('_', ' ')}
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>

          {site.latitude && site.longitude && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary.main">
                  Location
                </Typography>
                <Box sx={{ height: '300px', width: '100%', borderRadius: 1, overflow: 'hidden' }}>
                  <MapContainer
                    center={[site.latitude, site.longitude]}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[site.latitude, site.longitude]}>
                      <Popup>
                        {site.name}
                      </Popup>
                    </Marker>
                  </MapContainer>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default TouristSiteDetails;