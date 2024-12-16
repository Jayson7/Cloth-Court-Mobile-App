import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native";

import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

// Import Facebook icon from react-native-vector-icons
import Icon from "react-native-vector-icons/FontAwesome"; // Use FontAwesome or another icon set

export default function LoginScreen({ onLogin }) {
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const translateY = useSharedValue(100); // Animation start position
  const opacity = useSharedValue(0); // Animation start opacity

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const handleLogin = () => {
    console.log("Logged in with 2FA code:", twoFactorCode);
    onLogin();
  };

  // Animation on mount
  React.useEffect(() => {
    translateY.value = withTiming(0, {
      duration: 500,
      easing: Easing.out(Easing.exp),
    });
    opacity.value = withTiming(1, { duration: 500 });
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.imgLogin}
        source={require("../../assets/images/login.png")}
      />
      <Animated.View style={[styles.loginContainer, animatedStyle]}>
        <Text style={styles.title}>Welcome Back</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#666"
        />

        <Text style={styles.forgot}>Forgot Password</Text>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.forgot2}>Already have an account?</Text>
        <View style={styles.faLogin}>
          {/* Use the Icon component from react-native-vector-icons */}
          <Icon name="facebook" size={30} color="#3b5998" />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F3F4F6", // Light gray background for a modern look
  },
  imgLogin: {
    width: "100%",
    height: "40%",
  },
  loginContainer: {
    width: "100%",
    height: "60%",
    paddingVertical: 30,
    paddingHorizontal: 25,
    backgroundColor: "#FFF", // White background for card-like effect
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -3 },
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: "#0068ff",
    fontStyle: "italic",
  },
  input: {
    height: 50,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#FAFAFA",
    color: "#333",
    fontSize: 16,
  },
  loginButton: {
    height: 50,
    backgroundColor: "#26cf45", // A modern blue for the login button
    borderRadius: 8,
    justifyContent: "center",
    marginVertical: 10,

    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgot: {
    textAlign: "center",
    marginVertical: 10,
    color: "#b1a721",
    fontWeight: "bold",
  },
  forgot2: {
    textAlign: "center",
    marginVertical: 7,
    color: "#0068ff",
    fontWeight: "bold",
  },
  faLogin: {
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "center",
  },
});
