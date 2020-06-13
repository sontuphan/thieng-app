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
    h4: {
      fontFamily: ['"Open Sans"', 'sans-serif'].join(','),
      fontWeight: 300,
      fontSize: 17,
      letterSpacing: 0,
      textTransform: 'None'
    },
    h5: {
      fontFamily: ['"Playfair Display"', 'serif'].join(','),
      fontWeight: 700,
      fontSize: 15,
      letterSpacing: 0,
      textTransform: 'None',
    },
    h6: {
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
  },
  overrides: {
    MuiTableCell: {
      root: {
        fontFamily: ['"Open Sans"', 'sans-serif'].join(','),
        fontWeight: 300,
        fontSize: 13,
      },
      head: {
        fontWeight: 700,
      }
    },
    MuiTablePagination: {
      caption: {
        fontFamily: ['"Open Sans"', 'sans-serif'].join(','),
        fontWeight: 300,
        fontSize: 13,
      },
    },
    MuiSelect: {
      root: {
        fontFamily: ['"Open Sans"', 'sans-serif'].join(','),
        fontWeight: 300,
        fontSize: 13,
      },
    }
  }
});

export default theme;