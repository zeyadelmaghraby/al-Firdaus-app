import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from './app/context/AppContext';
import { ThemeProvider, useTheme } from './app/theme/ThemeProvider';
import RootNavigator from './app/navigation';

function AppContainer() {
  const { theme } = useTheme();
  return (
    <NavigationContainer theme={theme.navigationTheme}>
      <RootNavigator />
      <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppProvider>
          <AppContainer />
        </AppProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
