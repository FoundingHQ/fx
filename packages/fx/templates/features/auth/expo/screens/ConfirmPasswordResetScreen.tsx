import React from "react";
import { View, StyleSheet } from "react-native";
import ConfirmPasswordReset from "../lib/auth/components/ConfirmPasswordReset";

export const ConfirmPasswordResetScreen = () => {
  return (
    <View style={styles.container}>
      <ConfirmPasswordReset />
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

export default ConfirmPasswordResetScreen;
