import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Image, ActivityIndicator, StyleSheet } from "react-native";
import HomeScreen from "../../components/homepage/home";
import OnboardingScreen from "../../components/onboarding/onboard";
import LoginScreen from "../../components/authentication/login";

const Stack = createStackNavigator();

const App = () => {
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [isOnboardingVisible, setOnboardingVisible] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);

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
    setLoggedIn(true);
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

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isOnboardingVisible ? (
          <Stack.Screen name="Onboarding" options={{ headerShown: false }}>
            {() => <OnboardingScreen onDone={handleOnboardingDone} />}
          </Stack.Screen>
        ) : isLoggedIn ? (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {() => <LoginScreen onLogin={handleLogin} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
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
