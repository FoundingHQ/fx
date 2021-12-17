import React from "react";
import { View, StyleSheet } from "react-native";
import <%- h.changeCase.pascalCase(props.name) %>List from "../lib/<%- h.changeCase.camelCase(props.name) %>/ui/<%- h.changeCase.pascalCase(props.name) %>List";

export const <%- h.changeCase.pascalCase(props.name) %>ListScreen = () => {
  return (
    <View style={styles.container}>
      <<%- h.changeCase.pascalCase(props.name) %>List />
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

export default <%- h.changeCase.pascalCase(props.name) %>ListScreen;
