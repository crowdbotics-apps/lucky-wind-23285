import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, Dimensions, ImageBackground } from "react-native";
import CustomText from "../../../../components/Text";

import Icon from 'react-native-vector-icons/FontAwesome';
import { Theme } from "../../../../components/Theme/Theme";
import { HorizontalContainer } from "../../../../components/Container";

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('window').height


export default function PostControlls({ }) {
  return (
    <View style={{
      width: deviceWidth,
      height: 300,
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <HorizontalContainer style={{
        paddingHorizontal: "15%",
        width: "100%"
      }}>

        <TouchableOpacity>
          <Image
            source={require('../../../../assets/images/previous.png')}
            style={{
              width: 35,
              height: 35
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../../../assets/images/play.png')}
            style={{
              width: 70,
              height: 70
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../../../assets/images/forward.png')}
            style={{
              width: 35,
              height: 35
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </HorizontalContainer>
      <View style={{
        position: 'absolute',
        bottom: 10,
        left: 10
      }}>
        <TouchableOpacity>
          <Image
            source={require('../../../../assets/images/add.png')}
            style={{
              width: 30,
              height: 30,
              marginBottom: 10
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../../../assets/images/search.png')}
            style={{
              width: 30,
              height: 30
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}