import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import ScanScreen from './ScanScreen';
import ResultScreen from './ResultScreen';
import SettingsScreen from './SettingsScreen';
import { ServerUrlProvider } from './ServerUrlContext';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ServerUrlProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none',}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Scan" component={ScanScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ServerUrlProvider>
  );
}
