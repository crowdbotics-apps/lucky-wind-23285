import React from "react";
import { Text, View, TextInput, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Theme } from "../Theme/Theme";

import styles from "./styles";

export default function Input({ placeholder, iconImage, secureTextEntry, onChange, value }) {
  return (
    <View style={styles.container}>
      <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={Theme.palette.fieldColor}
            secureTextEntry={secureTextEntry}
            onChangeText={(value)=>onChange(value)}
            value={value}
      />
      <Image
        source={iconImage}
        style={styles.iconStyle}
        resizeMode="contain"
      />
    </View>
  );
}