import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  useTheme, 
  useMediaQuery,
  Menu,
  MenuItem
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Explore,
  LocationCity,
  Landscape,
  AccountBalance,
  Hotel,
  Place,
  ExpandMore
} from '@mui/icons-material';

function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentMenu, setCurrentMenu] = useState('');

  const handleMenuClick = (event, menuId) => {
    setAnchorEl(event.currentTarget);
    setCurrentMenu(menuId);
  };
  

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentMenu('');
  };

  const navItems = [
    { 
      text: 'Discover',
      icon: <Place />,
      hasSubmenu: true,
      menuId: 'discover',
      submenuItems: [
        { text: 'Explore All', path: '/explore', icon: <Explore /> },
        { text: 'Tourist Sites', path: '/tourist-sites', icon: <Place /> },
        { text: 'Monuments', path: '/monuments', icon: <AccountBalance /> }
      ]
    },
    { 
      text: 'Destinations', 
      path: '/regions',
      icon: <Landscape />,
      hasSubmenu: true,
      menuId: 'destinations',
      submenuItems: [
        { text: 'Regions', path: '/regions', icon: <Landscape /> },
        { text: 'Cities', path: '/cities', icon: <LocationCity /> }
      ]
    },
    { text: 'Accommodations', path: '/accommodations', icon: <Hotel /> }
  ];

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'primary.main' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold'
          }}
        >
          <img
                  src="/images/morocco-flag.png"
                  alt="Morocco Flag"
                  style={{
                    height: '23px',
                    width: 'auto',
                    borderRadius: '2px',
                    marginRight: '8px',
                    paddingTop: '6px'
                  }}
                />
          Morocco Travel
        </Typography>
        
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {navItems.map((item) => (
              <React.Fragment key={item.text}>
                {item.hasSubmenu ? (
                  <>
                    <Button
                      onClick={(e) => handleMenuClick(e, item.menuId)}
                      startIcon={item.icon}
                      endIcon={<ExpandMore />}
                      sx={{
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'primary.dark',
                        },
                      }}
                    >
                      {item.text}
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && currentMenu === item.menuId}
                      onClose={handleMenuClose}
                    >
                      {item.submenuItems.map((subItem) => (
                        <MenuItem
                          key={subItem.text}
                          component={Link}
                          to={subItem.path}
                          onClick={handleMenuClose}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                          }}
                        >
                          {subItem.icon}
                          {subItem.text}
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                ) : (
                  <Button
                    component={Link}
                    to={item.path}
                    startIcon={item.icon}
                    sx={{
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                )}
              </React.Fragment>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;