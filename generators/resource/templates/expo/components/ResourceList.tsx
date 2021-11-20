import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const <%= h.changeCase.pascalCase(name) %>List = () => {
  return (
    <View style={styles.container}>
      <Text><%= h.changeCase.pascalCase(name) %> List</Text>
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

export default <%= h.changeCase.pascalCase(name) %>List;
