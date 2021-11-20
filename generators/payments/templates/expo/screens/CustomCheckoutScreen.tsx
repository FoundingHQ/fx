import React from "react";
import { View, StyleSheet } from "react-native";
import CustomCheckout from "../lib/payments/components/CustomCheckout";

export const CustomCheckoutScreen = () => {
  return (
    <View style={styles.container}>
      <CustomCheckout />
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

export default CustomCheckoutScreen;
