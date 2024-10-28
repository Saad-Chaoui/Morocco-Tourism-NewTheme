import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Typography, Box, Grid, Card, CardContent,
  Button, CircularProgress, Rating, Divider, useTheme, useMediaQuery, Container
} from '@mui/material';
import {
  BeachAccess as BeachAccessIcon,
  Landscape as LandscapeIcon,
  LocationCity as LocationCityIcon,
  Star as StarIcon,
  AccessTime as AccessTimeIcon,
  People as PeopleIcon,
  Straighten as StraightenIcon,
  Terrain as TerrainIcon,
  ArrowBack as ArrowBackIcon,
  Attractions as AttractionsIcon
} from '@mui/icons-material';
import { getCity, getMonumentsByCity, getRegion } from '../services/api';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Link as MuiLink } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const DESCRIPTION_LIMIT = 200;
const INITIAL_MONUMENTS_TO_SHOW = 3;

// Add this helper function at the top of the file, before the component
const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

function CityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [city, setCity] = useState(null);
  const [region, setRegion] = useState(null);
  const [monuments, setMonuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [monumentsToShow, setMonumentsToShow] = useState(INITIAL_MONUMENTS_TO_SHOW);
  const [showAllMonuments, setShowAllMonuments] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cityData = await getCity(id);
        setCity(cityData);

        if (cityData.region_id) {
          const regionData = await getRegion(cityData.region_id);
          setRegion(regionData);
        }

        const cityMonuments = await getMonumentsByCity(id);
        setMonuments(cityMonuments);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!city) {
    return <Typography>City not found</Typography>;
  }

  const toggleDescription = () => setShowFullDescription(!showFullDescription);
  const toggleMonuments = () => setMonumentsToShow(monumentsToShow === INITIAL_MONUMENTS_TO_SHOW ? monuments.length : INITIAL_MONUMENTS_TO_SHOW);

  const displayedMonuments = showAllMonuments ? monuments : monuments.slice(0, INITIAL_MONUMENTS_TO_SHOW);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : city ? (
        <>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom color="primary.main">
              {city.name}
            </Typography>
            
            {/* Updated Description Section */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" color="text.secondary">
                {city.description 
                  ? (showFullDescription 
                      ? city.description 
                      : `${city.description.slice(0, DESCRIPTION_LIMIT)}${city.description.length > DESCRIPTION_LIMIT ? '...' : ''}`)
                  : 'No description available'
                }
              </Typography>
              
              {city.description && city.description.length > DESCRIPTION_LIMIT && (
                <Button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  sx={{
                    mt: 1,
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'rgba(0,91,92,0.08)',
                    },
                  }}
                  endIcon={showFullDescription 
                    ? <KeyboardArrowUpIcon /> 
                    : <KeyboardArrowDownIcon />
                  }
                >
                  {showFullDescription ? 'Show Less' : 'Read More'}
                </Button>
              )}
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card elevation={0} sx={{ height: '100%', border: '1px solid rgba(0,0,0,0.12)' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary.main">
                      City Information
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PeopleIcon color="primary" />
                        <Typography>
                          Population: {city.population?.toLocaleString() || 'N/A'}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TerrainIcon color="primary" />
                        <Typography>
                          Altitude: {city.altitude ? `${city.altitude}m` : 'N/A'}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <StraightenIcon color="primary" />
                        <Typography>
                          Area: {city.area ? `${city.area}km²` : 'N/A'}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTimeIcon color="primary" />
                        <Typography>
                          Timezone: {city.timezone || 'N/A'}
                        </Typography>
                      </Box>

                      {city.region_id && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocationCityIcon sx={{ color: 'primary.main' }} />
                          <Typography>
                            Region:{' '}
                            <MuiLink
                              component={Link}
                              to={`/region/${city.region_id}`}
                              sx={{
                                color: 'primary.main',
                                textDecoration: 'none',
                                '&:hover': {
                                  textDecoration: 'underline',
                                  color: 'primary.dark',
                                },
                                fontWeight: 500,
                                cursor: 'pointer'
                              }}
                            >
                              {city.region_name}
                            </MuiLink>
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card elevation={0} sx={{ height: '100%', border: '1px solid rgba(0,0,0,0.12)' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary.main">
                      Notable Monuments
                    </Typography>
                    
                    {monuments.length > 0 ? (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {displayedMonuments.map((monument) => (
                          <Box key={monument.id}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <AccountBalanceIcon color="primary" />
                              <Typography variant="subtitle1">
                                {monument.name}
                              </Typography>
                            </Box>
                            <Typography 
                              variant="body2" 
                              color="text.secondary" 
                              sx={{ ml: 4, mb: 1 }}
                            >
                              {truncateText(monument.description, 100)}
                            </Typography>
                            <Button
                              component={Link}
                              to={`/monument/${monument.id}`}
                              size="small"
                              sx={{ 
                                ml: 4,
                                color: 'primary.main',
                                '&:hover': {
                                  backgroundColor: 'rgba(0,91,92,0.08)',
                                },
                              }}
                            >
                              View Details
                            </Button>
                          </Box>
                        ))}
                        {/* Add View More/Less Button */}
                        {monuments.length > INITIAL_MONUMENTS_TO_SHOW && (
                          <Button
                            onClick={() => setShowAllMonuments(!showAllMonuments)}
                            sx={{
                              mt: 2,
                              alignSelf: 'center',
                              color: 'primary.main',
                              '&:hover': {
                                backgroundColor: 'rgba(0,91,92,0.08)',
                              },
                            }}
                            startIcon={showAllMonuments ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          >
                            {showAllMonuments ? 'Show Less' : `View All (${monuments.length})`}
                          </Button>
                        )}
                      </Box>
                    ) : (
                      <Typography color="text.secondary">
                        No monuments available for this city.
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </>
      ) : (
        <Typography color="error">City not found</Typography>
      )}
    </Container>
  );
}

export default CityDetails;
