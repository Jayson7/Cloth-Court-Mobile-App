import React from "react";
import { Image, StyleSheet } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { NavigationProp, RouteProp } from "@react-navigation/native";

// Define props interface
interface OnboardingScreenProps {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
  onDone: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onDone }) => {
  return (
    <Onboarding
      onDone={onDone}
      onSkip={onDone}
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../../assets/images/img1.png")}
              style={styles.image}
            />
          ),
          title: "Welcome to Cloth Court",
          subtitle:
            "Your one-stop destination for trendy clothing and accessories.",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../../assets/images/img2.png")}
              style={styles.image}
            />
          ),
          title: "Discover Amazing Features",
          subtitle:
            "Browse through our extensive collection and find your style.",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../../assets/images/img3.png")}
              style={styles.image}
            />
          ),
          title: "Join Our Community",
          subtitle: "Connect with fashion enthusiasts and share your looks!",
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
});

export default OnboardingScreen;
