import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { enableScreens } from 'react-native-screens';
import HomeScreen from '../screens/Home/HomeScreen';
import SurahViewScreen from '../screens/SurahView/SurahViewScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import BookmarksScreen from '../screens/Bookmarks/BookmarksScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import { useTheme } from '../theme/ThemeProvider';

enableScreens();

export type RootStackParamList = {
  Tabs: undefined;
  SurahView: { surahNumber: number; ayahNumber?: number };
};

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Bookmarks: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function Tabs() {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border },
        tabBarIcon: ({ color, size }) => {
          const iconMap: Record<keyof TabParamList, string> = {
            Home: 'home',
            Search: 'search',
            Bookmarks: 'bookmark',
            Settings: 'settings',
          };
          return <Ionicons name={iconMap[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'الفهرس' }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ title: 'بحث' }} />
      <Tab.Screen name="Bookmarks" component={BookmarksScreen} options={{ title: 'المحفوظات' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'الإعدادات' }} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.text,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
      <Stack.Screen
        name="SurahView"
        component={SurahViewScreen}
        options={({ route }) => ({ title: `سورة ${route.params.surahNumber}` })}
      />
    </Stack.Navigator>
  );
}
