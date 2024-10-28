import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

// Create colored markers using the default Leaflet marker
const monumentIcon = new L.Icon.Default();
monumentIcon.options.shadowSize = [0,0]; // Remove shadow for cleaner look

const touristSiteIcon = new L.divIcon({
  className: 'custom-div-icon',
  html: `<div style="
    background-color: #005B5C; 
    width: 25px; 
    height: 25px; 
    border-radius: 50%; 
    border: 3px solid white;
    box-shadow: 0 0 4px rgba(0,0,0,0.3);
  "></div>`,
  iconSize: [25, 25],
  iconAnchor: [12, 12],
  popupAnchor: [1, -12],
});

function RegionMap({ monuments, touristSites, selectedCity }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Calculate center position based on all locations
  const locations = [...monuments, ...touristSites].filter(loc => loc.latitude && loc.longitude);
  
  const center = locations.length > 0
    ? [
        locations.reduce((sum, loc) => sum + parseFloat(loc.latitude), 0) / locations.length,
        locations.reduce((sum, loc) => sum + parseFloat(loc.longitude), 0) / locations.length
      ]
    : [31.7917, -7.0926]; // Morocco center coordinates

  return (
    <Box sx={{ 
      height: { xs: '350px', sm: '400px', md: '500px' }, // Responsive heights
      width: '100%', 
      mb: { xs: 2, sm: 3, md: 4 }, // Responsive margins
      position: 'relative',
      '& .leaflet-div-icon': {
        background: 'transparent',
        border: 'none'
      }
    }}>
      <MapContainer
        center={center}
        zoom={isMobile ? 6 : 7} // Adjust zoom level for mobile
        style={{ 
          height: '100%', 
          width: '100%', 
          borderRadius: '8px',
          zIndex: 1
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Render Monuments */}
        {monuments.map((monument) => (
          monument.latitude && monument.longitude && (
            <Marker
              key={`monument-${monument.id}`}
              position={[parseFloat(monument.latitude), parseFloat(monument.longitude)]}
              icon={monumentIcon}
            >
              <Popup>
                <Box sx={{ 
                  p: { xs: 0.5, sm: 1 },
                  maxWidth: { xs: '200px', sm: '300px' }
                }}>
                  <Typography 
                    variant="subtitle1" 
                    fontWeight="bold" 
                    color="primary"
                    sx={{ 
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}
                  >
                    {monument.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    }}
                  >
                    Monument
                  </Typography>
                  {monument.description && (
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mt: 1,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {monument.description.substring(0, isMobile ? 50 : 100)}...
                    </Typography>
                  )}
                </Box>
              </Popup>
            </Marker>
          )
        ))}

        {/* Render Tourist Sites */}
        {touristSites.map((site) => (
          site.latitude && site.longitude && (
            <Marker
              key={`site-${site.id}`}
              position={[parseFloat(site.latitude), parseFloat(site.longitude)]}
              icon={touristSiteIcon}
            >
              <Popup>
                <Box sx={{ 
                  p: { xs: 0.5, sm: 1 },
                  maxWidth: { xs: '200px', sm: '300px' }
                }}>
                  <Typography 
                    variant="subtitle1" 
                    fontWeight="bold" 
                    color="secondary"
                    sx={{ 
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}
                  >
                    {site.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    }}
                  >
                    Tourist Site
                  </Typography>
                  {site.description && (
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mt: 1,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {site.description.substring(0, isMobile ? 50 : 100)}...
                    </Typography>
                  )}
                </Box>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>

      {/* Legend with responsive positioning and sizing */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: '10px', sm: '20px' },
          right: { xs: '10px', sm: '20px' },
          backgroundColor: 'white',
          padding: { xs: '8px', sm: '10px' },
          borderRadius: '4px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          zIndex: 1000,
          fontSize: { xs: '0.75rem', sm: '0.875rem' }
        }}
      >
        <Typography 
          variant="body2" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: { xs: 0.5, sm: 1 },
            fontSize: 'inherit'
          }}
        >
          <Box
            component="span"
            sx={{
              width: { xs: '16px', sm: '20px' },
              height: { xs: '16px', sm: '20px' },
              backgroundColor: '#2196F3',
              borderRadius: '50%',
              marginRight: { xs: '6px', sm: '8px' },
              border: '2px solid white',
              boxShadow: '0 0 4px rgba(0,0,0,0.3)'
            }}
          />
          Monuments
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            fontSize: 'inherit'
          }}
        >
          <Box
            component="span"
            sx={{
              width: { xs: '16px', sm: '20px' },
              height: { xs: '16px', sm: '20px' },
              backgroundColor: '#005B5C',
              borderRadius: '50%',
              marginRight: { xs: '6px', sm: '8px' },
              border: '2px solid white',
              boxShadow: '0 0 4px rgba(0,0,0,0.3)'
            }}
          />
          Tourist Sites
        </Typography>
      </Box>
    </Box>
  );
}

export default RegionMap;
