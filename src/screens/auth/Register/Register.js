import React, { Component } from "react";
import { StatusBar, SafeAreaView, StyleSheet, Image, Text, ScrollView, TouchableOpacity, ImageBackground, Dimensions, View } from "react-native";
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
export default class Register extends Component {


  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    loading: false,
    success: null
  }

  async componentDidMount() {


  }

  async signup() {
    this.setState({ error: null, success: null })
    const { name, email, password, confirmPassword } = this.state

    if (name === "") {
      this.setState({ error: "Please enter your name" })
    } else {
      if (email === "") {
        this.setState({ error: "Please enter your email" })
      }else{
        if(password === ""){
          this.setState({ error: "Please enter your password" })
        }else{
          if(confirmPassword === ""){
            this.setState({ error: "Please confirm your password" })
          }else{
            if(password !== confirmPassword){
              this.setState({ error: "Your passwords don't match, please check again." })
            }else{
              var formdata = new FormData();
              formdata.append("name", name);
              formdata.append("email", email);
              formdata.append("password", password);

              this.setState({ loading: true })
              var registerRes = await this.props.userStore.register(formdata)
              this.setState({ loading: false })
              console.log("RES : ", registerRes)
              if (registerRes && registerRes.error) {
                this.setState({ error: registerRes.message })
              }else{
                this.setState({ success: registerRes.message })
              }
            }
          }
        }
      }
    }


  }


  render() {

    const { error, name, email, password, confirmPassword, success } = this.state

    return (
      <ScrollView style={{ flex: 1 }}>
        <FastImage
          source={require('../../../assets/images/register_bg.png')}
          style={{
            width: "100%",
            height: deviceHeight - StatusBar.currentHeight
          }}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <ContentContainer style={{
              marginTop: 50,
              flex: 1
            }}>
              <CustomText
                text={`Create Your${'\n'}Account`}
                size={35}
                color={Theme.palette.primary}
                semibold
                style={{ marginBottom: "15%" }}
              />
              {
                (error || success) && (
                  <ErrorBox errorText={error || success} success={success} />
                )
              }

              <Input
                placeholder="Full Name"
                iconImage={require('../../../assets/images/user_icon.png')}
                onChange={(value) => { this.setState({ name: value }) }}
                value={name}
              />

              <Input
                placeholder="Phone or Email"
                iconImage={require('../../../assets/images/email_icon.png')}
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

              <Input
                placeholder="Confirm Password"
                iconImage={require('../../../assets/images/password_icon.png')}
                secureTextEntry
                onChange={(value) => { this.setState({ confirmPassword: value }) }}
                value={confirmPassword}


              />

              <HorizontalContainer style={{ marginTop: "5%" }}>
                <Button
                  text="Sign up"
                  textColor={Theme.palette.secondary}
                  bgColor={Theme.palette.secondary}
                  width="40%"
                  outline
                  outlineColor={Theme.palette.secondary}
                  transparent
                  radius={50}
                  loading={this.state.loading}
                  onPress={() => {
                    this.signup()
                  }}
                />
              </HorizontalContainer>

              <HorizontalContainer style={{ marginTop: -10, width: "100%", position: 'absolute', bottom: 0 }}>
                <TouchableOpacity>
                  <Image
                    source={require('../../../assets/images/arrow_right_blue.png')}
                    style={{
                      width: 30,
                      height: 30
                    }}
                  />
                </TouchableOpacity>
                <View>
                  <Button
                    text="Already have an account?"
                    textColor={Theme.palette.fieldColor}
                    radius={50}
                    transparent
                    onPress={() => this.props.navigation.navigate("Login")}
                  />
                  <Button
                    text="Sign in"
                    textColor={Theme.palette.primary}
                    radius={50}
                    alignRight
                    underline
                    textAlign="right"
                    onPress={() => this.props.navigation.navigate("Login")}

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