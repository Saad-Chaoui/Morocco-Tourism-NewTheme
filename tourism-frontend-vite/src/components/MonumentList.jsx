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
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import { getMonuments } from '../services/api';

const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

function MonumentList() {
  const [monuments, setMonuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchMonuments = async () => {
      try {
        const response = await getMonuments(page, 9, searchTerm);
        setMonuments(response.monuments);
        setTotalPages(response.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching monuments:', error);
        setLoading(false);
      }
    };

    fetchMonuments();
  }, [page, searchTerm]);

  const handleChangePage = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ mb: 4, flexDirection: 'column', pb: { xs: '25px', sm: 0 } }}>
        <Typography variant="h4" gutterBottom color="primary.main">
          Discover Monuments
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search monuments..."
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
        ) : (
          <>
            <Grid container spacing={3}>
              {monuments.map((monument) => {
                const images = monument.images ? JSON.parse(monument.images) : [];
                return (
                  <Grid item xs={12} sm={6} md={4} key={monument.id}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                        },
                        borderRadius: 3,
                        overflow: 'hidden',
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={images[0] || 'https://via.placeholder.com/300x200'}
                        alt={monument.name}
                        sx={{
                          objectFit: 'cover',
                        }}
                      />
                      <CardContent sx={{ flexGrow: 1, p: 2 }}>
                        <Typography variant="h6" gutterBottom color="primary.main">
                          {monument.name}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <LocationIcon color="action" fontSize="small" />
                          <Typography variant="body2" color="text.secondary">
                            {monument.city_name}
                          </Typography>
                        </Box>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2 }}
                        >
                          {truncateText(monument.description, 120)}
                        </Typography>

                        {monument.opening_hours && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <AccessTimeIcon color="action" fontSize="small" />
                            <Typography variant="body2" color="text.secondary">
                              {monument.opening_hours}
                            </Typography>
                          </Box>
                        )}

                        <Button
                          component={Link}
                          to={`/monument/${monument.id}`}
                          variant="contained"
                          color="primary"
                          fullWidth
                          sx={{
                            mt: 2,
                            borderRadius: 2,
                          }}
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChangePage}
                color="primary"
                size={isMobile ? 'small' : 'medium'}
              />
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}

export default MonumentList;