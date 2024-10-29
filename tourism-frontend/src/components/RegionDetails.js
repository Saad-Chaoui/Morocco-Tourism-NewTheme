import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Typography, Box, Grid, Card, CardContent, Button,
  ListItem, ListItemText, Divider, Rating,
  CircularProgress, Container
} from '@mui/material';
import {
  LocationCity as CityIcon,
  AccountBalance as AccountBalanceIcon,
  Nature as TouristSiteIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { getRegionById, getCitiesByRegion, getMonumentsByRegion, getTouristSitesByRegion } from '../services/api';

const INITIAL_ITEMS_TO_SHOW = 3;

function RegionDetails() {
  const [region, setRegion] = useState(null);
  const [cities, setCities] = useState([]);
  const [monuments, setMonuments] = useState([]);
  const [touristSites, setTouristSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [citiesShown, setCitiesShown] = useState(INITIAL_ITEMS_TO_SHOW);
  const [monumentsShown, setMonumentsShown] = useState(INITIAL_ITEMS_TO_SHOW);
  const [touristSitesShown, setTouristSitesShown] = useState(INITIAL_ITEMS_TO_SHOW);
  const { id } = useParams();

  useEffect(() => {
    const fetchRegionDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const regionData = await getRegionById(id);
        setRegion(regionData);

        const citiesData = await getCitiesByRegion(id);
        setCities(citiesData);

        const monumentsData = await getMonumentsByRegion(id);
        setMonuments(monumentsData);

        const touristSitesData = await getTouristSitesByRegion(id);
        setTouristSites(touristSitesData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching region details:', error);
        setError('An error occurred while fetching data. Please try again later.');
        setLoading(false);
      }
    };
    fetchRegionDetails();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!region) {
    return <Typography>Region not found</Typography>;
  }

  const renderList = (items, shownItems, renderItem) => {
    if (!items.length) {
      return <Typography color="text.secondary">No items found</Typography>;
    }

    return items.slice(0, shownItems).map(renderItem);
  };

  const renderViewMoreButton = (items, shownItems, setShownItems) => {
    if (items.length <= shownItems) return null;

    return (
      <Button
        onClick={() => setShownItems(prev => items.length > prev ? items.length : INITIAL_ITEMS_TO_SHOW)}
        sx={{
          mt: 2,
          color: 'primary.main',
          '&:hover': {
            backgroundColor: 'primary.main',
            color: 'white',
          },
        }}
      >
        {items.length > shownItems ? 'View More' : 'View Less'}
      </Button>
    );
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 4,
          mt: { xs: 2, md: 4 }
        }}
      >
        <img
          src="/images/morocco-flag.png"
          alt="Morocco Flag"
          style={{
            height: '24px',
            width: 'auto',
            borderRadius: '2px'
          }}
        />
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: 'primary.main'
          }}
        >
          {region.name} Region
        </Typography>
      </Box>
      <Button
        component={Link}
        to="/regions"
        startIcon={<ArrowBackIcon />}
        sx={{
          mb: 3,
          color: 'primary.main',
          '&:hover': {
            backgroundColor: 'primary.main',
            color: 'white',
          },
        }}
      >
        Back to Regions
      </Button>

      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {region.name}
          </Typography>
          <Box display="flex" alignItems="center" mb={2}>
            <Rating value={region.tourism_rating} readOnly precision={0.5} />
            <Typography variant="body2" color="text.secondary" ml={1}>
              ({region.tourism_rating})
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            {showFullDescription ? region.description : `${region.description.slice(0, 200)}...`}
          </Typography>
          <Button
            onClick={() => setShowFullDescription(!showFullDescription)}
            size="small"
            color="primary"
          >
            {showFullDescription ? 'Show Less' : 'Read More'}
          </Button>
        </CardContent>
      </Card>

      <Grid container spacing={4}>
        {/* Cities Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <CityIcon sx={{ mr: 1 }} /> Cities in {region.name}
              </Typography>
              {renderList(cities, citiesShown, (city) => (
                <React.Fragment key={city.id}>
                  <ListItem
                    component={Link}
                    to={`/city/${city.id}`}
                    sx={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <ListItemText
                      primary={city.name}
                      secondary={
                        <Box display="flex" alignItems="center">
                          <Rating
                            value={Number(city.tourism_rating) || 0}
                            readOnly
                            size="small"
                            precision={0.5}
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
              {renderViewMoreButton(cities, citiesShown, setCitiesShown)}
            </CardContent>
          </Card>
        </Grid>

        {/* Monuments Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountBalanceIcon sx={{ mr: 1 }} /> Monuments in {region.name}
              </Typography>
              {renderList(monuments, monumentsShown, (monument) => (
                <React.Fragment key={monument.id}>
                  <ListItem
                    component={Link}
                    to={`/monument/${monument.id}`}
                    sx={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <ListItemText
                      primary={monument.name}
                      secondary={monument.description.slice(0, 50) + '...'}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
              {renderViewMoreButton(monuments, monumentsShown, setMonumentsShown)}
            </CardContent>
          </Card>
        </Grid>

        {/* Tourist Sites Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <TouristSiteIcon sx={{ mr: 1 }} /> Tourist Sites in {region.name}
              </Typography>
              {renderList(touristSites, touristSitesShown, (site) => (
                <React.Fragment key={site.id}>
                  <ListItem
                    component={Link}
                    to={`/tourist-site/${site.id}`}
                    sx={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <ListItemText
                      primary={site.name}
                      secondary={site.type}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
              {renderViewMoreButton(touristSites, touristSitesShown, setTouristSitesShown)}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default RegionDetails;