import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Explore as ExploreIcon,
  TerrainOutlined as RegionsIcon,
  LocationCityOutlined as CitiesIcon,
  AccountBalanceOutlined as MonumentsIcon,
  BeachAccessOutlined as TouristSitesIcon,
} from '@mui/icons-material';

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Explore', path: '/explore', icon: <ExploreIcon sx={{ color: 'primary.main' }} /> },
    { text: 'Regions', path: '/regions', icon: <RegionsIcon sx={{ color: 'primary.main' }} /> },
    { text: 'Cities', path: '/cities', icon: <CitiesIcon sx={{ color: 'primary.main' }} /> },
    { text: 'Monuments', path: '/monuments', icon: <MonumentsIcon sx={{ color: 'primary.main' }} /> },
    { text: 'Tourist Sites', path: '/tourist-sites', icon: <TouristSitesIcon sx={{ color: 'primary.main' }} /> },
  ];

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem 
          button 
          key={item.text} 
          component={RouterLink} 
          to={item.path}
          onClick={handleDrawerToggle}
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(0,91,92,0.08)',
              color: 'primary.main',
            }
          }}
        >
          <ListItemIcon sx={{ color: 'primary.main' }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: 'white',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0, sm: 2 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              Morocco Tourism
            </Typography>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  component={RouterLink}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    color: 'text.primary',
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'rgba(0,91,92,0.08)',
                    },
                    borderRadius: 2,
                    px: 2,
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ color: 'primary.main' }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': { 
            width: 240,
            backgroundColor: 'white',
          }
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}

export default Header;
