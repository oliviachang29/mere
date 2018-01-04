import React, { Component } from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import GlobalStyles from '../GlobalStyles'
import Utils from '../Utils'
import Drawer from 'react-native-drawer'

class Button extends Component {
  render () {
    return (
       <TouchableOpacity onPress={this.props.onPress}>
          <Text style={[GlobalStyles.h4, styles.button]}>{this.props.text.toUpperCase()}</Text>
        </TouchableOpacity>
      )
  }
}

class SideMenu extends Component {  

  constructor(props) {
    super(props)
    console.log(this.props.currentScreen)

    this.state = {
      currentScreen: this.props.currentScreen
    }
  }

  goto (link) {
    this.props.goto(link)
  }


  render () {
    return (
      <View style={styles.container}>
        <View>
          <Button onPress={() => this.goto('Today')} text='today' />
          <Button onPress={() => this.goto('Calendar')} text='calendar' />
          <Button onPress={() => this.goto('Photos')} text='photos' />
          <Button onPress={() => this.goto('Map')} text='map' />
          <Button onPress={() => this.goto('Stats')} text='stats' />
          <Button onPress={() => this.goto('Settings')} text='settings' />
        </View>
        <Text>currentScreen: {this.state.currentScreen}</Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '60%',
    paddingLeft: 40,
    backgroundColor: '#f4f4f4',
    marginTop: 30,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  button: {
    marginTop: 30,
    fontSize: 16,
    color: '#000',
    fontFamily: 'BrandonGrotesque-Medium',
    letterSpacing: 3.87
  },
  date: {
    marginBottom: 30,
    color: '#AAAAAA',
  }
});

module.exports = SideMenu;
