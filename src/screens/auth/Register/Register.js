import React, { Component } from "react";
import { StatusBar, SafeAreaView, StyleSheet, Image, Text, ScrollView, TouchableOpacity, ImageBackground, Dimensions, View, Modal } from "react-native";
import FastImage from 'react-native-fast-image'
import Input from "../../../components/AuthInput";
import Button from "../../../components/Button";
import { ContentContainer, HorizontalContainer } from "../../../components/Container";
import ErrorBox from "../../../components/ErrorBox";
import CustomText from "../../../components/Text";
import { Theme } from "../../../components/Theme/Theme";
import { inject, observer } from "mobx-react";
import { NavigationEvents } from 'react-navigation';
import { CheckBox } from 'react-native-elements';
import BackButton from "../../../components/BackButton";
import { s, vs, ms, mvs } from 'react-native-size-matters';

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
    success: null,
    error: null,
    termsModal: false,
    privacy: false,
    terms: false
  }

  async componentDidMount() {


  }

  validateEmail(emailAdress) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAdress.match(regexEmail)) {
      return true;
    } else {
      return false;
    }
  }

  async signup() {
    this.setState({ error: null, success: null })
    const { name, email, password, confirmPassword } = this.state

    if (name === "") {
      this.setState({ error: "Please enter your name" })
    } else {
      if (email === "") {
        this.setState({ error: "Please enter your email or phone" })
      } else {
        if (password === "") {
          this.setState({ error: "Please enter your password" })
        } else {
          if (confirmPassword === "") {
            this.setState({ error: "Please confirm your password" })
          } else {
            if (password !== confirmPassword) {
              this.setState({ error: "Your passwords don't match, please check again." })
            } else {
              this.setState({ termsModal: true, terms: false, privacy: false })
            }
          }
        }
      }
    }
  }

  async sendData() {
    const { name, email, password, confirmPassword } = this.state
    this.setState({ termsModal: false })

    var formdata = new FormData();
    formdata.append("name", name);
    if (this.validateEmail(email)) {
      formdata.append("email", email);
    } else {
      formdata.append("phone", email);
    }
    formdata.append("password", password);
    console.log("FORM DATA : ", formdata)
    this.setState({ loading: true })
    var registerRes = await this.props.userStore.register(formdata)
    this.setState({ loading: false })
    console.log("RES : ", registerRes)
    if (registerRes && registerRes.error) {
      this.setState({ error: registerRes.message })
    } else {
      this.setState({ success: registerRes.message })
    }
  }


  render() {

    const { error, name, email, password, confirmPassword, success } = this.state

    return (
      <ScrollView style={{ flex: 1 }}>
        <NavigationEvents
          onDidBlur={payload => { this.setState({ error: null }) }}
        />
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
                size={30}
                color={Theme.palette.primary}
                semibold
                style={{ marginBottom: "2%" }}
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

              <HorizontalContainer style={{ marginTop: -10, width: "100%" }}>
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

        <Modal
          visible={this.state.termsModal}
          animationType="slide"
        >
          <ScrollView style={{ flex: 1 }}>
            <BackButton
              navigation={this.props.navigation}
              onPress={() => {
                this.setState({
                  termsModal: false
                })
              }}
            />
            <Image
              source={require('../../../assets/images/vinologo.png')}
              style={{
                width: ms(110),
                height: ms(110),
                alignSelf: 'center',
              }}
              resizeMode="contain"
            />
            <CustomText
              text={`Terms and Conditions`}
              size={15}
              color={Theme.palette.secondary}
              semibold
              style={{ alignSelf: 'center', marginTop: 30 }}
            />

            <CustomText
              text={`These Mobile app Standard Terms and Conditions written on this webpage shall manage your use of our Mobile Name accessible at Website.com.`}
              size={12}
              style={{ alignSelf: 'center', marginTop: 20, marginHorizontal: 30, textAlign: 'center' }}
            />
            <CustomText
              text={`These Terms will be applied fully and affect to your use of this Website. By using this Website, you agreed to accept all terms and conditions written in here. You must not use this Website if you disagree with any of these Website Standard Terms and Conditions.`}
              size={12}
              style={{ alignSelf: 'center', marginTop: 10, marginHorizontal: 30, textAlign: 'center' }}
            />
            <CustomText
              text={`Minors or people below 18 years old are not allowed to use this Website.`}
              size={12}
              style={{ alignSelf: 'center', marginTop: 10, marginHorizontal: 30, textAlign: 'center' }}
            />

            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
              marginBottom: 50
            }}>
              <CustomText
                text={`Read full`}
                size={12}
                style={{ color: Theme.palette.muteText }}
              />
              <TouchableOpacity style={{

              }}>
                <CustomText
                  text={`Terms & Conditions`}
                  size={12}
                  style={{ color: Theme.palette.secondary, marginLeft: 10 }}
                />
              </TouchableOpacity>
            </View>

            <HorizontalContainer noSpaceBetween style={{
              marginBottom: 0,
              height: 30,
              width: "100%",
              justifyContent: 'center'
            }}>
              <CheckBox
                checked={this.state.terms}
                onPress={() => {
                  this.setState({
                    terms: !this.state.terms
                  })
                }}
              />
              <CustomText
                text={`I agree with the Terms & Conditions`}
                size={13}
                style={{ color: Theme.palette.muteText, marginLeft: -10 }}
              />
            </HorizontalContainer>
            <HorizontalContainer 
              noSpaceBetween 
              style={{ 
                marginBottom: 20,
                height: 30,
                justifyContent: 'center'
              }}>
              <CheckBox
                checked={this.state.privacy}
                onPress={() => {
                  this.setState({
                    privacy: !this.state.privacy
                  })
                }}
              />
              <CustomText
                text={`I agree with ViNo`}
                size={13}
                style={{ color: Theme.palette.muteText, marginLeft: -10 }}
              />
              <TouchableOpacity style={{

              }}>
                <CustomText
                  text={` Privacy Policy${' '}${' '}${' '}${' '}${' '}${' '}${' '}${' '}${' '}${' '}${' '}${' '}`}
                  size={12}
                  style={{ color: Theme.palette.secondary }}
                />
              </TouchableOpacity>
            </HorizontalContainer>

            <View style={{ alignItems: 'center' }}>
              <Button
                text="Continue"
                textColor={Theme.palette.white}
                bgColor={Theme.palette.primary}
                width="40%"
                radius={50}
                onPress={() => {
                  if(this.state.privacy && this.state.terms){
                    this.sendData() 
                  }else{
                    alert("Please accept both our terms and privacy to proceed")
                  }
                }}
              />
            </View>
          </ScrollView>
        </Modal>
      </ScrollView>
    );
  }
}