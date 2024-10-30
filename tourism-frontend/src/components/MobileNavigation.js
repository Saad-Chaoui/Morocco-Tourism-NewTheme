import React from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Fab,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Explore,
  LocationCity,
  Landscape,
  AccountBalance,
  Hotel,
  Place,
  Home,
  Add
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

function MobileNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleClose();
  };

  const navItems = [
    { label: 'Home', value: '/', icon: <Home /> },
    { label: 'Explore', value: '/explore', icon: <Explore /> },
    { label: 'Regions', value: '/regions', icon: <Landscape /> },
    { label: 'Stays', value: '/accommodations', icon: <Hotel /> },
  ];

  const menuItems = [
    { label: 'Tourist Sites', path: '/tourist-sites', icon: <Place /> },
    { label: 'Monuments', path: '/monuments', icon: <AccountBalance /> },
    { label: 'Cities', path: '/cities', icon: <LocationCity /> },
  ];

  return (
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
      <Fab
        color="primary"
        size="medium"
        onClick={handleClick}
        sx={{
          position: 'absolute',
          top: -30,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1001
        }}
      >
        <Add />
      </Fab>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.label} onClick={() => handleMenuItemClick(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </MenuItem>
        ))}
      </Menu>

      <BottomNavigation
        value={location.pathname}
        onChange={(_, newValue) => navigate(newValue)}
        showLabels
        sx={{
          bgcolor: 'background.paper',
          '& .Mui-selected': {
            color: 'primary.main',
          }
        }}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.label}
            label={item.label}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}

export default MobileNavigation;