import React from 'react';
import { LogBox, View, Text, StyleSheet, Image, Animated, Easing, Dimensions } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';

import SplashScreen from './src/features/SplashScreen';
import { store } from './src/store';
import NavigatorProvider from './src/navigator/mainNavigator';
import { setupHttpConfig } from './src/utils/http';
import * as NavigationService from './src/navigator/NavigationService';

import AnimatedWave from "react-native-animated-wave";
import { ImageBackground } from 'react-native';
import AppContainer from './src/navigator/mainNavigator';

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height
import { Provider, observer, inject } from "mobx-react";
import { stores } from './src/mobx';


export default class App extends React.Component {
  state = {
    isLoaded: false,
  };


  constructor() {
    super()

  }



  async componentDidMount() {
    await this.loadAssets();
    console.disableYellowBox = true;
    setupHttpConfig();
    /**
     * Read above commments above adding async requests here
     */
    NavigationService.setNavigator(this.navigator);
  }

  loadAssets = async () => {
    // add any loading assets here
    // setTimeout(() => {
    this.setState({ isLoaded: true });
    // }, 2000)
  };

  renderLoading = () => (
    <Text>Loading...</Text>
  );

  renderApp = () => (
    <Provider {...stores}>
      <NavigatorProvider
        style={styles.flex}
        ref={(nav) => {
          this.navigator = nav;
        }}>
        <View style={[styles.flex]}>
          <AppContainer />
        </View>
      </NavigatorProvider>
    </Provider>
  );

  render = () =>
    this.state.isLoaded ? this.renderApp() : this.renderLoading();
}

const styles = StyleSheet.create({
  flex: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  circles: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 1000
  }
});
