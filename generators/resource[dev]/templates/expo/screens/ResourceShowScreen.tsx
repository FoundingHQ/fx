import React from "react";
import { View, StyleSheet } from "react-native";
import <%= h.changeCase.pascalCase(props.name) %>Show from "../lib/<%= h.changeCase.camelCase(props.name) %>/components/<%= h.changeCase.pascalCase(props.name) %>Show";

export const <%= h.changeCase.pascalCase(props.name) %>ShowScreen = () => {
  return (
    <View style={styles.container}>
      <<%= h.changeCase.pascalCase(props.name) %>ShowList />
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

export default <%= h.changeCase.pascalCase(props.name) %>ListShow;
