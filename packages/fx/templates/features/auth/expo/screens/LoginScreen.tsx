import React from "react";
import { View, StyleSheet } from "react-native";
import Login from "../lib/auth/components/Login";

export const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Login />
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

export default LoginScreen;
