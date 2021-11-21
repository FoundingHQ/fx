import React from "react";
import { View, StyleSheet } from "react-native";
import <%= h.changeCase.pascalCase(props.name) %>New from "../lib/<%= h.changeCase.camelCase(props.name) %>/components/<%= h.changeCase.pascalCase(props.name) %>New";

export const <%= h.changeCase.pascalCase(props.name) %>NewScreen = () => {
  return (
    <View style={styles.container}>
      <<%= h.changeCase.pascalCase(props.name) %>New />
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

export default <%= h.changeCase.pascalCase(props.name) %>NewScreen;
