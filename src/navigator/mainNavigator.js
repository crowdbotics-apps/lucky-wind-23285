import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import SplashScreen from "../features/SplashScreen";
import SideMenu from './sideMenu';
//@BlueprintImportInsertion
import CopyOfBlankScreen18186229Navigator from '../features/CopyOfBlankScreen18186229/navigator';
import CopyOfCopyOfBlankScreen17186228Navigator from '../features/CopyOfCopyOfBlankScreen17186228/navigator';
import CopyOfCopyOfBlankScreen17186226Navigator from '../features/CopyOfCopyOfBlankScreen17186226/navigator';
import CopyOfCopyOfBlankScreen17186225Navigator from '../features/CopyOfCopyOfBlankScreen17186225/navigator';
import CopyOfCopyOfBlankScreen17186224Navigator from '../features/CopyOfCopyOfBlankScreen17186224/navigator';
import CopyOfBlankScreen17186158Navigator from '../features/CopyOfBlankScreen17186158/navigator';
import CopyOfBlankScreen17186157Navigator from '../features/CopyOfBlankScreen17186157/navigator';
import BlankScreen18185015Navigator from '../features/BlankScreen18185015/navigator';
import BlankScreen17185014Navigator from '../features/BlankScreen17185014/navigator';
import Settings184998Navigator from '../features/Settings184998/navigator';

/**
 * new navigators can be imported here
 */

const AppNavigator = {

    //@BlueprintNavigationInsertion
CopyOfBlankScreen18186229: { screen: CopyOfBlankScreen18186229Navigator },
CopyOfCopyOfBlankScreen17186228: { screen: CopyOfCopyOfBlankScreen17186228Navigator },
CopyOfCopyOfBlankScreen17186226: { screen: CopyOfCopyOfBlankScreen17186226Navigator },
CopyOfCopyOfBlankScreen17186225: { screen: CopyOfCopyOfBlankScreen17186225Navigator },
CopyOfCopyOfBlankScreen17186224: { screen: CopyOfCopyOfBlankScreen17186224Navigator },
CopyOfBlankScreen17186158: { screen: CopyOfBlankScreen17186158Navigator },
CopyOfBlankScreen17186157: { screen: CopyOfBlankScreen17186157Navigator },
BlankScreen18185015: { screen: BlankScreen18185015Navigator },
BlankScreen17185014: { screen: BlankScreen17185014Navigator },
Settings184998: { screen: Settings184998Navigator },

    /** new navigators can be added here */
    SplashScreen: {
      screen: SplashScreen
    }
};

const DrawerAppNavigator = createDrawerNavigator(
  {
    ...AppNavigator,
  },
  {
    contentComponent: SideMenu
  },
);

const AppContainer = createAppContainer(DrawerAppNavigator);

export default AppContainer;
