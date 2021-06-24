import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { s, vs, ms, mvs } from 'react-native-size-matters';
import Spinner from 'react-native-spinkit';


import { Theme } from '../Theme/Theme';
import { HorizontalContainer } from '../Container';

export default function BackButton({
    navigation
}) {
    return (
        <View style={{ width: "100%", height: 50, marginTop: 20, paddingLeft: 20 }}>
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack()
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
        </View>

    );
}
