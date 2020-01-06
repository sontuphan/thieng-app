import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#FF3E3C' },
    secondary: { main: '#2C2C2C' }
  },
  typography: {
    h1: {
      fontFamily: ['"Playfair Display"', 'serif'].join(','),
      fontWeight: 700,
      fontSize: 36,
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
      fontSize: 18,
      letterSpacing: 0,
      textTransform: 'None'
    },
    body1: {
      fontFamily: ['"Open Sans"', 'sans-serif'].join(','),
      fontWeight: 300,
      fontSize: 14,
      letterSpacing: 0,
      textTransform: 'None'
    }
  }
});

export default theme;