import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator,StackViewStyleInterpolator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import React from 'react'
import Login from '../screens/auth/Login/Login';
import Register from '../screens/auth/Register/Register';
import Welcome from '../screens/auth/Welcome/Welcome';
import Home from '../screens/home/Home/Home';
import ForgotPassword from '../screens/auth/ForgotPassword/ForgotPassword';
import Contact from '../screens/auth/Contact/Contact';
import Terms from '../screens/auth/Terms/Terms';
import PhoneOtp from '../screens/auth/PhoneOtp/PhoneOtp';
import BottomMenu from './BottomMenu';

import Feed from '../screens/home/Feed/Feed';
import Video from '../screens/home/Video/Video';
import Profile from '../screens/home/Profile/Profile';











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
  },
  Terms:{
    screen: Terms,
    navigationOptions:{
      header:null
    }
  },
  PhoneOtp:{
    screen: PhoneOtp,
    navigationOptions:{
      header: null
    }
  }
})
const HomeStack = createStackNavigator({
  Home:{
    screen: Home,
    navigationOptions:{
      header:null
    }
  }
})
const FeedStack = createStackNavigator({
  Feed:{
    screen: Feed,
    navigationOptions:{
      header:null
    }
  },
  Profile:{
    screen: Profile,
    navigationOptions:{
      header:null
    }
  }
})

const VideoStack = createStackNavigator({
  Video:{
    screen: Video,
    navigationOptions:{
      header:null
    }
  }
})

const AppNavigator = createStackNavigator({
  Feed:{
    screen: FeedStack,
    navigationOptions:{
      header:null
    }
  },
  Home:{
    screen: HomeStack,
    navigationOptions:{
      header:null
    }
  },
  Video:{
    screen: VideoStack,
    navigationOptions:{
      header:null
    }
  }
  
})

const TabBarAppNavigator = createBottomTabNavigator(
  {
    Home: AppNavigator
  },
  {
    tabBarComponent:({navigation}) => <BottomMenu navigation={navigation}/>
  },
);


const SwitchNavigator = createSwitchNavigator({
  Auth: AuthStack,
  App: TabBarAppNavigator,
});

const AppContainer = createAppContainer(SwitchNavigator);
 
export default AppContainer;
