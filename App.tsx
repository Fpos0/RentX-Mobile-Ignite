import 'react-native-gesture-handler';
import React from 'react';
import AppLoading from 'expo-app-loading';

// import { Home } from './src/screens/Home';
// import { CarDetails } from './src/screens/CarDetails';
import { Routes } from './src/routes';
import { ThemeProvider } from 'styled-components';
import theme from './src/styles/theme';

import {
  useFonts,
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo';

import {
  Inter_400Regular,
  Inter_500Medium
} from '@expo-google-fonts/inter';


export default function App() {
  // const [isLoading,setisLoading] = useState();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  });
  if (!fontsLoaded) {
    return <AppLoading />
  }
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}

