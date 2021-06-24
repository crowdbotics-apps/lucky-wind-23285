import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator,StackViewStyleInterpolator } from 'react-navigation-stack';
import React from 'react'
import Login from '../screens/auth/Login/Login';
import Register from '../screens/auth/Register/Register';
import Welcome from '../screens/auth/Welcome/Welcome';
import Home from '../screens/home/Home/Home';
import ForgotPassword from '../screens/auth/ForgotPassword/ForgotPassword';
import Contact from '../screens/auth/Contact/Contact';






//@BlueprintImportInsertion

/**
 * new navigators can be imported here
 */


const AuthStack = createStackNavigator({
  Welcome:{
    screen: Welcome,
    navigationOptions:{
      header:null
    }
  },
  Login:{
    screen: Login,
    navigationOptions:{
      header:null
    }
  },
  Register:{
    screen: Register,
    navigationOptions:{
      header:null
    }
  },
  ForgotPassword:{
    screen: ForgotPassword,
    navigationOptions:{
      header:null
    }
  },
  Contact:{
    screen: Contact,
    navigationOptions:{
      header:null
    }
  }
})


const AppNavigator = createStackNavigator({
  Home:{
    screen: Home,
    navigationOptions:{
      header:null
    }
  }
})


const SwitchNavigator = createSwitchNavigator({
  Auth: AuthStack,
  App: AppNavigator,
});

const AppContainer = createAppContainer(SwitchNavigator);
 
export default AppContainer;
