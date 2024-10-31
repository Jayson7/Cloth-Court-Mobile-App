import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Image, ActivityIndicator, StyleSheet } from "react-native";
import HomeScreen from "../../components/homepage/home";
import OnboardingScreen from "../../components/onboarding/onboard";
import LoginScreen from "../../components/authentication/login"; // Import your login screen

const Tab = createBottomTabNavigator();

const App = () => {
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [isOnboardingVisible, setOnboardingVisible] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false); // State for login

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setSplashVisible(false);
    }, 7000);

    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    const checkOnboarding = async () => {
      const hasSeenOnboarding = await AsyncStorage.getItem("hasSeenOnboarding");
      if (hasSeenOnboarding) {
        setOnboardingVisible(false);
      }
    };
    checkOnboarding();
  }, []);

  const handleOnboardingDone = async () => {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    setOnboardingVisible(false);
  };

  const handleLogin = () => {
    setLoggedIn(true); // Set logged in state to true
  };

  if (isSplashVisible) {
    return (
      <View style={styles.splashContainer}>
        <Image
          source={require("../../assets/images/logo_dark.png")}
          style={styles.logo}
        />
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // After splash screen, continue with onboarding or main app
  return (
    <>
      {isOnboardingVisible ? (
        <OnboardingScreen onDone={handleOnboardingDone} />
      ) : isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          {/* Add other tab screens here if needed */}
        </Tab.Navigator>
      ) : (
        <LoginScreen onLogin={handleLogin} /> // Render login screen
      )}
    </>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default App;
