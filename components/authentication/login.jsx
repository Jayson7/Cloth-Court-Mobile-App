import React from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

// import { imageLogin } from "../../assets/images/login.png";

//
export default function LoginScreen({ onLogin }) {
  const translateY = useSharedValue(100); // Start position for animation
  const opacity = useSharedValue(0); // Start opacity

  // Define animated styles
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

  const handleLogin = () => {
    // Handle login logic here
    console.log("Logged in");
    onLogin(); // Call the passed onLogin function
  };

  // Start the animation when the component mounts
  React.useEffect(() => {
    translateY.value = withTiming(0, {
      duration: 500,
      easing: Easing.out(Easing.exp),
    });
    opacity.value = withTiming(1, { duration: 500 });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.loginContainer, animatedStyle]}>
        <Image source={require("../../assets/images/login.png")} />
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },

  imgLogin: {
    width: "90%",
    height: "70%",
  },

  loginContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
