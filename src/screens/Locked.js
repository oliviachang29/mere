import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import GlobalStyles from '../GlobalStyles'
import Utils from '../Utils'
import store from 'react-native-simple-store'
var TouchID = require('react-native-touch-id').default

class Locked extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  gotoToday() {
    this.props.navigator.resetTo({
      screen: 'app.Today',
      title: 'T O D A Y'
    })
  }

  authenticateUser() {
    // already know that TouchID is enabled and touchIDEnabled is true
    // so don't need to check again
    TouchID.authenticate('Use touch ID to unlock this app')
      .then(success => {
        console.log('success')
        this.gotoToday()
      })
      .catch(error => {
        console.log('error... ' + error)
      })
  }

  render () {
    return (
      <View style={GlobalStyles.innerContainer}>
        <Text>Locked</Text>
        <Text>Use touch ID to unlock this app</Text>
        <TouchableOpacity onPress={() => this.authenticateUser()}>
          <Text>Unlock</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

module.exports = Locked
