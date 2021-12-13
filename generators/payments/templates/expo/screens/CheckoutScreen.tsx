import React from "react";
import { View, StyleSheet } from "react-native";
import Checkout from "../lib/payments/ui/Checkout";

export const CheckoutScreen = () => {
  return (
    <View style={styles.container}>
      <Checkout />
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

export default CheckoutScreen;
