import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native"; // Add Image import for app logo
import HomeScreen from "../../components/homepage/home"; // Your existing Home component
import OnboardingScreen from "../../components/onboarding/onboard"; // Import the onboarding screen

const Tab = createBottomTabNavigator();

const App = () => {
  const [isSplashVisible, setSplashVisible] = useState(true); // State for splash screen
  const [isOnboardingVisible, setOnboardingVisible] = useState(true);

  useEffect(() => {
    // Show splash screen for 7 seconds
    const splashTimer = setTimeout(() => {
      setSplashVisible(false);
    }, 7000); // 7 seconds

    return () => clearTimeout(splashTimer); // Clear timer on component unmount
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

  // Splash screen render for 7 seconds
  if (isSplashVisible) {
    return (
      <View style={styles.splashContainer}>
        {/* Replace this Image source with your actual app logo */}
        <Image
          source={require("../../assets/images/logo_dark.png")} // Path to your app logo
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
      ) : (
        <></>
      )}
    </>
  );
};

// Basic styles for splash screen
const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  logo: {
    width: 200, // Set appropriate width for your logo
    height: 200, // Set appropriate height for your logo
    marginBottom: 20,
  },
});

export default App;
