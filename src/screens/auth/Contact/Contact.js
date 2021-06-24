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

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('window').height
const contactInfo = [
    {
        title: "Website",
        value: "www.videonote.com"
    },
    {
        title: "Phone Number",
        value: "+32544353423"
    },
    {
        title: "Instagram",
        value: "ViNO"
    },
    {
        title: "Facebook",
        value: "ViNO"
    }
]

@inject("userStore")
export default class Contact extends Component {




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
                    text={`Contact Us`}
                    size={15}
                    color={Theme.palette.secondary}
                    semibold
                    style={{ alignSelf: 'center', marginTop: 50 }}
                />
                {
                    contactInfo.map((co) => (
                        <View style={{ marginBottom: 20 }}>
                            <CustomText
                                text={co.title}
                                size={15}
                                color={Theme.palette.fieldColor}
                                semibold
                                style={{ alignSelf: 'center' }}
                            />
                            <CustomText
                                text={co.value}
                                size={15}
                                color={Theme.palette.fieldColor}
                                style={{ alignSelf: 'center' }}
                            />
                        </View>
                    ))
                }
                <View style={{ alignItems:'center' }}>
                    <Button
                    text="Continue"
                    textColor={Theme.palette.white}
                    bgColor={Theme.palette.primary}
                    width="40%"
                    radius={50}
                    onPress={()=>{ this.props.navigation.navigate("Login") }}
                    />
                </View>
            </ScrollView>
        );
    }
}