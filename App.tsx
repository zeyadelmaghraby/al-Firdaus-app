import 'react-native-gesture-handler';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, NotoSansArabic_400Regular, NotoSansArabic_700Bold } from '@expo-google-fonts/noto-sans-arabic';
import * as SplashScreen from 'expo-splash-screen';
import { AppProvider, useApp } from './app/context/AppContext';
import { ThemeProvider, useTheme } from './app/theme/ThemeProvider';
import RootNavigator from './app/navigation';

SplashScreen.preventAutoHideAsync().catch(() => {});

function AppContainer() {
  const theme = useTheme();
  const { loading } = useApp();
  if (loading) {
    return null;
  }
  return (
    <NavigationContainer theme={theme.navigationTheme}>
      <RootNavigator />
      <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    NotoSansArabic_400Regular,
    NotoSansArabic_700Bold,
  });

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

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
