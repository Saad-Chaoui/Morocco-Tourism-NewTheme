import React from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper
} from '@mui/material';
import {
  Home as HomeIcon,
  LocationCity as LocationCityIcon,
  Landscape as LandscapeIcon,
  AccountBalance as MonumentIcon,
  BeachAccess as TouristSitesIcon,
  Explore as ExploreIcon
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

function MobileNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderTop: '1px solid rgba(0,0,0,0.12)'
      }}
      elevation={3}
    >
      <BottomNavigation
        value={location.pathname}
        onChange={(event, newValue) => {
          navigate(newValue);
        }}
        showLabels
        sx={{
          height: 'auto',
          minHeight: 56,
          '& .MuiBottomNavigationAction-root': {
            padding: '6px 0',
            minWidth: 'auto',
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.625rem',
              '&.Mui-selected': {
                fontSize: '0.675rem'
              }
            }
          }
        }}
      >
        <BottomNavigationAction
          label="Home"
          value="/"
          icon={<HomeIcon />}
          sx={{
            '& .MuiSvgIcon-root': {
              fontSize: '1.25rem',
            }
          }}
        />
        <BottomNavigationAction
          label="Regions"
          value="/regions"
          icon={<LocationCityIcon />}
          sx={{
            '& .MuiSvgIcon-root': {
              fontSize: '1.25rem',
            }
          }}
        />
        <BottomNavigationAction
          label="Cities"
          value="/cities"
          icon={<LandscapeIcon />}
          sx={{
            '& .MuiSvgIcon-root': {
              fontSize: '1.25rem',
            }
          }}
        />
        <BottomNavigationAction
          label="Monuments"
          value="/monuments"
          icon={<MonumentIcon />}
          sx={{
            '& .MuiSvgIcon-root': {
              fontSize: '1.25rem',
            }
          }}
        />
        <BottomNavigationAction
          label="Sites"
          value="/tourist-sites"
          icon={<TouristSitesIcon />}
          sx={{
            '& .MuiSvgIcon-root': {
              fontSize: '1.25rem',
            }
          }}
        />
        <BottomNavigationAction
          label="Explore"
          value="/explore"
          icon={<ExploreIcon />}
          sx={{
            '& .MuiSvgIcon-root': {
              fontSize: '1.25rem',
            }
          }}
        />
      </BottomNavigation>
    </Paper>
  );
}

export default MobileNavigation;