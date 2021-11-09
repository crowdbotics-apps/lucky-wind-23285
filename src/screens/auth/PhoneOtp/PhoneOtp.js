import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { StatusBar, StyleSheet, Image, Text, ScrollView, TouchableOpacity, ImageBackground, Dimensions, View } from "react-native";
import FastImage from 'react-native-fast-image'
import Input from "../../../components/AuthInput";
import Button from "../../../components/Button";
import { ContentContainer, HorizontalContainer } from "../../../components/Container";

import BackButton from "../../../components/BackButton";
import { NavigationEvents } from "react-navigation";
import ErrorBox from "../../../components/ErrorBox";
import CustomText from "../../../components/Text";
import { Theme } from "../../../components/Theme/Theme";
import { inject, observer } from "mobx-react";
import { s, vs, ms, mvs } from 'react-native-size-matters';
import OTPInputView from '@twotalltotems/react-native-otp-input'
const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('window').height

@inject("userStore")
export default class Contact extends Component {

    async componentDidMount() {


    }


    render() {

        return (
            <ScrollView style={{ flex: 1 }}>
                <NavigationEvents
                    onDidBlur={payload => { this.setState({ error: null }) }}
                />
                <FastImage
                    source={require('../../../assets/images/login_bg.png')}
                    style={{
                        width: "100%",
                        height: deviceHeight - StatusBar.currentHeight,
                        paddingHorizontal: 30
                    }}
                    resizeMode="cover"
                >
                    <CustomText
                        text={`Please enter your four digit token`}
                        color={"#727272"}
                        style={{
                            alignSelf: "center",
                            marginTop: deviceHeight / 2.7
                        }}
                    />
                    <OTPInputView
                        pinCount={4}
                        style={{
                            marginTop: 0,
                            height: 100,
                        }}
                        codeInputFieldStyle={{
                            backgroundColor: "#F5F6F7",
                            borderWidth: 0,
                            borderRadius: 7,
                            width: 60,
                            height: 60,
                            color: "#000"
                        }}
                        codeInputHighlightStyle={{
                            borderWidth: 1,
                            borderColor: Theme.palette.primary
                        }}
                    />

                    <Button
                        text="Sign in"
                        textColor={Theme.palette.white}
                        bgColor={Theme.palette.primary}
                        width="40%"
                        radius={50}
                        onPress={() => {  }}
                        style={{
                            marginTop: 20
                        }}
                    />
                    <HorizontalContainer style={{ marginTop: 20, width: "100%", position: 'absolute', bottom: 0 }}>
                        <View/>
                        <View>
                            <Button
                                text="Didn't receive code yet?"
                                textColor={Theme.palette.fieldColor}
                                radius={50}
                                transparent
                                onPress={() => {

                                }}
                            />
                            <Button
                                text="Resend Code"
                                textColor={Theme.palette.secondary}
                                radius={50}
                                alignRight
                                underline
                                textAlign="right"
                                onPress={() => {  }}

                            />
                        </View>

                    </HorizontalContainer>

                </FastImage>

            </ScrollView>
        );
    }
}