import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, Dimensions, ImageBackground } from "react-native";
import CustomText from "../../../../components/Text";

import Icon from 'react-native-vector-icons/FontAwesome';
import { Theme } from "../../../../components/Theme/Theme";

import { HorizontalContainer } from "../../../../components/Container";
import PostControlls from './PostControlls'
const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('window').height


export default function FeedPost({ }) {
  return (
    <View style={{

    }}>
      <HorizontalContainer style={{
        marginBottom: 10,
        paddingLeft: 10
      }}
        noSpaceBetween
      >
        <Image
          source={require('../../../../assets/images/profile1.png')}
          style={{
            width: 40,
            height: 40
          }}
          resizeMode="contain"
        />
        <CustomText
          text={`Sidney Anning`}
          color={Theme.palette.primary}
          style={{
            alignSelf: 'center',
            marginLeft: 20
          }}
        />
      </HorizontalContainer>
      <ImageBackground
        source={require('../../../../assets/images/post1.png')}
        style={{
          width: deviceWidth,
          height: 300
        }}
        resizeMode="cover"
      >
        <PostControlls />
        
      </ImageBackground>
      <HorizontalContainer style={{
        alignItems: 'center'
      }}>
        <View style={{}}>
          <CustomText
            text={`Sidney Anning`}
            color={Theme.palette.primary}
            style={{
              marginLeft: 10,
              marginTop: 10
            }}
          />
          <CustomText
            text={`Lorem ipsum dolor sit amet`}
            color={Theme.palette.secondary}
            style={{
              marginLeft: 10,
              marginTop: -5
            }}
          />
        </View>
        <TouchableOpacity style={{
          marginRight: 20,
          alignItems: 'center',
          marginTop: 10
        }}>
          <Image
            source={require('../../../../assets/images/post_video.png')}
            style={{
              width: 30,
              height: 20
            }}
            resizeMode="contain"
          />
          <CustomText
            text={`Reply`}
            color={Theme.palette.primary}
            style={{
              marginTop: 5
            }}
          />
        </TouchableOpacity>
      </HorizontalContainer>
    </View>
  );
}