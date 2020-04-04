import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#FF3E3C' },
    secondary: { main: '#2C2C2C' },
    textPrimary: { main: '#000000' },
    textSecondary: { main: '#FFFFFF' },
  },
  typography: {
    fontFamily: [
      '"Open Sans"',
      'sans-serif',
      '"Playfair Display"',
      'serif',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontFamily: ['"Playfair Display"', 'serif'].join(','),
      fontWeight: 700,
      fontSize: 48,
      letterSpacing: 0,
      textTransform: 'None'
    },
    h2: {
      fontFamily: ['"Open Sans"', 'sans-serif'].join(','),
      fontWeight: 300,
      fontSize: 24,
      letterSpacing: 0,
      textTransform: 'None'
    },
    h3: {
      fontFamily: ['"Playfair Display"', 'serif'].join(','),
      fontWeight: 700,
      fontSize: 17,
      letterSpacing: 0,
      textTransform: 'None'
    },
    h5: {
      fontFamily: ['"Open Sans"', 'sans-serif'].join(','),
      fontWeight: 300,
      fontSize: 15,
      letterSpacing: 0,
      textTransform: 'None',
    },
    body1: {
      fontFamily: ['"Open Sans"', 'sans-serif'].join(','),
      fontWeight: 300,
      fontSize: 13,
      letterSpacing: 0,
      textTransform: 'None'
    },
    body2: {
      fontFamily: ['"Playfair Display"', 'serif'].join(','),
      fontWeight: 700,
      fontSize: 13,
      letterSpacing: 0,
      textTransform: 'None'
    },
  }
});

export default theme;