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

  gotoMap = () => {
    this.toggleDrawer()
    this.props.navigator.handleDeepLink({
      link: 'Map'
    })
  }

  toggleDrawer = () => {
    this.props.navigator.toggleDrawer({
      side: 'left'
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.gotoToday} text='today' />
        <Button onPress={this.gotoCalendar} text='calendar' />
        <Button onPress={this.gotoMap} text='map' />
        <Button text='profile' />
        <Button text='settings' />
        <Text>currentScreen: {this.state.currentScreen}</Text>

        <View style={styles.copyright_container}>
          <Text style={[GlobalStyles.p, styles.copyright]}>(c) Olivia Chang 2017</Text>
        </View>
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
  },
  button: {
    marginTop: 30,
    fontSize: 20,
    color: '#AAAAAA',
    fontFamily: 'BrandonGrotesque-Medium',
    letterSpacing: 3.87
  },
  copyright_container: {
    justifyContent: 'flex-end',
    flexDirection: 'column',
    flex: 1
  },
  copyright: {
    justifyContent: 'flex-end',
    color: '#B3B3B3',
    fontSize: 18,
    marginBottom: 47
  }
});

module.exports = Drawer;
