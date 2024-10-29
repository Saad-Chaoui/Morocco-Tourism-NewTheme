import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  Box,
  CircularProgress,
  Container,
  Pagination,
  useTheme,
  useMediaQuery,
  Chip,
  Alert,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  AccessTime as AccessTimeIcon,
  AttachMoney as AttachMoneyIcon,
  Landscape as LandscapeIcon,
} from '@mui/icons-material';
import { getTouristSites } from '../services/api';

const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

function TouristSiteList() {
  const [touristSites, setTouristSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchTouristSites = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getTouristSites(page, 6, searchTerm);
        console.log('Tourist sites response:', response); // Debug log

        setTouristSites(response.data);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('Error fetching tourist sites:', error);
        setError('Failed to load tourist sites. Please try again later.');
        setTouristSites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTouristSites();
  }, [page, searchTerm]);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          Tourist Sites
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search tourist sites..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
            sx: { borderRadius: 2 }
          }}
          sx={{ mb: 3 }}
        />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
        ) : touristSites.length === 0 ? (
          <Alert severity="info" sx={{ mb: 3 }}>No tourist sites found.</Alert>
        ) : (
          <>
            <Grid container spacing={3}>
              {touristSites.map((site) => (
                <Grid item xs={12} sm={6} key={site.id}>
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 20px rgba(0,91,92,0.12)',
                      },
                      border: '1px solid rgba(0,91,92,0.12)',
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: { xs: '100%', sm: '40%' },
                        height: { xs: 200, sm: 'auto' },
                        objectFit: 'cover',
                      }}
                      image={site.images[0] || 'https://via.placeholder.com/300x200'}
                      alt={site.name}
                    />
                    <CardContent sx={{ flex: 1, p: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'primary.main',
                          fontWeight: 600,
                        }}
                      >
                        {site.name}
                      </Typography>

                      {site.type && (
                        <Chip
                          icon={<LandscapeIcon sx={{ color: 'primary.main' }} />}
                          label={site.type}
                          sx={{
                            backgroundColor: 'secondary.main',
                            color: 'text.primary',
                            mb: 1,
                            mt: 0,
                          }}
                        />
                      )}

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {truncateText(site.description, 150)}
                      </Typography>

                      {site.nearest_cities?.length > 0 && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <LocationIcon color="action" fontSize="small" />
                          <Typography variant="body2" color="text.secondary">
                            Near: {site.nearest_cities.join(', ')}
                          </Typography>
                        </Box>
                      )}

                      {site.opening_hours && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <AccessTimeIcon color="action" fontSize="small" />
                          <Typography variant="body2" color="text.secondary">
                            {site.opening_hours}
                          </Typography>
                        </Box>
                      )}

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <AttachMoneyIcon color="action" fontSize="small" />
                        <Typography variant="body2" color="text.secondary">
                          Entry Fee: {site.entry_fee ? `$${site.entry_fee}` : 'Free'}
                        </Typography>
                      </Box>

                      <Button
                        component={Link}
                        to={`/tourist-site/${site.id}`}
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                          mt: 'auto',
                          borderRadius: 2,
                        }}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                  color="primary"
                  size={isMobile ? 'small' : 'medium'}
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </Container>
  );
}

export default TouristSiteList;