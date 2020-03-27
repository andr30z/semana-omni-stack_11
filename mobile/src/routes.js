import { NavigationContainer } from '@react-navigation/native';
import Detail from "./pages/detail/detail.component";
import Incidents from "./pages/incidents/incidents.component";
import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

const AppStack = createStackNavigator();
export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator InitialRouteName="Incidents" screenOptions={{
        headerShown:false
      }}>
        <AppStack.Screen name="Incidents" component={Incidents} />
        <AppStack.Screen name="Detail" component={Detail} />
      </AppStack.Navigator>
    </NavigationContainer>

  )
}