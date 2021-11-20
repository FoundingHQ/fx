import React from "react";
import { View, StyleSheet } from "react-native";
import RequestPasswordReset from "../lib/auth/components/RequestPasswordReset";

export const RequestPasswordResetScreen = () => {
  return (
    <View style={styles.container}>
      <RequestPasswordReset />
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

export default RequestPasswordResetScreen;
