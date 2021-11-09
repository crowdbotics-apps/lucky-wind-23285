import React from 'react';
import { SafeAreaView } from 'react-native';
import {
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Platform,
  StyleSheet,
  Text,
  Dimensions,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Theme } from '../components/Theme/Theme';
const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('window').height - StatusBar.currentHeight
const routes = [
  {
    // name: "Feed",
    screen: "Feed",
    icon: require('../assets/images/feed.png'),
    // iconSelected: require('../assets/images/home.png'),

  },
  {
    // name: "Home",
    screen: "Home",
    icon: require('../assets/images/home.png'),
    // iconSelected: require('../assets/images/events.png'),

  },
  {
    name: "Video",
    screen: "Video",
    icon: require('../assets/images/video.png'),
    // iconSelected: require('../assets/images/photos.png'),

  }
]


export default class BottomMenu extends React.Component {


  render() {
    const { navigationState, navigation, position } = this.props




    return (
      <SafeAreaView style={{ backgroundColor: Theme.palette.black }}>
        <View style={{
          height: 60,
          backgroundColor: 'seashell',
          flexDirection: "row",
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: "#fff",
          paddingBottom: 15
        }}>
          {routes.map((data, index) => {
            return (
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  marginBottom: - 10,
                  width: deviceWidth / 5
                }}
                onPress={() => {
                  this.props.navigation.navigate(data.screen)
                }}
              >
                <Image
                //   source={navigation.state.index === index ? data.iconSelected : data.icon}
                source={data.icon}
                  style={{
                    width: 30,
                    height: 30,
                    marginBottom: 5
                  }}
                  resizeMode="contain"
                />
                {/* <Text style={{
                  fontSize: 12,
                  fontFamily: Theme.fontFamily.medium,
                  color: navigation.state.index === index ? Theme.palette.primary : Theme.palette.white
                }}>{data.name}</Text> */}
              </TouchableOpacity>
            )
          })}
        </View>
      </SafeAreaView>
    )

  }

}

const styles = StyleSheet.create({
  container: {
    height: 80,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#e4e9f2',
  },
  root: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: '#e4e9f2',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 13,
  },
  text: {
    color: '#151a30',
  },
});