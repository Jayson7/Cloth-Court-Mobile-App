// index.tsx
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "../../components/homepage/home"; // Your existing Home component
import OnboardingScreen from "../../components/onboarding/onboard"; // Import the onboarding screen

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    {/* Add other tabs as needed */}
  </Tab.Navigator>
);

const App = () => {
  const [isOnboardingVisible, setOnboardingVisible] = useState(true);

  useEffect(() => {
    const checkOnboarding = async () => {
      const hasSeenOnboarding = await AsyncStorage.getItem("hasSeenOnboarding");
      if (hasSeenOnboarding) {
        setOnboardingVisible(false);
      }
    };
    checkOnboarding();
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isOnboardingVisible ? (
        <Stack.Screen name="Onboarding">
          {(props) => (
            <OnboardingScreen
              {...props}
              onDone={async () => {
                await AsyncStorage.setItem("hasSeenOnboarding", "true");
                setOnboardingVisible(false);
              }}
            />
          )}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="Main" component={MainTabNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default App;
