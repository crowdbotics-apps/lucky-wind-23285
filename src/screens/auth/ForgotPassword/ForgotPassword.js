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

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('window').height


@inject("userStore")

export default class ForgotPassword extends Component {

  state = {
    email: "",
    error: null,
    success: null
  }

  
async componentDidMount(){
    

}
  

async forgot(){
  this.setState({ error: null, success: null })
  const { email } = this.state
  if (email === "") {
    this.setState({ error: "Please enter your email" })
  }else{
      var formdata = new FormData();
      formdata.append("email", email);

      this.setState({ loading: true })
      var registerRes = await this.props.userStore.forgot(formdata)
      this.setState({ loading: false })

      if (registerRes && registerRes.error) {
        this.setState({ error: registerRes.message })
      }else{
        console.log("REGISTER RES : ", registerRes)
        this.setState({ success: registerRes.message })
      }
  }
}

  render() {

    const {error, email, loading, success} = this.state


    return (
      <ScrollView style={{ flex:1 }}>

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
                text={`Forgot Password?`}
                size={35}
                color={Theme.palette.primary}
                semibold
                style={{marginBottom: "1%"}}
              />
              <CustomText
                text={`Enter your email and we will send you a password resent link`}
                size={15}
                color={Theme.palette.primary}
                semibold
                style={{marginBottom: "20%"}}
              />

              {
                (error || success) && (
                  <ErrorBox errorText={error || success} success={success} />
                )
              }
              <Input
                placeholder="Enter your Email"
                iconImage={require('../../../assets/images/user_icon.png')}
                onChange={(value) => { this.setState({ email: value }) }}
                value={email}
              />

              <HorizontalContainer style={{ marginTop: "5%" }}>
                <Button
                  text="Submit"
                  textColor={Theme.palette.white}
                  bgColor={Theme.palette.primary}
                  width="40%"
                  radius={50}
                  onPress={()=>{ this.forgot() }}
                  loading={loading}
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
                  {/* <Button
                    text="Don't have account?"
                    textColor={Theme.palette.fieldColor}
                    radius={50}
                    transparent
                    onPress={()=>this.props.navigation.navigate("Login")}
                  /> */}
                  <Button
                    text="Sign in"
                    textColor={Theme.palette.secondary}
                    radius={50}
                    alignRight
                    underline
                    textAlign="right"
                    onPress={()=>this.props.navigation.navigate("Login")}

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