import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const ConnectCheckout = () => {
  return (
    <View style={styles.container}>
      <Text>ConnectCheckout</Text>
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

export default ConnectCheckout;
