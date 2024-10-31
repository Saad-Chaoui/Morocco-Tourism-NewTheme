import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  Pagination, 
  TextField, 
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Skeleton,
  Rating,
  Button,
  Collapse
} from '@mui/material';
import { Link } from 'react-router-dom';
import { getAccommodations, getAccommodationLocations } from '../services/api';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HotelIcon from '@mui/icons-material/Hotel';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MapIcon from '@mui/icons-material/Map';
import MapView from './MapView';
import ArrowBack from '@mui/icons-material/ArrowBack';

function AccommodationList() {
  const [accommodations, setAccommodations] = useState([]);
  const [mapAccommodations, setMapAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [error, setError] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);

  const accommodationTypes = [
    'Hotel',
    'Riad',
    'Camping',
    'Auberge',
    'Apartment',
    'Villa'
  ];

  const handleMarkerClick = (accommodation) => {
    setSelectedAccommodation(accommodation);
  };

  const handleResetSelection = () => {
    setSelectedAccommodation(null);
  };

  const displayedAccommodations = selectedAccommodation 
    ? [selectedAccommodation] 
    : accommodations;

  useEffect(() => {
    fetchAccommodations();
  }, [page, searchTerm, selectedType]);

  useEffect(() => {
    const fetchMapLocations = async () => {
      try {
        const locations = await getAccommodationLocations(selectedType, searchTerm);
        setMapAccommodations(locations);
      } catch (err) {
        console.error('Error fetching map locations:', err);
      }
    };
    fetchMapLocations();
  }, [selectedType, searchTerm]);

  const fetchAccommodations = async () => {
    try {
      setLoading(true);
      const response = await getAccommodations(page, 6, searchTerm, selectedType);
      setAccommodations(response.data);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError('Failed to fetch accommodations');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setPage(1);
  };

  const renderPriceRange = (priceRange) => {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <AttachMoneyIcon 
          sx={{ 
            color: 'primary.main',
            opacity: priceRange?.length >= 1 ? 1 : 0.3
          }} 
        />
        <AttachMoneyIcon 
          sx={{ 
            color: 'primary.main',
            opacity: priceRange?.length >= 2 ? 1 : 0.3
          }} 
        />
        <AttachMoneyIcon 
          sx={{ 
            color: 'primary.main',
            opacity: priceRange?.length >= 3 ? 1 : 0.3
          }} 
        />
      </Box>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom color="primary">
        Accommodations
      </Typography>

      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search accommodations..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={selectedType}
            onChange={handleTypeChange}
            label="Type"
          >
            <MenuItem value="">All Types</MenuItem>
            {accommodationTypes.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          startIcon={<MapIcon />}
          onClick={() => setShowMap(!showMap)}
          sx={{ minWidth: 120 }}
        >
          {showMap ? 'Hide Map' : 'Show Map'}
        </Button>
      </Box>

      <Collapse in={showMap}>
        <Card sx={{ mb: 4, height: 400 }}>
          <MapView
            center={[31.7917, -7.0926]}
            zoom={6}
            accommodations={mapAccommodations}
            onMarkerClick={handleMarkerClick}
            selectedAccommodation={selectedAccommodation}
          />
        </Card>
      </Collapse>

      {selectedAccommodation && (
        <Box sx={{ mb: 2 }}>
          <Button 
            variant="text" 
            onClick={handleResetSelection}
            startIcon={<ArrowBack />}
          >
            Show All Accommodations
          </Button>
        </Box>
      )}

      <Grid container spacing={3}>
        {loading
          ? Array.from(new Array(6)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <Skeleton variant="rectangular" height={200} />
                  <CardContent>
                    <Skeleton variant="text" />
                    <Skeleton variant="text" width="60%" />
                  </CardContent>
                </Card>
              </Grid>
            ))
          : displayedAccommodations.map((accommodation) => (
              <Grid item xs={12} sm={6} md={4} key={accommodation.id}>
                <Card 
                  component={Link}
                  to={`/accommodation/${accommodation.id}`}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                    transition: '0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 3,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={accommodation.primary_image || '/placeholder.jpg'}
                    alt={accommodation.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2" color="primary">
                      {accommodation.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <HotelIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body2" color="text.secondary">
                        {accommodation.type}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body2" color="text.secondary">
                        {accommodation.city_name}, {accommodation.region_name}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                      <Rating value={accommodation.rating} precision={0.5} readOnly size="small" />
                      {renderPriceRange(accommodation.price_range)}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>

      {!selectedAccommodation && totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Container>
  );
}

export default AccommodationList;