
import React from "react";
import { Text, View, TouchableOpacity, Animated } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import LinearGradient from 'react-native-linear-gradient';
import { s, vs, ms, mvs } from 'react-native-size-matters';
import { Theme } from "../../../../components/Theme/Theme";
import { ImageBackground } from "react-native";

export default function Circles({
    width,
    height,
    elevation
}) {
    return (
        <Animated.View style={{
            width: width,
            height: height,
            borderRadius: 1000,
            shadowColor: "#000",
            shadowOffset: {
                width: 2,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 5,
            elevation: elevation,
            backgroundColor: '#EAEAEA',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
        }}>

            {/* <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                colors={['#D9D9D9', '#E1E1E1','#E7E7E7', '#ECECEC','#EFEFEF']}
                style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 1000,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                

            </LinearGradient> */}
        </Animated.View>
    );
}