import React from "react";
import { View, StyleSheet } from "react-native";
import Signup from "../lib/auth/components/Signup";

export const SignupScreen = () => {
  return (
    <View style={styles.container}>
      <Signup />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SignupScreen;
