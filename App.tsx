import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {AuthProvider} from './app/core/context/Auth';
import Router from './app/routes/Router';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'purple',
    secondary: 'yellow',
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </PaperProvider>
  );
};

export default App;
