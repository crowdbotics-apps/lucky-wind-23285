import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { StatusBar, StyleSheet, Image, Text, ScrollView, TouchableOpacity, ImageBackground, Dimensions, View } from "react-native";
import BackButton from "../../../components/BackButton";
import { HorizontalContainer } from "../../../components/Container";
import CustomText from "../../../components/Text";
import { Theme } from "../../../components/Theme/Theme";


const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('window').height



export default class Profile extends Component {




    async componentDidMount() {


    }


    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#FCFCFC" }}>
                <ScrollView style={{ flex: 1 }}>
                    <BackButton navigation={this.props.navigation} text="Settings" />

                    <HorizontalContainer style={{ marginTop: 20, marginBottom: 20, paddingHorizontal: 20, alignItems: 'center' }}>
                        <Image
                            source={require('../../../assets/images/profile2.png')}
                            style={{
                                width: 150,
                                height: 100
                            }}
                            resizeMode='contain'
                        />
                        <View style={{ width: "100%" }}>
                            <HorizontalContainer noSpaceBetween style={{ marginLeft: 20, alignItems: 'center', marginBottom: 5 }}>
                                <Image
                                    source={require('../../../assets/images/profile_red.png')}
                                    style={{
                                        width: 20,
                                        height: 20
                                    }}
                                    resizeMode="contain"
                                />
                                <CustomText
                                    text={`Sydney Anning`}
                                    color={"#000"}
                                    style={{
                                        marginLeft: 10
                                    }}
                                />
                            </HorizontalContainer>
                            <HorizontalContainer noSpaceBetween style={{ marginLeft: 20, alignItems: 'center' }}>
                                <Image
                                    source={require('../../../assets/images/phone.png')}
                                    style={{
                                        width: 20,
                                        height: 20
                                    }}
                                    resizeMode="contain"
                                />
                                <CustomText
                                    text={`+32154548848`}
                                    color={"#000"}
                                    style={{
                                        marginLeft: 10
                                    }}
                                />
                            </HorizontalContainer>
                        </View>
                    </HorizontalContainer>


                    <View style={{
                        backgroundColor: '#fff',
                        marginHorizontal: 10,
                        paddingBottom: 15
                    }}>
                        <View style={{
                            width: "100%",
                            borderLeftColor: Theme.palette.secondary,
                            borderLeftWidth: 5,
                            paddingVertical: 13
                        }}>
                            <CustomText
                                text={`Bio`}
                                color={"#000"}
                                style={{
                                    marginLeft: 20,
                                    color: Theme.palette.primary
                                }}
                            />
                        </View>
                        <CustomText
                            text={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the`}
                            color={"#000"}
                            style={{
                                marginLeft: 25,
                                color: "#000"
                            }}
                        />
                    </View>

                    <View style={{
                        backgroundColor: '#fff',
                        marginHorizontal: 10,
                        paddingBottom: 15
                    }}>
                        <View style={{
                            width: "100%",
                            borderLeftColor: Theme.palette.secondary,
                            borderLeftWidth: 5,
                            paddingVertical: 13
                        }}>
                            <CustomText
                                text={`Description`}
                                color={"#000"}
                                style={{
                                    marginLeft: 20,
                                    color: Theme.palette.primary
                                }}
                            />
                        </View>
                        <CustomText
                            text={`Lorem Ipsum is simply dummy text of the printing and typesetting industry.`}
                            color={"#000"}
                            style={{
                                marginLeft: 25,
                                color: "#000"
                            }}
                        />
                    </View>

                    <CustomText
                        text={`Blocked Users`}
                        color={"#000"}
                        semibold
                        style={{
                            color: "#000",
                            textAlign:'center',
                            marginTop: 10
                        }}
                    />



                </ScrollView>
            </SafeAreaView>
        );
    }
}