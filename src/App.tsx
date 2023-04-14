import React, { ReactElement } from 'react';

// Routing
import { BrowserRouter } from 'react-router-dom';
import { AppContext } from './persistence/context';
import Routes from './routes/Routes';

// Styles
import './App.css'
import { createTheme, ThemeProvider } from '@mui/material';

const APP_BORDER_RADIUS = 8;

// Theme
const theme = createTheme({
  shape: {
    borderRadius: APP_BORDER_RADIUS
  },
  palette: {
    primary: {
      main: '#457B9D'
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          WebkitBorderRadius: APP_BORDER_RADIUS,
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0
        }
      }
    }
  }
});

type Props = {};

function App({ }: Props): ReactElement {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <AppContext.Provider value={{ defaultDoctor: { name: "Ronald Brito", id: "40NlIuRASffNoTUU9qdm" } }}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </AppContext.Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
