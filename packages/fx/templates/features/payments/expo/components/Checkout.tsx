import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Checkout = () => {
  return (
    <View style={styles.container}>
      <Text>Checkout</Text>
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

export default Checkout;
