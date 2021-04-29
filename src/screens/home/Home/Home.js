import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { StatusBar, StyleSheet, Image, Text, ScrollView, TouchableOpacity, ImageBackground, Dimensions, View } from "react-native";
import FastImage from 'react-native-fast-image'
import Input from "../../../components/AuthInput";
import Button from "../../../components/Button";
import { ContentContainer, HorizontalContainer } from "../../../components/Container";
import CustomText from "../../../components/Text";
import { Theme } from "../../../components/Theme/Theme";
import { navigate } from "../../../navigator/NavigationService";
import { StorageUtils } from "../../../utils/storage";

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('window').height



export default class Home extends Component {




    async componentDidMount() {


    }


    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ flex:1,alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 50, marginBottom: 100 }}>LoggedIn</Text>
                        <Button
                            text="Logout"
                            textColor={Theme.palette.secondary}
                            bgColor={Theme.palette.secondary}
                            width="40%"
                            outline
                            outlineColor={Theme.palette.secondary}
                            transparent
                            radius={50}
                            onPress={() => {
                                StorageUtils.removeAccessToken();
                                navigate("Login")
                            }}
                        />
                    </View>

                </ScrollView>
            </SafeAreaView>
        );
    }
}