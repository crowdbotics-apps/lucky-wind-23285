import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { s, vs, ms, mvs } from 'react-native-size-matters';
import Spinner from 'react-native-spinkit'


import styles from "./styles";
import { Theme } from "../Theme/Theme";

export default function Button({ 
  text,
  textColor,
  width,
  transparent,
  onPress,
  loading,
  bgColor,
  radius,
  style,
  outline,
  outlineColor,
  underline,
  alignRight,
  regular
}) {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[
        styles.buttonContainer,
        {
          width:width||"100%",
          backgroundColor:transparent ? null : bgColor,
          borderRadius:radius||0, ...style,
          borderColor: outlineColor || Theme.palette.primary,
          borderWidth: outline ? 1.5 : 0
        }]}
      disabled={loading}
    >
      {
        loading ? (
          <Spinner
            isVisible={loading}
            size={30}
            type="ThreeBounce"
            color={"#a7a7a7"}
          />
        ):(
          <Text style={{ 
            textDecorationLine:underline ? "underline" : null,
            color:textColor,
            fontFamily: regular ? Theme.fontFamily.regular : Theme.fontFamily.medium,
            fontSize: 17,
            alignSelf:alignRight ? 'flex-end' : 'center'
            }}>
            {
              text
            }
          </Text>
        )
      }
      
    </TouchableOpacity>
  );
}