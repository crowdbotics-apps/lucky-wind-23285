import React, { Component } from "react";
import { Easing, Animated, StatusBar, StyleSheet, Image, Text, ScrollView, TouchableOpacity, ImageBackground, Dimensions, View } from "react-native";
import FastImage from 'react-native-fast-image'
import Button from "../../../components/Button";
import { CenterContainer } from "../../../components/Container";
import { Theme } from "../../../components/Theme/Theme";


const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('window').height - StatusBar.currentHeight

import Circles from "./components/Circles";
import { s, vs, ms, mvs } from 'react-native-size-matters';
import { StorageUtils } from "../../../utils/storage";
import { navigate } from "../../../navigator/NavigationService";

export default class Welcome extends Component {
  constructor() {
    super()
    this.logoSpringValue = new Animated.Value(0.3)
    this.zeroImageSpringValue = new Animated.Value(270)
    this.firstImageSpringValue = new Animated.Value(400)
    this.secondImageSpringValue = new Animated.Value(530)
    this.thirdImageSpringValue = new Animated.Value(660)
    this.fourthImageSpringValue = new Animated.Value(790)
    this.fifthImageSpringValue = new Animated.Value(920)


    this.logoPosition = new Animated.Value(0);
    this.circleOpacity = new Animated.Value(0.35);
    this.buttonOpacity = new Animated.Value(0)
  }

  state = {
    showSplash: true
  }

  spring() {
    this.logoSpringValue.setValue(0.3)
    Animated.spring(
      this.logoSpringValue,
      {
        toValue: 1,
        friction: 4
      }
    ).start()
  }
  zerotImageSpring() {
    Animated.spring(this.zeroImageSpringValue, {
      toValue: 320,
      duration: 3000,
      easing: Easing.linear
    }).start()
  }
  firstImageSpring() {
    Animated.spring(this.firstImageSpringValue, {
      toValue: 450,
      duration: 3000,
      easing: Easing.linear
    }).start()
  }
  secondImageSpring() {
    Animated.spring(this.secondImageSpringValue, {
      toValue: 580,
      duration: 3000,
      easing: Easing.linear
    }).start()
  }
  thirdImageSpring() {
    Animated.spring(this.thirdImageSpringValue, {
      toValue: 710,
      duration: 3000,
      easing: Easing.linear
    }).start()

  }
  fourthImageSpring() {
    Animated.spring(this.fourthImageSpringValue, {
      toValue: 840,
      duration: 3000,
      easing: Easing.linear
    }).start()

  }

  fifthImageSpring() {
    Animated.spring(this.fifthImageSpringValue, {
      toValue: 970,
      duration: 3000,
      easing: Easing.linear
    }).start()

  }



  async componentDidMount() {

    setTimeout(async () => {
      this.setState({ showSplash: false })

      const token = await StorageUtils.getAccessToken();
      if (token) {
        navigate("Home")
      }

      this.moveLogoUp()
      setTimeout(() => {
        this.showLoginButtons()
      }, 1000)
    }, 1200)



    this.spring()

    setTimeout(() => {
      this.zerotImageSpring()
    }, 350)

    setTimeout(() => {
      this.firstImageSpring()
    }, 480)

    setTimeout(() => {
      this.secondImageSpring()
    }, 570)

    setTimeout(() => {
      this.thirdImageSpring()
    }, 670)
    setTimeout(() => {
      this.fourthImageSpring()
    }, 770)

    setTimeout(() => {
      this.fifthImageSpring()
    }, 870)
  }


  moveLogoUp = () => {
    Animated.timing(this.logoPosition, {
      toValue: -150,
      duration: 500
    }).start();
  }



  showLoginButtons = () => {
    Animated.timing(this.buttonOpacity, {
      toValue: 1,
      duration: 1000
    }).start();
  }




  render() {

    const { showSplash } = this.state

    return (
      <View style={{ flex: 1 }}>
        <Animated.View style={{ 
          marginTop: this.logoPosition,
          height: deviceHeight,
          backgroundColor: "#fff",
          alignItems: 'center',
          justifyContent: 'center' 
          }}>

          <Circles
            width={1230}
            height={1230}
            elevation={5.2}
          />
          <Circles
            width={1110}
            height={1110}
            elevation={5.3}
          />
          <Circles
            width={this.fifthImageSpringValue}//970
            height={this.fifthImageSpringValue}
            elevation={5.4}
          />
          <Circles
            width={this.fourthImageSpringValue}//840
            height={this.fourthImageSpringValue}
            elevation={5.5}
          />
          <Circles
            width={this.thirdImageSpringValue}//710
            height={this.thirdImageSpringValue}
            elevation={5.6}
          />

          <Circles
            width={this.secondImageSpringValue}//580
            height={this.secondImageSpringValue}
            elevation={5.7}
          /> 
          <Circles
            width={this.firstImageSpringValue}
            height={this.firstImageSpringValue}
            elevation={5.8}
          />
          <Circles
            width={this.zeroImageSpringValue}
            height={this.zeroImageSpringValue}
            elevation={5.9}
          />
          <Animated.Image
            source={require('../../../assets/images/vinologo.png')}
            style={{
              width: ms(170),
              height: ms(170),
              transform: [{ scale: this.logoSpringValue }],
              position: 'absolute',
              elevation: 10
            }}
            resizeMode="contain"
          />


        </Animated.View>
        <Animated.View style={{
          position: 'absolute',
          width: "100%",
          bottom: 50,
          opacity: this.buttonOpacity,
          alignItems: 'center'
        }}>
          <Button
            text="Sign in"
            textColor={Theme.palette.primary}
            width="45%"
            radius={50}
            transparent
            outline
            outlineColor={Theme.palette.primaryLight}
            onPress={() => this.props.navigation.navigate("Login")}
          />
          <Button
            text="Sign up"
            textColor={Theme.palette.secondary}
            width="45%"
            radius={50}
            transparent
            underline
            onPress={() => this.props.navigation.navigate("Register")}

          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    width: "100%",
    height: deviceHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  circles: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 1000
  }
});