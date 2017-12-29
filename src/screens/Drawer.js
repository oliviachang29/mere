import React, { Component } from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import GlobalStyles from '../GlobalStyles'
import Utils from '../Utils'

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

  goto (link) {
    this.toggleDrawer()
    this.props.navigator.handleDeepLink({
      link: link
    })
  }

  toggleDrawer = () => {
    this.props.navigator.toggleDrawer({
      side: 'left',
      to: 'close'
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Button onPress={() => this.goto('Today')} text='⏰  today' />
          <Button onPress={() => this.goto('Calendar')} text='📅  calendar' />
          <Button onPress={() => this.goto('Photos')} text='🌄  photos' />
          <Button onPress={() => this.goto('Map')} text='🗺  map' />
          <Button onPress={() => this.goto('Stats')} text='📈  stats' />
          <Button onPress={() => this.goto('Settings')} text='⚙️  settings' />
        </View>
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
    marginTop: 30,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  button: {
    marginTop: 30,
    fontSize: 16,
    color: '#AAAAAA',
    fontFamily: 'BrandonGrotesque-Medium',
    letterSpacing: 3.87
  },
  date: {
    marginBottom: 30,
    color: '#AAAAAA',
  }
});

module.exports = Drawer;
