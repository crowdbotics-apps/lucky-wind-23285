import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { HorizontalContainer } from "../Container";



export default function TopToolBar({  }) {
  return (
    <HorizontalContainer style={{
      height: 50,
      padding: 20,
      marginTop: 20
    }}>
      <Image
        source={require('../../assets/images/vino.png')}
        style={{
          width: 40,
          height: 40
        }}
        resizeMode="contain"
      />
      <TouchableOpacity>
        <Image
          source={require('../../assets/images/profile.png')}
          style={{
            width: 40,
            height: 40
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </HorizontalContainer>
  );
}