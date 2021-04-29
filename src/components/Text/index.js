import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Theme } from "../Theme/Theme";


export default function CustomText({ text, color, thin, size, spacing, style, bold,semibold }) {
  return (
    <Text style={[{
        fontFamily: semibold ? Theme.fontFamily.semi : Theme.fontFamily.regular,
        color:color || "#000",
        fontSize: size || 14,
        letterSpacing: spacing || 0,
        fontWeight:bold ? '600' : "normal"
    },{...style}]}>{text}</Text>
  );
}