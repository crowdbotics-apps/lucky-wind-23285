import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";

export default function ErrorBox({ errorText, success }) {
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", color: success ? 'green' : 'red' }}>
        {errorText}
      </Text>
    </View>
  );
}