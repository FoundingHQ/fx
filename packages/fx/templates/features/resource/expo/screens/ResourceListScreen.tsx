import React from "react";
import { View, StyleSheet } from "react-native";
import <%= h.changeCase.pascalCase(name) %>List from "../lib/<%= h.changeCase.camelCase(name) %>/components/<%= h.changeCase.pascalCase(name) %>List";

export const <%= h.changeCase.pascalCase(name) %>ListScreen = () => {
  return (
    <View style={styles.container}>
      <<%= h.changeCase.pascalCase(name) %>List />
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

export default <%= h.changeCase.pascalCase(name) %>ListScreen;
