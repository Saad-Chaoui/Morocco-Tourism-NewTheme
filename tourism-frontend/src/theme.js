import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#005B5C',
      light: '#006E6F',
      dark: '#004748',
    },
    secondary: {
      main: '#F0E68C',
      light: '#F4EBA3',
      dark: '#E8DD75',
    },
    accent: {
      main: '#E84A2A',
      light: '#EC6A4F',
      dark: '#D43819',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FAFAFA',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          '&:hover': {
            boxShadow: '0 8px 20px rgba(0,91,92,0.12)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
        },
        contained: {
          backgroundColor: '#005B5C',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#004748',
          },
        },
        outlined: {
          borderColor: '#005B5C',
          color: '#005B5C',
          '&:hover': {
            backgroundColor: 'rgba(0,91,92,0.08)',
          },
        },
        text: {
          color: '#005B5C',
          '&:hover': {
            backgroundColor: 'rgba(0,91,92,0.08)',
          },
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        root: {
          color: '#E84A2A',
        },
      },
    },
    MuiIcon: {
      styleOverrides: {
        root: {
          color: '#005B5C',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          '&.MuiSvgIcon-colorPrimary': {
            color: '#005B5C',
          },
          '&.MuiSvgIcon-colorSecondary': {
            color: '#F0E68C',
          },
          '&.MuiSvgIcon-colorAction': {
            color: '#666666',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#F0E68C',
          color: '#333333',
          '&:hover': {
            backgroundColor: '#E8DD75',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#005B5C',
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            color: '#005B5C',
            '&.Mui-selected': {
              backgroundColor: '#005B5C',
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#004748',
              },
            },
          },
        },
      },
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: '#005B5C',
      fontSize: '2rem',
    },
    h5: {
      fontWeight: 600,
      color: '#005B5C',
      fontSize: '1.5rem',
    },
    h6: {
      fontWeight: 600,
      color: '#005B5C',
      fontSize: '1.25rem',
    },
    subtitle1: {
      color: '#333333',
      fontSize: '1rem',
    },
    subtitle2: {
      color: '#666666',
      fontSize: '0.875rem',
    },
    body1: {
      color: '#333333',
      fontSize: '1rem',
    },
    body2: {
      color: '#666666',
      fontSize: '0.875rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0,91,92,0.05)',
    '0px 4px 8px rgba(0,91,92,0.08)',
    '0px 8px 16px rgba(0,91,92,0.12)',
    // ... rest of the shadows remain default
  ],
});

export default theme;
