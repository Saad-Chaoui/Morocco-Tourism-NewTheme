import React, { useState } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Typography,
  Divider
} from '@mui/material';
import {
  Explore,
  Landscape,
  Hotel,
  Home,
  Place,
  AccountBalance,
  LocationCity,
  Menu,
  ChevronRight
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

function MobileNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const mainNavItems = [
    { label: 'Home', value: '/', icon: <Home /> },
    { label: 'Explore', value: '/explore', icon: <Explore /> },
    { label: 'Stays', value: '/accommodations', icon: <Hotel /> },
  ];

  const allNavItems = [
    { label: 'Regions', value: '/regions', icon: <Landscape /> },
    { label: 'Cities', value: '/cities', icon: <LocationCity /> },
    { label: 'Tourist Sites', value: '/tourist-sites', icon: <Place /> },
    { label: 'Monuments', value: '/monuments', icon: <AccountBalance /> },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <>
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: { xs: 'block', sm: 'none' }
        }}
        elevation={3}
      >
        <BottomNavigation
          value={location.pathname}
          onChange={(_, newValue) => navigate(newValue)}
          showLabels
          sx={{
            bgcolor: 'background.paper',
            height: 65,
            '& .Mui-selected': {
              color: 'primary.main',
            },
          }}
        >
          {mainNavItems.map((item) => (
            <BottomNavigationAction
              key={item.label}
              label={item.label}
              value={item.value}
              icon={item.icon}
            />
          ))}
          <BottomNavigationAction
            label="More"
            icon={<Menu />}
            onClick={() => setDrawerOpen(true)}
          />
        </BottomNavigation>
      </Paper>

      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            maxHeight: '70vh'
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ flexGrow: 1, color: 'primary.main' }}>
              Discover More
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)} color="primary">
              <ChevronRight />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <List>
            {allNavItems.map((item) => (
              <ListItem
                key={item.label}
                button
                onClick={() => handleNavigation(item.value)}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  '&:hover': {
                    bgcolor: 'primary.light',
                    color: 'white',
                    '& .MuiListItemIcon-root': {
                      color: 'white'
                    }
                  }
                }}
              >
                <ListItemIcon sx={{ color: 'primary.main' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '1rem',
                    fontWeight: 500
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default MobileNavigation;