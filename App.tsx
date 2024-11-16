import React from 'react';
import { VideosProvider } from './src/context/VideosContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => (
  <VideosProvider>
    <AppNavigator />
  </VideosProvider>
);

export default App;
