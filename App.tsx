import React, { useCallback, useEffect, useState } from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TruckProvider } from './src/context/TruckContext';
import LoginScreen    from './src/screens/Login';
import Dashboard      from './src/screens/Dashboard';
import TActivity      from './src/screens/tActivity';
import TMaintenance   from './src/screens/tMaintenance';
import TExpense       from './src/screens/tExpense';
import TOdometer      from './src/screens/tOdometer';
import ProfileScreen from './src/screens/Profile';
import Notification from './src/screens/Notification';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';

SplashScreen.preventAutoHideAsync();

const localAssets = [
  require('./src/images/bell.png'),
  require('./src/images/profile.png'),
  require('./src/images/camera.png'),
  require('./src/images/logo.png'),
  require('./src/images/password/eye_open.png'),
  require('./src/images/password/eye_closed.png'),
];

async function loadAssets() {
  const assetPromises = localAssets.map(function(asset) {
    return Asset.fromModule(asset).downloadAsync();
  });
  await Promise.all(assetPromises);

  const prefetchPromises = localAssets.map(function(asset) {
    const resolved = Asset.fromModule(asset);
    if (resolved.uri) {
      return Image.prefetch(resolved.uri);
    }
    return Promise.resolve();
  });
  await Promise.all(prefetchPromises);
}

const Stack = createStackNavigator();

export default function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(function() {
    (async function() {
      try {
        await loadAssets();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true);
      }
    })();
  }, []);

  const onLayoutRootView = useCallback(async function() {
    if (appReady) await SplashScreen.hideAsync();
  }, [appReady]);

  if (!appReady) return null;

  return (
    <TruckProvider>
      <NavigationContainer onReady={onLayoutRootView}>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login"       component={LoginScreen}   />
          <Stack.Screen name="Dashboard"   component={Dashboard}     />
          <Stack.Screen name="tActivity"   component={TActivity}     />
          <Stack.Screen name="tMaintenance" component={TMaintenance} />
          <Stack.Screen name="tExpense"    component={TExpense}      />
          <Stack.Screen name="tOdometer"   component={TOdometer}     />
          <Stack.Screen name="Profile"     component={ProfileScreen} />
          <Stack.Screen name="Notification" component={Notification} />
        </Stack.Navigator>
      </NavigationContainer>
    </TruckProvider>
  );
}