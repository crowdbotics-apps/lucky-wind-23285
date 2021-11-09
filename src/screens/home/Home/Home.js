import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { StatusBar, StyleSheet, Image, Text, ScrollView, TouchableOpacity, ImageBackground, Dimensions, View, Modal } from "react-native";
import FastImage from 'react-native-fast-image'
import Input from "../../../components/AuthInput";
import Button from "../../../components/Button";
import { ContentContainer, HorizontalContainer } from "../../../components/Container";
import CustomText from "../../../components/Text";
import { Theme } from "../../../components/Theme/Theme";
import { navigate } from "../../../navigator/NavigationService";
import TopToolBar from "../../../components/TopToolBar";
import HeaderStories from './Components/HeaderStories'
import FeedPost from './Components/FeedPost'
import BackButton from "../../../components/BackButton";
import Video from 'react-native-video';


const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('window').height



export default class Home extends Component {

    state = {
        storyModal: false
    }


    async componentDidMount() {


    }


    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <TopToolBar navigation={this.props.navigation} />
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{
                            paddingHorizontal: 20,
                            marginBottom: 20
                        }}
                    >
                        <HeaderStories onPress={() => { this.setState({ storyModal: true }) }} />
                        <HeaderStories onPress={() => { this.setState({ storyModal: true }) }} />
                        <HeaderStories onPress={() => { this.setState({ storyModal: true }) }} />
                        <HeaderStories onPress={() => { this.setState({ storyModal: true }) }} />
                        <HeaderStories onPress={() => { this.setState({ storyModal: true }) }} />
                    </ScrollView>

                    <FeedPost />

                </ScrollView>
                <Modal
                    visible={this.state.storyModal}
                    animationType="slide"
                >
                    <ScrollView 
                    style={{ flex: 1 }}
                    contentContainerStyle={{
                        alignItems:'center',
                        justifyContent:'center'
                    }}
                    >
                        <BackButton
                            navigation={this.props.navigation}
                            onPress={() => {
                                this.setState({
                                    storyModal: false
                                })
                            }}
                        />
                        <Video source={require('../../../assets/video/video1.mp4')}
                            ref={(ref) => {
                                // this.player = ref
                            }}
                            onBuffer={() => { }}
                            onError={() => { }}
                            resizeMode="cover"
                            style={{
                                width: deviceWidth,
                                height: deviceHeight
                            }} />
                    </ScrollView>
                </Modal>
            </SafeAreaView>
        );
    }
}