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
  getMonumentsByCity
} from '../services/api';
import RegionMap from './RegionMap';

function Explore() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [monuments, setMonuments] = useState([]);
  const [touristSites, setTouristSites] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showAllMonuments, setShowAllMonuments] = useState(false);
  const [showAllTouristSites, setShowAllTouristSites] = useState(false);

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
      if (selectedRegion) {
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
    if (!items || items.length === 0) {
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
      <Box sx={{ my: 3 }}>
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
                    src={item.images ? JSON.parse(item.images)[0] : ''}
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
      if (selectedRegion) {
        try {
          const [monumentsData, sitesData] = await Promise.all([
            getMonumentsByRegion(selectedRegion.id),
            getTouristSitesByRegion(selectedRegion.id)
          ]);
          setMonuments(monumentsData);
          setTouristSites(sitesData);
        } catch (error) {
          console.error('Error fetching locations:', error);
        }
      }
    };

    fetchLocations();
  }, [selectedRegion]);

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
          <InputLabel
            sx={{
              color: 'primary.main',
              '&.Mui-focused': {
                color: 'primary.main',
              }
            }}
          >
            Select Region
          </InputLabel>
          <Select
            value={selectedRegion}
            label="Select Region"
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              setSelectedCity('');
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
            onChange={(e) => {
              setSelectedCity(e.target.value);
              if (e.target.value) {
                Promise.all([
                  getMonumentsByCity(e.target.value),
                  getTouristSitesByRegion(selectedRegion)
                ]).then(([monumentsData, sitesData]) => {
                  setMonuments(monumentsData || []);
                  setTouristSites(sitesData || []);
                  setShowResults(true);
                });
              }
            }}
            disabled={!selectedRegion}
            sx={{
              borderRadius: 2,
              backgroundColor: 'white',
            }}
          >
            {cities.map((city) => (
              <MenuItem key={city.id} value={city.id}>
                {city.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {selectedRegion && (
        <RegionMap
          monuments={monuments}
          touristSites={touristSites}
          selectedCity={selectedCity}
        />
      )}

      {showResults && (
        <Box sx={{ mt: 4 }}>
          {renderSection('Monuments', monuments, showAllMonuments, setShowAllMonuments, 'monument')}
          {renderSection('Tourist Sites', touristSites, showAllTouristSites, setShowAllTouristSites, 'tourist-site')}
        </Box>
      )}
    </Container>
  );
}

export default Explore;