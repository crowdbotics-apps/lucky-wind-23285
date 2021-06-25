import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { StatusBar,StyleSheet, Image, Text, ScrollView, TouchableOpacity,ImageBackground, Dimensions,View } from "react-native";
import FastImage from 'react-native-fast-image'
import Input from "../../../components/AuthInput";
import Button from "../../../components/Button";
import { ContentContainer, HorizontalContainer } from "../../../components/Container";
import ErrorBox from "../../../components/ErrorBox";
import CustomText from "../../../components/Text";
import { Theme } from "../../../components/Theme/Theme";
import { inject, observer } from "mobx-react";
import { NavigationEvents } from 'react-navigation';

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('window').height


@inject("userStore")

export default class Login extends Component {

  state = {
    email: "",
    password: "",
    error: null
  }

  
async componentDidMount(){
    

}
  

async login(){
  this.setState({ error: null })
  const { email, password } = this.state
  if (email === "") {
    this.setState({ error: "Please enter your email" })
  }else{
    if(password === ""){
      this.setState({ error: "Please enter your password" })
    }else{
      var formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);

      this.setState({ loading: true })
      var registerRes = await this.props.userStore.login(formdata)
      this.setState({ loading: false })

      if (registerRes && registerRes.error) {
        this.setState({ error: registerRes.message })
      }else{
        this.setState({ success: registerRes.message })
      }
    }
  }
}

  render() {

    const {error, email, password, loading} = this.state


    return (
      <ScrollView style={{ flex:1 }}>
          <NavigationEvents
              onDidBlur={payload => { this.setState({ error: null }) }}
          />
        <FastImage
          source={require('../../../assets/images/login_bg.png')}
          style={{
            width: "100%",
            height: deviceHeight - StatusBar.currentHeight
          }}
          resizeMode="cover"
        >
          <SafeAreaView style={{ flex:1 }}>
            <ContentContainer style={{
              marginTop: 50,
              flex: 1,
            }}>
              <CustomText
                text={`Hello, ${'\n'}Sign in!`}
                size={35}
                color={Theme.palette.primary}
                semibold
                style={{marginBottom: "10%"}}
              />

              {
                error && (
                  <ErrorBox errorText={error}/>
                )
              }
              <Input
                placeholder="Enter your Email"
                iconImage={require('../../../assets/images/user_icon.png')}
                onChange={(value) => { this.setState({ email: value }) }}
                value={email}
              />

              <Input
                placeholder="Password"
                iconImage={require('../../../assets/images/password_icon.png')}
                secureTextEntry
                onChange={(value) => { this.setState({ password: value }) }}
                value={password}
              />

              <HorizontalContainer style={{ marginTop: "5%" }}>
                <Button
                  text="Sign in"
                  textColor={Theme.palette.white}
                  bgColor={Theme.palette.primary}
                  width="40%"
                  radius={50}
                  onPress={()=>{ this.login() }}
                  loading={loading}
                />
                <Button
                  text="Forgot Password"
                  textColor={Theme.palette.fieldColor}
                  width="50%"
                  radius={50}
                  regular
                  transparent
                  onPress={()=>this.props.navigation.navigate("ForgotPassword")}
                />
              </HorizontalContainer>

              <HorizontalContainer style={{ marginTop: 20, width:"100%", position:'absolute', bottom: 0 }}>
                <TouchableOpacity>
                  <Image
                    source={require('../../../assets/images/arrow_right_red.png')}
                    style={{
                      width: 40,
                      height: 40
                    }}
                  />
                </TouchableOpacity>
                <View>
                  <Button
                    text="Don't have account?"
                    textColor={Theme.palette.fieldColor}
                    radius={50}
                    transparent
                    onPress={()=>this.props.navigation.navigate("Login")}
                  />
                  <Button
                    text="Sign up"
                    textColor={Theme.palette.secondary}
                    radius={50}
                    alignRight
                    underline
                    textAlign="right"
                    onPress={()=>this.props.navigation.navigate("Register")}

                  />
                </View>
                
              </HorizontalContainer>

            </ContentContainer>
          </SafeAreaView>
        </FastImage>
      </ScrollView>
    );
  }
}