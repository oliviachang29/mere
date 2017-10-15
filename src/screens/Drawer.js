import React, { Component } from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import GlobalStyles from '../GlobalStyles'

class Button extends Component {
  render () {
    return (
       <TouchableOpacity onPress={this.props.onPress}>
          <Text style={[GlobalStyles.h4, styles.button]}>{this.props.text.toUpperCase()}</Text>
        </TouchableOpacity>
      )
  }
}

class Drawer extends Component {
  constructor(props) {
    super(props)
    console.log('props... \n' + JSON.stringify(this.props))
    this.state = {
      currentScreen: this.props.currentScreen
    }
  }
  gotoToday = () => {
    this.toggleDrawer()
    this.props.navigator.handleDeepLink({
      link: 'Today'
    })
  }

  gotoCalendar = () => {
    this.toggleDrawer()
    this.props.navigator.handleDeepLink({
      link: 'Calendar'
    })
  }

  gotoProfile = () => {
    this.toggleDrawer()
    this.props.navigator.handleDeepLink({
      link: 'Profile'
    })
  }

  gotoStats = () => {
    this.toggleDrawer()
    this.props.navigator.handleDeepLink({
      link: 'Stats'
    })
  }

  gotoSettings = () => {
    this.toggleDrawer()
    this.props.navigator.handleDeepLink({
      link: 'Settings'
    })
  }

  toggleDrawer = () => {
    this.props.navigator.toggleDrawer({
      side: 'left',
      to: 'close'
    })
  };

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.gotoToday} text='today' />
        <Button onPress={this.gotoCalendar} text='calendar' />
        <Button onPress={this.gotoProfile} text='profile' />
        <Button onPress={this.gotoStats} text='stats' />
        <Button onPress={this.gotoSettings} text='settings' />
        {/*<Text>currentScreen: {this.state.currentScreen}</Text>*/}

        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 200,
    paddingLeft: 40,
    backgroundColor: '#ffffff',
    marginTop: 30
  },
  button: {
    marginTop: 30,
    fontSize: 20,
    color: '#AAAAAA',
    fontFamily: 'BrandonGrotesque-Medium',
    letterSpacing: 3.87
  }
});

module.exports = Drawer;
