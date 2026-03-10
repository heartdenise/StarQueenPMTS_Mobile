import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TruckProvider } from './src/context/TruckContext';
import LoginScreen from './src/screens/Login';
import Dashboard from './src/screens/Dashboard';
import TActivity from './src/screens/tActivity';
import TMaintenance from './src/screens/tMaintenance';
import TExpense from './src/screens/tExpense';
import TOdometer from './src/screens/tOdometer';

const Stack = createStackNavigator();

export default function App() {
  return (
    <TruckProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="tActivity" component={TActivity} />
          <Stack.Screen name="tMaintenance" component={TMaintenance} />
          <Stack.Screen name="tExpense" component={TExpense} />
          <Stack.Screen name="tOdometer" component={TOdometer} />
        </Stack.Navigator>
      </NavigationContainer>
    </TruckProvider>
  );
}