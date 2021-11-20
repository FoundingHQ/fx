import React from "react";
import { View, StyleSheet } from "react-native";
import <%= h.changeCase.pascalCase(name) %>Show from "../lib/<%= h.changeCase.camelCase(name) %>/components/<%= h.changeCase.pascalCase(name) %>Show";

export const <%= h.changeCase.pascalCase(name) %>ShowScreen = () => {
  return (
    <View style={styles.container}>
      <<%= h.changeCase.pascalCase(name) %>ShowList />
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

export default <%= h.changeCase.pascalCase(name) %>ListShow;
