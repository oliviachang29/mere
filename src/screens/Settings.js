import React, { Component } from 'react'
import { Platform, View, Text, ScrollView, StyleSheet, Switch } from 'react-native'
import store from 'react-native-simple-store'
import GlobalStyles from '../GlobalStyles'
import Utils from '../Utils'
import Avatar from '../components/Profile/Avatar'
import FancyTextInput from '../components/Settings/FancyTextInput'
import AvatarUpload from '../components/Settings/AvatarUpload'
var TouchID = require('react-native-touch-id').default

class Settings extends Component {
  static navigatorStyle = Utils.navigatorStyle()
  static navigatorButtons = Utils.navigatorButtons()

  constructor(props) {
    super(props)

    this.state = {
      touchID: false,
    }

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  componentWillMount() {
    var state = this.state
    // get information from react-native-simple-store
    store.get('user')
      .then(result => {
        if (result.name) {
          state.touchID = result.touchID
        }
        this.setState(state)
      })
      .catch(error => {
        console.log('error: \n\n' + error)
      })

    // check if touch ID is supported
    TouchID.isSupported()
      .then(supported => {
        // Success code
        console.log('TouchID is supported.')
        this.setState({touchIDSupported: true})
      })
      .catch(error => {
        // Failure code
        console.log(error);
        this.setState({touchIDSupported: false})
      });
  }

  onTouchIDChange(newValue) {
    console.log(newValue)
    this.setState({touchID: newValue})
    store
      .update('user', {
        touchID: newValue
      })
      .catch(error => {
        console.log('error: \n\n' + error) 
      })
  }

  renderTouchID() {
    if (this.state.touchIDSupported) {
      return (
        <View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={[GlobalStyles.buttonStyleText, styles.title]}>🔐 LOCK APP WITH TOUCH ID</Text>
              <Text style={[GlobalStyles.h5, {marginTop: 10}]}>When enabled, you will need your touch ID to access this app.</Text>
            </View>
            <Switch onValueChange={(newValue) => this.onTouchIDChange(newValue)} value={this.state.touchID} style={styles.switch} />
          </View>
          <View style={[GlobalStyles.separator, styles.separator]} />
        </View>
      )
    }
  }

  render () {
    var version = '0.0.1'
    var build = '1'
    return (
      <ScrollView style={[GlobalStyles.innerContainer, styles.innerContainer]}>
        {this.renderTouchID()}
        <Text style={GlobalStyles.buttonStyleText}>ABOUT</Text>
        <Text style={[GlobalStyles.p, styles.text]}>For most of us, journaling isn’t a natural habit. Mere changes that by simplifying the process: it asks three questions each day, and three questions only. With a simple format, you’ll get started journaling in no time.</Text>
        <Text style={[GlobalStyles.p, styles.text]}>Mere was created for the 2017 Congressional App Challenge.</Text>
        <View style={[GlobalStyles.separator, styles.separator]} />
        <Text style={[GlobalStyles.p, styles.text, styles.grayText]}>© 2017 Olivia Chang. All rights reserved.</Text>
        <Text style={[GlobalStyles.p, styles.text, styles.grayText]}>Version: {version} ● Build: {build}</Text>
      </ScrollView>
    )
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
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
  innerContainer: {
    marginTop: 30,
    flex: 1
  },
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


module.exports = Settings
