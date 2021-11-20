import React from "react";
import { View, StyleSheet } from "react-native";
import ConnectOnboarding from "../lib/payments/components/ConnectOnboarding";

export const ConnectOnboardingScreen = () => {
  return (
    <View style={styles.container}>
      <ConnectOnboarding />
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

export default ConnectOnboardingScreen;
