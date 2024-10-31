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
  NavigateNext,
  LocalLaundryService,
  FitnessCenter,
  Spa,
  RoomService,
  BusinessCenter,
  Kitchen,
  Tv,
  Balcony,
  Coffee,
  MeetingRoom,
  LocalBar,
  AccessTime,
  Elevator,
  Park,
  Deck,
  Weekend,
  Dining as DiningIcon,
  Lock,
  Iron,
  Dry,
  Thermostat,
  Microwave,
  OutdoorGrill,
  BeachAccess,
  Landscape,
  LocationCity,
  AirportShuttle,
  SupportAgent,
  Luggage,
  Pets,
  Shower,
  Wc,
  LocalFireDepartment,
  CheckCircle,
  WaterDrop,
  LocalGroceryStore,
  Bolt
} from '@mui/icons-material';
import { getAccommodation } from '../services/api';
import MapView from './MapView';
import './AccommodationDetails.css';

const getAmenityIcon = (amenity) => {
  const amenityMap = {
    'Pool': <Pool />,
    'Parking': <LocalParking />,
    'WiFi': <Wifi />,
    'Restaurant': <Restaurant />,
    'Air Conditioning': <AcUnit />,
    'Room Service': <RoomService />,
    'Spa': <Spa />,
    'Gym': <FitnessCenter />,
    'Bar': <LocalBar />,
    'Business Center': <BusinessCenter />,
    'Conference Room': <MeetingRoom />,
    'Elevator': <Elevator />,
    '24/7 Front Desk': <AccessTime />,
    'Terrace': <Balcony />,
    'Garden': <Park />,
    'Shared Kitchen': <Kitchen />,
    'Shared Bathroom': <LocalLaundryService />,
    'Common Room': <MeetingRoom />,
    'Meals Service': <Restaurant />,
    'Electricity': <Bolt />,
    'Water Supply': <WaterDrop />,
    'Showers': <Shower />,
    'Toilets': <Wc />,
    'Campfires Allowed': <LocalFireDepartment />,
    'Grocery Store': <LocalGroceryStore />
  };

  return amenityMap[amenity] || <CheckCircle />;
};

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

  const renderAmenities = (details, type) => {
    const amenities = [];
    
    if (details?.has_wifi) amenities.push({ icon: <Wifi />, label: 'WiFi' });
    if (details?.has_parking) amenities.push({ icon: <LocalParking />, label: 'Parking' });
    if (details?.has_ac) amenities.push({ icon: <AcUnit />, label: 'Air Conditioning' });
    
    switch (type?.toLowerCase()) {
      case 'hotel':
        if (details?.has_pool) amenities.push({ icon: <Pool />, label: 'Swimming Pool' });
        if (details?.has_restaurant) amenities.push({ icon: <Restaurant />, label: 'Restaurant' });
        if (details?.has_room_service) amenities.push({ icon: <RoomService />, label: 'Room Service' });
        if (details?.has_spa) amenities.push({ icon: <Spa />, label: 'Spa' });
        if (details?.has_fitness_center) amenities.push({ icon: <FitnessCenter />, label: 'Fitness Center' });
        if (details?.has_business_center) amenities.push({ icon: <BusinessCenter />, label: 'Business Center' });
        if (details?.has_bar) amenities.push({ icon: <LocalBar />, label: 'Bar' });
        if (details?.has_conference) amenities.push({ icon: <MeetingRoom />, label: 'Conference Room' });
        if (details?.has_elevator) amenities.push({ icon: <Elevator />, label: 'Elevator' });
        if (details?.has_24hr_desk) amenities.push({ icon: <AccessTime />, label: '24/7 Front Desk' });
        break;
        
      case 'riad':
        if (details?.has_pool) amenities.push({ icon: <Pool />, label: 'Pool' });
        if (details?.has_terrace) amenities.push({ icon: <Balcony />, label: 'Terrace' });
        if (details?.has_restaurant) amenities.push({ icon: <Restaurant />, label: 'Restaurant' });
        if (details?.has_garden) amenities.push({ icon: <Park />, label: 'Garden' });
        if (details?.has_courtyard) amenities.push({ icon: <Deck />, label: 'Courtyard' });
        break;
        
      case 'apartment':
        if (details?.has_kitchen) amenities.push({ icon: <Kitchen />, label: 'Kitchen' });
        if (details?.has_tv) amenities.push({ icon: <Tv />, label: 'TV' });
        if (details?.has_balcony) amenities.push({ icon: <Balcony />, label: 'Balcony' });
        if (details?.has_laundry) amenities.push({ icon: <LocalLaundryService />, label: 'Laundry' });
        if (details?.has_living_room) amenities.push({ icon: <Weekend />, label: 'Living Room' });
        if (details?.has_dining_area) amenities.push({ icon: <DiningIcon />, label: 'Dining Area' });
        if (details?.has_washing_machine) amenities.push({ icon: <LocalLaundryService />, label: 'Washing Machine' });
        break;

      case 'villa':
        if (details?.has_pool) amenities.push({ icon: <Pool />, label: 'Private Pool' });
        if (details?.has_kitchen) amenities.push({ icon: <Kitchen />, label: 'Kitchen' });
        if (details?.has_garden) amenities.push({ icon: <Park />, label: 'Garden' });
        if (details?.has_bbq) amenities.push({ icon: <OutdoorGrill />, label: 'BBQ' });
        if (details?.has_terrace) amenities.push({ icon: <Balcony />, label: 'Terrace' });
        if (details?.has_parking) amenities.push({ icon: <LocalParking />, label: 'Private Parking' });
        if (details?.has_laundry) amenities.push({ icon: <LocalLaundryService />, label: 'Laundry' });
        break;

      case 'camping':
        if (details?.has_shower) amenities.push({ icon: <Shower />, label: 'Shared Showers' });
        if (details?.has_toilet) amenities.push({ icon: <Wc />, label: 'Shared Toilets' });
        if (details?.has_bbq) amenities.push({ icon: <OutdoorGrill />, label: 'BBQ Area' });
        if (details?.has_kitchen) amenities.push({ icon: <Kitchen />, label: 'Shared Kitchen' });
        if (details?.has_campfire) amenities.push({ icon: <LocalFireDepartment />, label: 'Campfire Area' });
        if (details?.has_playground) amenities.push({ icon: <Park />, label: 'Playground' });
        break;

      case 'auberge':
        if (details?.has_restaurant) amenities.push({ icon: <Restaurant />, label: 'Restaurant' });
        if (details?.has_shared_kitchen) amenities.push({ icon: <Kitchen />, label: 'Shared Kitchen' });
        if (details?.has_common_room) amenities.push({ icon: <Weekend />, label: 'Common Room' });
        if (details?.has_terrace) amenities.push({ icon: <Balcony />, label: 'Terrace' });
        if (details?.has_laundry) amenities.push({ icon: <LocalLaundryService />, label: 'Laundry' });
        if (details?.has_lockers) amenities.push({ icon: <Lock />, label: 'Lockers' });
        break;
    }

    if (details?.has_safe) amenities.push({ icon: <Lock />, label: 'Safe' });
    if (details?.has_minibar) amenities.push({ icon: <LocalBar />, label: 'Mini Bar' });
    if (details?.has_iron) amenities.push({ icon: <Iron />, label: 'Iron' });
    if (details?.has_hair_dryer) amenities.push({ icon: <Dry />, label: 'Hair Dryer' });
    if (details?.has_heating) amenities.push({ icon: <Thermostat />, label: 'Heating' });
    if (details?.has_sea_view) amenities.push({ icon: <BeachAccess />, label: 'Sea View' });
    if (details?.has_mountain_view) amenities.push({ icon: <Landscape />, label: 'Mountain View' });
    if (details?.has_city_view) amenities.push({ icon: <LocationCity />, label: 'City View' });
    if (details?.has_airport_shuttle) amenities.push({ icon: <AirportShuttle />, label: 'Airport Shuttle' });
    if (details?.has_concierge) amenities.push({ icon: <SupportAgent />, label: 'Concierge' });
    if (details?.has_luggage_storage) amenities.push({ icon: <Luggage />, label: 'Luggage Storage' });
    if (details?.has_pet_friendly) amenities.push({ icon: <Pets />, label: 'Pet Friendly' });

    if (details?.amenities) {
      const customAmenities = details.amenities.split(',').map(amenity => ({
        icon: getAmenityIcon(amenity.trim()),
        label: amenity.trim()
      }));
      amenities.push(...customAmenities);
    }

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
    <Container maxWidth="lg" sx={{ p: 0, flexDirection: 'column', pb: { xs: '80px', sm: 2 } }}>
      <Box 
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          mb: 2,
          px: 2,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <IconButton 
          onClick={() => navigate(-1)}
          sx={{ 
            color: 'primary.main',
            p: 1
          }}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          Accommodation Details
        </Typography>
      </Box>

      <Box sx={{ px: 2 }}>
        <Typography variant="h4" component="h1" color="primary" sx={{ mb: 3 }}>
          {accommodation?.name || <Skeleton width={300} />}
        </Typography>

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

                {accommodation && accommodation.details && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
                      Amenities
                    </Typography>
                    <Grid container spacing={1}>
                      {Object.entries(accommodation.details)
                        .filter(([key, value]) => 
                          (key.startsWith('has_') || key.startsWith('allows_')) && 
                          value === 1 && 
                          key !== 'has_id' && 
                          key !== 'has_accommodation_id'
                        )
                        .map(([key], index) => {
                          const amenityName = key
                            .replace('has_', '')
                            .replace('allows_', '')
                            .split('_')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ');
                          return (
                            <Grid item xs={6} sm={4} md={3} key={index}>
                              <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 1,
                                py: 0.75,
                                px: 1,
                                borderRadius: 1,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  bgcolor: 'primary.light',
                                  color: 'white',
                                  '& .amenity-icon': {
                                    color: 'white',
                                  },
                                  '& .amenity-text': {
                                    color: 'white',
                                  }
                                }
                              }}>
                                <Box 
                                  className="amenity-icon"
                                  sx={{
                                    color: 'primary.main',
                                    display: 'flex',
                                    alignItems: 'center',
                                    transition: 'color 0.2s ease',
                                    '& svg': {
                                      fontSize: '1.2rem'
                                    }
                                  }}
                                >
                                  {getAmenityIcon(amenityName)}
                                </Box>
                                <Typography 
                                  variant="body2"
                                  className="amenity-text"
                                  sx={{ 
                                    fontSize: '0.875rem',
                                    transition: 'color 0.2s ease'
                                  }}
                                >
                                  {amenityName}
                                </Typography>
                              </Box>
                            </Grid>
                          );
                        })}
                    </Grid>
                  </Box>
                )}

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
                          href={accommodation.website.startsWith('http') ? accommodation.website : `https://${accommodation.website}`}
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
      </Box>
    </Container>
  );
}

export default AccommodationDetails;