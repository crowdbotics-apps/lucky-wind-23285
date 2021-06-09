import React, { Component } from "react";
import { Easing, Animated, StatusBar, StyleSheet, Image, Text, ScrollView, TouchableOpacity, ImageBackground, Dimensions, View } from "react-native";
import FastImage from 'react-native-fast-image'
import Button from "../../../components/Button";
import { CenterContainer } from "../../../components/Container";
import { Theme } from "../../../components/Theme/Theme";
import Icon from 'react-native-vector-icons/FontAwesome';
import { LoginManager,AccessToken,
  AuthenticationToken, } from "react-native-fbsdk-next";

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('window').height - StatusBar.currentHeight
import { inject, observer } from "mobx-react";

import Circles from "./components/Circles";
import { s, vs, ms, mvs } from 'react-native-size-matters';
import { StorageUtils } from "../../../utils/storage";
import { navigate } from "../../../navigator/NavigationService";
import ErrorBox from "../../../components/ErrorBox";
@inject("userStore")
export default class Welcome extends Component {
  constructor() {
    super()
    this.logoSpringValue = new Animated.Value(0.3)

    this.logoPosition = new Animated.Value(0);
    this.circleOpacity = new Animated.Value(0.35);
    this.buttonOpacity = new Animated.Value(0)
  }

  state = {
    showSplash: true,
    loading:false,
    error: null
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
  }

  async sendFacebookRequest(token, code){
    var formdata = new FormData();
    formdata.append("access_token", token);
    formdata.append("code", code);

    this.setState({ loading: true })
    var registerRes = await this.props.userStore.facebookLogin(formdata)
    this.setState({ loading: false })
    if (registerRes && registerRes.error) {
      this.setState({ error: registerRes.message })
    }
  }

  facebookLogin = async () => {
    this.setState({ error: null })
    try {
      LoginManager.logOut()
      LoginManager.setLoginBehavior("web_only")
      const result = await LoginManager.logInWithPermissions(
        ['public_profile']
      );

      if (Platform.OS === 'ios') {
        tokenResult = await AuthenticationToken.getAuthenticationTokenIOS();
        this.sendFacebookRequest(result?.authenticationToken, result?.nonce)
      } else {
        const result = await AccessToken.getCurrentAccessToken();        
        this.sendFacebookRequest(result.accessToken, result.userID)
      }
    } catch (error) {
      console.log(error);
    }


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

    const { showSplash, error } = this.state

    return (
      <View style={{ flex: 1,backgroundColor:'#F4F4F4' }}>
        <Animated.View style={{ 
          marginTop: this.logoPosition,
          height: deviceHeight,
          backgroundColor: "#F4F4F4",
          alignItems: 'center',
          justifyContent: 'center',
          }}>

          
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
          {
              error && (
                <ErrorBox errorText={error}/>
              )
            }
          <Button
            text="Sign in"
            textColor={Theme.palette.white}
            width="80%"
            radius={50}
            bgColor={Theme.palette.primary}
            onPress={() => this.props.navigation.navigate("Login")}
            style={{ paddingVertical: ms(10), marginBottom: 15 }}
          />
          <Button
            text="Sign up"
            textColor={Theme.palette.white}
            width="80%"
            radius={50}
            bgColor={Theme.palette.secondary}
            onPress={() => this.props.navigation.navigate("Register")}
            style={{ paddingVertical: ms(10), marginBottom: 15 }}
          />
          <Button
            text="Sign in with Facebook"
            textColor={Theme.palette.white}
            width="80%"
            radius={50}
            bgColor={Theme.palette.facebookBtn}
            style={{ paddingVertical: ms(10), marginBottom: 15 }}
            icon={(<Icon name="facebook" color="#fff" size={ms(20)} style={{ marginRight:10 }} />)}
            onPress={()=>this.facebookLogin()}
            loading={this.state.loading}
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