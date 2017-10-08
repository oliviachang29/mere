import {Platform} from 'react-native'
import {Navigation} from 'react-native-navigation'
import registerScreens from './screens'

registerScreens()

Navigation.startSingleScreenApp({
  screen: {
    screen: 'app.Today',
    title: 'T O D A Y',
  },
  passProps: {
    currentScreen: 'today'
  },
  drawer: {
    left: {
      screen: 'app.Drawer',
    },
    style: {
      drawerShadow: false,
      contentOverlayColor: 'rgba(0,0,0,0.2)',
      leftDrawerWidth: 65,
    },
    disableOpenGesture: false,
    // type: 'TheSideBar',
    animationType: 'slide-and-scale',
  },
  appStyle: {
    orientation: 'portrait'
  },
  animationType: 'fade',

})
