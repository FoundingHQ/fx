import React from "react";
import { View, StyleSheet } from "react-native";
import Subscription from "../lib/payments/ui/Subscription";

export const SubscriptionScreen = () => {
  return (
    <View style={styles.container}>
      <Subscription />
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

export default SubscriptionScreen;
