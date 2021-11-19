import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const RequestPasswordReset = () => {
  return (
    <View style={styles.container}>
      <Text>RequestPasswordReset</Text>
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

export default RequestPasswordReset;
