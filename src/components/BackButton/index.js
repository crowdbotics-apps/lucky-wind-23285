import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { s, vs, ms, mvs } from 'react-native-size-matters';
import Spinner from 'react-native-spinkit';


import { Theme } from '../Theme/Theme';
import CustomText from '../Text';

import { HorizontalContainer } from '../Container';

export default function BackButton({
    navigation,
    text,
    onPress
}) {
    return (
        <View style={{ 
            width: "100%",
            height: 50,
            marginTop: 20,
            paddingLeft: 20,
            flexDirection: 'row',
            alignItems:'center'
        }}>
            <TouchableOpacity
                onPress={() => {
                    if(onPress){
                        onPress()
                        return
                    }
                    navigation.navigate("Home")
                }}
                style={{

                }}
            >
                <Image
                    source={require('../../assets/images/back_icon.png')}
                    style={{
                        width: 20,
                        height: 20
                    }}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            {
                text && (
                    <CustomText
                        text={text}
                        size={16}
                        color={"#000"}
                        semibold
                        style={{
                            textAlign: 'center',
                            width: "80%"
                        }}
                    />
                )
            }
        </View>

    );
}
