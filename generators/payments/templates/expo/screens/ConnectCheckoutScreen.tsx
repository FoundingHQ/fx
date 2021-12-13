import React from "react";
import { View, StyleSheet } from "react-native";
import ConnectCheckout from "../lib/payments/ui/ConnectCheckout";

export const ConnectCheckoutScreen = () => {
  return (
    <View style={styles.container}>
      <ConnectCheckout />
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

export default ConnectCheckoutScreen;
