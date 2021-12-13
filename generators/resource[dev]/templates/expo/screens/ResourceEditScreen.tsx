import React from "react";
import { View, StyleSheet } from "react-native";
import <%= h.changeCase.pascalCase(props.name) %>Edit from "../lib/<%= h.changeCase.camelCase(props.name) %>/ui/<%= h.changeCase.pascalCase(props.name) %>Edit";

export const <%= h.changeCase.pascalCase(props.name) %>EditScreen = () => {
  return (
    <View style={styles.container}>
      <<%= h.changeCase.pascalCase(props.name) %>Edit />
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

export default <%= h.changeCase.pascalCase(props.name) %>EditScreen;
