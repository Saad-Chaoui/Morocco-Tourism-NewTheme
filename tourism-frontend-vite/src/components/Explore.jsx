import React, { useState, useEffect } from 'react';
import {
  Typography, Box, Container, Card, CardContent,
  FormControl, InputLabel, Select, MenuItem,
  useTheme, useMediaQuery, Button, Fade, Zoom,
  Paper, IconButton, Chip, Skeleton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getRegions, getCitiesByRegion, getMonumentsByRegion,
  getTouristSitesByRegion, getMonumentsByCity,
  getMonuments, getTouristSites
} from '../services/api';
import RegionMap from './RegionMap';
import ClearIcon from '@mui/icons-material/Clear';
import MapIcon from '@mui/icons-material/Map';
import ExploreIcon from '@mui/icons-material/Explore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FilterListIcon from '@mui/icons-material/FilterList';

function Explore() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [monuments, setMonuments] = useState([]);
  const [touristSites, setTouristSites] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showAllMonuments, setShowAllMonuments] = useState(false);
  const [showAllTouristSites, setShowAllTouristSites] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [mapMarkers, setMapMarkers] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 31.7917, lng: -7.0926 });
  const [mapZoom, setMapZoom] = useState(6);

  const ITEMS_TO_SHOW = isMobile ? 3 : 4;
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Fetch regions on component mount
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await getRegions();
        setRegions(response.data || []);
      } catch (error) {
        console.error('Error fetching regions:', error);
        setRegions([]);
      }
    };
    fetchRegions();
  }, []);

  // Fetch cities when region is selected
  useEffect(() => {
    const fetchCities = async () => {
      if (selectedRegion && selectedRegion !== 'all') {
        try {
          const response = await getCitiesByRegion(selectedRegion);
          setCities(response || []);
        } catch (error) {
          console.error('Error fetching cities:', error);
          setCities([]);
        }
      } else {
        setCities([]);
      }
    };
    fetchCities();
  }, [selectedRegion]);

  const handleCardClick = (type, id) => {
    navigate(`/${type}/${id}`);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const renderSection = (title, items, showAll, setShowAll, type) => {
    if (!items || !Array.isArray(items) || items.length === 0) {
      return (
        <Box sx={{ my: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>{title}</Typography>
          <Typography color="text.secondary">
            No {title.toLowerCase()} found in this area.
          </Typography>
        </Box>
      );
    }

    const displayedItems = showAll ? items : items.slice(0, ITEMS_TO_SHOW);

    return (
      <Box sx={{ my: 3, flexDirection: 'column', pb: { xs: '35px', sm: 0 } }}>
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            color: 'primary.main',
            fontWeight: 'bold'
          }}
        >
          {title}
        </Typography>
        {displayedItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              onClick={() => handleCardClick(type, item.id)}
              sx={{
                mb: 2,
                cursor: 'pointer',
                height: 'auto',
                borderRadius: 3,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[4],
                  transition: 'all 0.3s ease-in-out'
                }
              }}
            >
              <Box sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
              }}>
                <Box
                  sx={{
                    width: isMobile ? '100%' : 200,
                    height: isMobile ? 200 : '100%',
                    position: 'relative'
                  }}
                >
                  <img
                    src={item.images && typeof item.images === 'string' 
                      ? JSON.parse(item.images)[0] 
                      : Array.isArray(item.images) 
                        ? item.images[0] 
                        : ''}
                    alt={item.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: isMobile ? '12px 12px 0 0' : '12px 0 0 12px'
                    }}
                  />
                </Box>
                <CardContent sx={{
                  flex: 1,
                  p: 2,
                }}>
                  <Typography variant="h6" gutterBottom>
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {truncateText(item.description, isMobile ? 100 : 150)}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{
                      mt: 'auto',
                      borderRadius: 2,
                      px: 3
                    }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Box>
            </Card>
          </motion.div>
        ))}
        {items.length > ITEMS_TO_SHOW && (
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setShowAll(!showAll);
              }}
              variant="outlined"
              size="small"
            >
              {showAll ? 'Show Less' : 'View More'}
            </Button>
          </Box>
        )}
      </Box>
    );
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        let monumentsData, sitesData;

        if (selectedRegion === 'all') {
          const monumentsResponse = await getMonuments();
          const sitesResponse = await getTouristSites();
          monumentsData = monumentsResponse.monuments || [];
          sitesData = sitesResponse.data || [];
        } else if (selectedCity === 'all') {
          monumentsData = await getMonumentsByRegion(selectedRegion);
          sitesData = await getTouristSitesByRegion(selectedRegion);
        } else {
          monumentsData = await getMonumentsByCity(selectedCity);
          sitesData = await getTouristSitesByRegion(selectedRegion);
        }

        const processedMonuments = Array.isArray(monumentsData) ? monumentsData : [];
        const processedSites = Array.isArray(sitesData) ? sitesData : [];

        setMonuments(processedMonuments);
        setTouristSites(processedSites);

        const markers = [
          ...processedMonuments.map(m => ({
            id: m.id,
            type: 'monument',
            position: { lat: parseFloat(m.latitude), lng: parseFloat(m.longitude) },
            title: m.name
          })),
          ...processedSites.map(s => ({
            id: s.id,
            type: 'tourist-site',
            position: { lat: parseFloat(s.latitude), lng: parseFloat(s.longitude) },
            title: s.name
          }))
        ].filter(marker => 
          !isNaN(marker.position.lat) && 
          !isNaN(marker.position.lng) &&
          marker.position.lat !== 0 &&
          marker.position.lng !== 0
        );

        setMapMarkers(markers);
        setShowResults(true);

        if (selectedCity !== 'all' && processedMonuments.length > 0) {
          const firstLocation = processedMonuments[0];
          setMapCenter({
            lat: parseFloat(firstLocation.latitude),
            lng: parseFloat(firstLocation.longitude)
          });
          setMapZoom(12);
        } else if (selectedRegion !== 'all' && processedMonuments.length > 0) {
          const firstLocation = processedMonuments[0];
          setMapCenter({
            lat: parseFloat(firstLocation.latitude),
            lng: parseFloat(firstLocation.longitude)
          });
          setMapZoom(8);
        } else {
          setMapCenter({ lat: 31.7917, lng: -7.0926 });
          setMapZoom(6);
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, [selectedRegion, selectedCity]);

  const handleMarkerClick = (type, id) => {
    setSelectedMarker({ type, id });
    setShowResults(true);
  };

  const clearMarkerSelection = () => {
    setSelectedMarker(null);
  };

  const filteredMonuments = selectedMarker && selectedMarker.type === 'monument'
    ? monuments.filter(m => m.id === selectedMarker.id)
    : monuments;

  const filteredTouristSites = selectedMarker && selectedMarker.type === 'tourist-site'
    ? touristSites.filter(s => s.id === selectedMarker.id)
    : touristSites;

  const renderResults = () => {
    if (!showResults) return null;

    return (
      <Box sx={{ mt: 4 }}>
        {selectedMarker && (
          <Button
            onClick={() => setSelectedMarker(null)}
            variant="outlined"
            sx={{ mb: 2 }}
            startIcon={<ClearIcon />}
          >
            Show All Locations
          </Button>
        )}

        {/* Only show monuments section if no tourist site is selected */}
        {(!selectedMarker || selectedMarker.type === 'monument') && (
          renderSection(
            'Monuments',
            selectedMarker 
              ? monuments.filter(m => m.id === selectedMarker.id)
              : monuments,
            showAllMonuments,
            setShowAllMonuments,
            'monument'
          )
        )}

        {/* Only show tourist sites section if no monument is selected */}
        {(!selectedMarker || selectedMarker.type === 'tourist-site') && (
          renderSection(
            'Tourist Sites',
            selectedMarker 
              ? touristSites.filter(s => s.id === selectedMarker.id)
              : touristSites,
            showAllTouristSites,
            setShowAllTouristSites,
            'tourist-site'
          )
        )}
      </Box>
    );
  };
  const renderHeroSection = () => (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '300px', md: '400px' },
        mb: 6,
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        src="/images/morocco-6.avif"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(0.7)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
          padding: 4,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            Explore Morocco
          </Typography>
          <Typography
            variant="h5"
            sx={{
              maxWidth: 600,
              mx: 'auto',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            Discover the magic of ancient monuments and breathtaking tourist sites
          </Typography>
        </motion.div>
      </Box>
    </Box>
  );

  const renderFilters = () => (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
        mb: 4,
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
        <FilterListIcon color="primary" />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Filter Your Experience
        </Typography>
      </Box>
      
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 2,
      }}>
        <FormControl fullWidth>
          <InputLabel>Region</InputLabel>
          <Select
            value={selectedRegion}
            label="Region"
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              setSelectedCity('all');
            }}
            sx={{
              borderRadius: 2,
              '&:hover': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
              },
            }}
          >
            <MenuItem value="all">All Regions</MenuItem>
            {regions.map((region) => (
              <MenuItem key={region.id} value={region.id}>
                {region.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>City</InputLabel>
          <Select
            value={selectedCity}
            label="City"
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={selectedRegion === 'all'}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="all">All Cities</MenuItem>
            {cities.map((city) => (
              <MenuItem key={city.id} value={city.id}>
                {city.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );

  const renderCard = (item, type) => (
  <motion.div
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    transition={{ duration: 0.5 }}
  >
    <Card
      onClick={() => handleCardClick(type, item.id)}
      sx={{
        mb: 3,
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'pointer',
        background: '#ffffff',
        border: '1px solid rgba(0,0,0,0.08)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
          '& .card-image': {
            transform: 'scale(1.05)',
          },
          '& .overlay': {
            opacity: 1,
          },
        },
      }}
    >
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        height: { xs: 'auto', md: '300px' },
      }}>
        <Box
          sx={{
            width: { xs: '100%', md: '45%' },
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            className="card-image"
            component="img"
            src={item.images && typeof item.images === 'string' 
              ? JSON.parse(item.images)[0] 
              : Array.isArray(item.images) 
                ? item.images[0] 
                : ''}
            alt={item.name}
            sx={{
              width: '100%',
              height: { xs: '250px', md: '100%' },
              objectFit: 'cover',
              transition: 'transform 0.6s ease',
            }}
          />
          <Box
            className="overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)',
              opacity: 0,
              transition: 'opacity 0.3s ease',
            }}
          />
          <Chip
            label={type === 'monument' ? 'Monument' : 'Tourist Site'}
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              backgroundColor: 'rgba(255,255,255,0.95)',
              color: 'primary.main',
              fontWeight: 600,
              backdropFilter: 'blur(4px)',
              '& .MuiChip-label': {
                px: 2,
              },
            }}
          />
        </Box>

        <CardContent
          sx={{
            flex: 1,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#ffffff',
          }}
        >
          <Box>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: '#1a1a1a',
                fontSize: { xs: '1.5rem', md: '1.75rem' },
                mb: 2,
                lineHeight: 1.2,
              }}
            >
              {item.name}
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                color: '#666666',
                mb: 3,
                lineHeight: 1.6,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                fontSize: '0.95rem',
              }}
            >
              {truncateText(item.description, isMobile ? 120 : 200)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 'auto',
              pt: 2,
              borderTop: '1px solid rgba(0,0,0,0.08)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <LocationOnIcon
                sx={{
                  color: 'primary.main',
                  fontSize: '1.2rem',
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: '#666666',
                  fontWeight: 500,
                }}
              >
                {item.city || 'Location'}
              </Typography>
            </Box>

            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                borderRadius: '12px',
                px: 3,
                py: 1,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
                background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
              }}
            >
              Discover
            </Button>
          </Box>
        </CardContent>
      </Box>
    </Card>
  </motion.div>
);
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {renderHeroSection()}
      {renderFilters()}
      
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <Button
          variant="contained"
          onClick={() => setShowMap(!showMap)}
          startIcon={<MapIcon />}
          sx={{
            borderRadius: 8,
            px: 3,
            py: 1.5,
            textTransform: 'none',
          }}
        >
          {showMap ? 'Hide Map' : 'Show Map'}
        </Button>
      </Box>

      {showMap && (
        <Fade in={showMap}>
          <Paper
            elevation={4}
            sx={{
              mb: 4,
              height: 500,
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <RegionMap
              markers={mapMarkers}
              center={mapCenter}
              zoom={mapZoom}
              onMarkerClick={handleMarkerClick}
              selectedMarker={selectedMarker}
            />
          </Paper>
        </Fade>
      )}

      <AnimatePresence>
        {renderResults()}
      </AnimatePresence>
    </Container>
  );
}

export default Explore;