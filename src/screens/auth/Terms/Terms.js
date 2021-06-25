import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { StatusBar, StyleSheet, Image, Text, ScrollView, TouchableOpacity, ImageBackground, Dimensions, View } from "react-native";
import FastImage from 'react-native-fast-image'
import Input from "../../../components/AuthInput";
import Button from "../../../components/Button";
import { ContentContainer, HorizontalContainer } from "../../../components/Container";

import BackButton from "../../../components/BackButton";

import ErrorBox from "../../../components/ErrorBox";
import CustomText from "../../../components/Text";
import { Theme } from "../../../components/Theme/Theme";
import { inject, observer } from "mobx-react";
import { s, vs, ms, mvs } from 'react-native-size-matters';
import { CheckBox } from 'react-native-elements';
const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('window').height


@inject("userStore")
export default class Contact extends Component {


    state={
        privacy: false,
        terms: false
    }

    async componentDidMount() {


    }


    render() {

        return (
            <ScrollView style={{ flex: 1 }}>
                <BackButton navigation={this.props.navigation} />
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
                    marginLeft: 50,
                    marginBottom: 0,
                    height: 30 }}>
                    <CheckBox
                        checked={this.state.terms}
                        onPress={()=>{
                            this.setState({
                                terms: !this.state.terms
                            })
                        }}
                    />
                    <CustomText
                        text={`I agree with the Terms & Conditions`}
                        size={13}
                        style={{ color: Theme.palette.muteText }}
                    />
                </HorizontalContainer>
                <HorizontalContainer noSpaceBetween style={{ marginLeft: 50, marginBottom: 20, height: 30 }}>
                    <CheckBox
                        checked={this.state.privacy}
                        onPress={()=>{
                            this.setState({
                                privacy: !this.state.privacy
                            })
                        }}
                    />
                    <CustomText
                        text={`I agree with ViNo`}
                        size={13}
                        style={{ color: Theme.palette.muteText }}
                    />
                    <TouchableOpacity style={{

                    }}>
                        <CustomText
                            text={`Privacy Policy`}
                            size={12}
                            style={{ color: Theme.palette.secondary, marginLeft: 10 }}
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
                        onPress={() => { this.props.navigation.navigate("Login") }}
                    />
                </View>
            </ScrollView>
        );
    }
}