import React, { useState, useEffect } from 'react';
import {
  Typography, Box, Container, Card, CardContent,
  FormControl, InputLabel, Select, MenuItem,
  useTheme, useMediaQuery, Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  getRegions,
  getCitiesByRegion,
  getMonumentsByRegion,
  getTouristSitesByRegion,
  getMonumentsByCity,
  getMonuments,
  getTouristSites
} from '../services/api';
import RegionMap from './RegionMap';
import ClearIcon from '@mui/icons-material/Clear';
import MapIcon from '@mui/icons-material/Map';

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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>

        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: 'primary.main',
            fontWeight: 600,
            mb: 1
          }}
        >
          <img
            src="/images/morocco-flag.png"
            alt="Morocco Flag"
            style={{
              height: '24px',
              width: 'auto',
              borderRadius: '2px',
              marginRight: '8px',
              paddingTop: '6px'
            }}
          />
          Explore Morocco
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: 'text.secondary',
            mb: 3
          }}
        >
          Discover the beauty of regions and cities across Morocco
        </Typography>
      </Box>

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        mb: 4
      }}>
        <FormControl fullWidth>
          <InputLabel>Select Region</InputLabel>
          <Select
            value={selectedRegion}
            label="Select Region"
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              setSelectedCity('all');
              setShowResults(false);
            }}
            sx={{
              borderRadius: 2,
              backgroundColor: 'white',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0,91,92,0.23)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
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
          <InputLabel>Select City</InputLabel>
          <Select
            value={selectedCity}
            label="Select City"
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={selectedRegion === 'all'}
            sx={{
              borderRadius: 2,
              backgroundColor: 'white',
            }}
          >
            <MenuItem value="all">All Cities</MenuItem>
            {cities.map((city) => (
              <MenuItem key={city.id} value={city.id}>
                {city.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          onClick={() => setShowMap(!showMap)}
          startIcon={showMap ? <MapIcon /> : <MapIcon />}
          sx={{
            alignSelf: 'flex-start',
            borderRadius: 2,
            px: 3
          }}
        >
          {showMap ? 'Hide Map' : 'Show Map'}
        </Button>
      </Box>

      {showMap && (
        <Box sx={{ mb: 4, height: 400, borderRadius: 2, overflow: 'hidden' }}>
          <RegionMap
            markers={mapMarkers}
            center={mapCenter}
            zoom={mapZoom}
            onMarkerClick={handleMarkerClick}
            selectedMarker={selectedMarker}
          />
        </Box>
      )}

      {renderResults()}
    </Container>
  );
}

export default Explore;