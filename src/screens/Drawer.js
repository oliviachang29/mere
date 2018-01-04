import React, { Component } from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import GlobalStyles from '../GlobalStyles'
import Utils from '../Utils'

class Button extends Component {
  render () {
    return (
       <TouchableOpacity onPress={this.props.onPress}>
          <Text style={[GlobalStyles.buttonStyleText, styles.button]}>{this.props.text.toUpperCase()}</Text>
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
          {/*<View style={styles.separator} />*/}
          <Button onPress={() => this.goto('Today')} text='today' />
          <View style={styles.separator} />
          <Button onPress={() => this.goto('Calendar')} text='calendar' />
          <View style={styles.separator} />
          <Button onPress={() => this.goto('Photos')} text='photos' />
          <View style={styles.separator} />
          <Button onPress={() => this.goto('Map')} text='map' />
          <View style={styles.separator} />
          <Button onPress={() => this.goto('Stats')} text='stats' />
          <View style={styles.separator} />
          <Button onPress={() => this.goto('About')} text='about' />
          {/*<View style={styles.separator} />*/}
        </View>
        {/*<Text>currentScreen: {this.state.currentScreen}</Text>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: '60%',
    paddingLeft: 40,
    // backgroundColor: '#f4f4f4',
    marginTop: 30,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  button: {
    marginTop: 20,
    fontSize: 16,
    color: '#4A4A4A',
    // fontFamily: 'BrandonGrotesque-Medium',
    // letterSpacing: 3.87
  },
  date: {
    marginBottom: 30,
    color: '#AAAAAA',
  },
  separator: {
    width: '20%',
    height: 2,
    backgroundColor: '#f4f4f4',
    marginTop: 20,
    borderRadius: 100
  }
});

module.exports = Drawer;
