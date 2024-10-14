// Onboarding.js
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

const slides = [
  {
    key: "one",
    title: "Welcome to Our App!",
    text: "Discover amazing features.",
    backgroundColor: "#59b2ab",
  },
  {
    key: "two",
    title: "Stay Connected!",
    text: "Connect with your friends.",
    backgroundColor: "#febe29",
  },
  {
    key: "three",
    title: "Get Started!",
    text: "Join us today.",
    backgroundColor: "#22bcb5",
  },
];

const OnboardingScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  const onDone = () => {
    navigation.replace("Home"); // Navigate to Home screen after onboarding
  };

  return (
    <AppIntroSlider renderItem={renderItem} data={slides} onDone={onDone} />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  text: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export default OnboardingScreen;
