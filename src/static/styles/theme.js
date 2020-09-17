import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#FF3E3C' },
    secondary: { main: '#012639' },
    textPrimary: { main: '#000000' },
    textSecondary: { main: '#FFFFFF' },
  },
  background: {
    primary: 'linear-gradient(45deg, #FF9B21 0%, #FF3E3C 50%, #FF3E3C 100%)',
    secondary: '#F2F3F5',
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: [
      '"Nunito"',
      'sans-serif',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: 48,
      letterSpacing: 0,
      textTransform: 'None'
    },
    h2: {
      fontWeight: 300,
      fontSize: 24,
      letterSpacing: 0,
      textTransform: 'None'
    },
    h3: {
      fontWeight: 700,
      fontSize: 17,
      letterSpacing: 0,
      textTransform: 'None'
    },
    h4: {
      fontWeight: 300,
      fontSize: 17,
      letterSpacing: 0,
      textTransform: 'None'
    },
    h5: {
      fontWeight: 700,
      fontSize: 15,
      letterSpacing: 0,
      textTransform: 'None',
    },
    h6: {
      fontWeight: 300,
      fontSize: 15,
      letterSpacing: 0,
      textTransform: 'None',
    },
    body1: {
      fontWeight: 300,
      fontSize: 13,
      letterSpacing: 0,
      textTransform: 'None'
    },
    body2: {
      fontWeight: 700,
      fontSize: 13,
      letterSpacing: 0,
      textTransform: 'None'
    },
  },
});

export default theme;