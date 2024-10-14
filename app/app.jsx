// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../components/Home/home"; // Adjust the path based on your structure
import OnboardingScreen from "../components/Onboarding/board"; // Adjust the path based on your structure

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Stack.Navigator
      initialRouteName="OnboardingScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default App;
