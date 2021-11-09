import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, Dimensions, ImageBackground, Modal, ScrollView } from "react-native";
import CustomText from "../../../../components/Text";

import Icon from 'react-native-vector-icons/FontAwesome';
import { Theme } from "../../../../components/Theme/Theme";
import BackButton from "../../../../components/BackButton";


import { HorizontalContainer } from "../../../../components/Container";
import PostControlls from './PostControlls'
import Video from 'react-native-video';
const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('window').height


export default class FeedPost extends React.Component {

  state = {
    videoPaused: true,
    firstLoad: true,
  }


  render() {
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
        <View
          style={{
            width: deviceWidth,
            height: 300
          }}
        >
          <Video source={require('../../../../assets/video/video1.mp4')}
            ref={(ref) => {
              this.player = ref
            }}
            paused={this.state.videoPaused}
            onBuffer={() => { }}
            onError={() => { }}
            resizeMode="cover"
            style={{
              width: deviceWidth,
              height: 300
            }} />
          {
            this.state.firstLoad && (
              <Image
                source={require('../../../../assets/images/post1.png')}
                resizeMode="cover"
                style={{
                  width: deviceWidth,
                  height: 300,
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
              />
            )
          }
          <PostControlls
            paused={this.state.videoPaused}
            onPlayPress={() => {
              this.setState({
                videoPaused: !this.state.videoPaused,
                firstLoad: false
              })
            }}
            onFFPress={() => {

            }}
            onRWPress={() => {

            }}
          />
        </View>
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

}