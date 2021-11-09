import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { StatusBar, StyleSheet, Image, Text, ScrollView, TouchableOpacity, ImageBackground, Dimensions, View } from "react-native";

import { navigate } from "../../../navigator/NavigationService";
import Button from "../../../components/Button";

import { StorageUtils } from "../../../utils/storage";
import { Theme } from "../../../components/Theme/Theme";

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('window').height



export default class Feed extends Component {

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