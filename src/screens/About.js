import React, { Component } from 'react'
import { Platform, View, Text, ScrollView, StyleSheet, Switch } from 'react-native'
import store from 'react-native-simple-store'
import GlobalStyles from '../GlobalStyles'
import Utils from '../Utils'
import FancyTextInput from '../components/Settings/FancyTextInput'
var moment = require('moment');

class About extends Component {
  static navigatorStyle = Utils.navigatorStyle()
  static navigatorButtons = Utils.navigatorButtons()

  constructor(props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  render () {
    var version = '0.0.1'
    var build = '1'
    var year = moment().year();
    return (
      <ScrollView style={[GlobalStyles.innerContainer, styles.innerContainer]}>
        {/*<Text style={GlobalStyles.buttonStyleText}>ABOUT</Text>*/}
        <Text style={[GlobalStyles.p, styles.text]}>For most of us, journaling isn’t a natural habit. Mere changes that by simplifying the process: it asks three questions each day, and three questions only. With a simple format, you’ll get started journaling in no time.</Text>
        <Text style={[GlobalStyles.p, styles.text]}>Mere is a 2017 Congressional App Challenge winner.</Text>
        <View style={[GlobalStyles.separator, styles.separator]} />
        <Text style={[GlobalStyles.p, styles.text, styles.grayText]}>© {year} Olivia Chang. All rights reserved.</Text>
        <Text style={[GlobalStyles.p, styles.text, styles.grayText]}>Built with React Native.</Text>
        <Text style={[GlobalStyles.p, styles.text, styles.grayText]}>Version: {version} ● Build: {build}</Text>
      </ScrollView>
    )
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'drawer') {
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
  separator: {
    marginTop: 30,
    marginBottom: 30
  },
  text: {
    marginTop: 15
  },
  grayText: {
    color: '#B3B3B3',
    fontSize: 15,
    fontFamily: 'BrandonGrotesque-Bold',
    marginTop: 0,
    alignSelf: 'center'
  },
  switch: {
    marginTop: 40
  }
});


module.exports = About
