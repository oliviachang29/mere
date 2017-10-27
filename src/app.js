import {Platform} from 'react-native'
import {Navigation} from 'react-native-navigation'
import registerScreens from './screens'
import Utils from './Utils'
import store from 'react-native-simple-store'
var TouchID = require('react-native-touch-id').default

registerScreens()

Navigation.startSingleScreenApp({
  screen: {
    screen: 'app.Today',
    title: 'T O D A Y'
  },
  passProps: {
    currentScreen: 'today'
  },
  drawer: {
    left: {
      screen: 'app.Drawer'
    },
    style: {
      drawerShadow: false,
      contentOverlayColor: 'rgba(0,0,0,0.2)',
      leftDrawerWidth: 65
    },
    disableOpenGesture: false,
    // type: 'TheSideBar',
    animationType: 'slide-and-scale'
  },
  appStyle: {
    orientation: 'portrait'
  },
  animationType: 'fade'

})

TouchID.isSupported()
  .then(supported => {
    console.log('TouchID is supported.')
    store.get('user')
      .then(result => {
        if (result.touchIDEnabled) {
          this.props.navigator.resetTo({
            screen: 'app.Locked'
          })
          console.log('Touch ID is enabled')
        }
      })
      .catch(error => {
        console.log(error)
      })
  })
  .catch(error => {
    console.log(error)
  })
