import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import GlobalStyles from '../GlobalStyles'
import Utils from '../Utils'

class Settings extends Component {
  static navigatorStyle = Utils.navigatorStyle()
  static navigatorButtons = Utils.navigatorButtons()

  constructor(props) {
    super(props)
    this.state = {}
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }
  render () {
    return (
      <ScrollView style={GlobalStyles.innerContainer}>
        <View style={styles.copyright_container}>
          <Text style={[GlobalStyles.p, styles.copyright]}>(c) Olivia Chang 2017</Text>
        </View>
      </ScrollView>
    )
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      console.log('hi')
      if (event.id == 'drawer') {
        console.log('hi there')
        this.props.navigator.toggleDrawer({
          side: 'left',
          to: 'open'
        });
      }
    } else if (event.type == 'DeepLink') {
      this.props.navigator.resetTo({
        screen: 'app.' + event.link,
        title: Utils.capitalizeAndSpace(event.link),
        animationType: 'fade'
      })
    }
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


module.exports = Settings
