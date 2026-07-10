import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#1A1A1A',
          light: '#333333',
          dark: '#000000',
          contrastText: '#FFFFFF',
        },
        secondary: {
          main: '#FFFFFF',
          contrastText: '#000000',
        },
        background: {
          default: '#FFFFFF',
          paper: '#F5F5F5',
        },
        text: {
          primary: '#000000',
          secondary: '#333333',
          disabled: '#757575',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#FFFFFF',
          light: '#CCCCCC',
          dark: '#000000',
          contrastText: '#000000',
        },
        secondary: {
          main: '#1A1A1A',
          contrastText: '#FFFFFF',
        },
        background: {
          default: '#0F0F0F',
          paper: '#1A1A1A',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#E0E0E0',
          disabled: '#9E9E9E',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.125rem',
      fontWeight: 500,
    },
  },
  spacing: 8,
});

export default theme;
