import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, Dimensions, ImageBackground, Modal, ScrollView } from "react-native";
import CustomText from "../../../../components/Text";

import Icon from 'react-native-vector-icons/FontAwesome';
import { Theme } from "../../../../components/Theme/Theme";
import BackButton from "../../../../components/BackButton";


const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('window').height


export default class HeaderStories extends React.Component {

  state={
    storyModal: true
  }
  render() {
    return (
      <View style={{
        width: deviceWidth / 5,
        height: 150,
        marginRight: 20,
      }}>
        <ImageBackground
          source={require('../../../../assets/images/header_border.png')}
          style={{
            width: deviceWidth / 5,
            height: 120,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          resizeMode="contain"
        >
          <TouchableOpacity onPress={() => {
            this.props.onPress()
          }}>
            <Image
              source={require('../../../../assets/images/storyimg1.png')}
              resizeMode="contain"
              style={{
                width: deviceWidth / 6.3,
                height: 120
              }}
            />
          </TouchableOpacity>
        </ImageBackground>
        <CustomText
          text={`Jennifer`}
          color={Theme.palette.primary}
          style={{
            alignSelf: 'center',
            marginTop: 10
          }}
        />
      </View>
    );
  }

}