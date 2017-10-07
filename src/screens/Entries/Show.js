import React, { Component } from 'react'
import { Text, StyleSheet, ScrollView } from 'react-native'
import GlobalStyles from '../../GlobalStyles'
import Utils from '../../Utils'

var monthNames = Utils.monthNames()

class ShowEntry extends Component {
  static navigatorStyle = {
    navBarTextFontFamily: 'BrandonGrotesque-Medium',
    navBarTextFontSize: 20,
    // navBarButtonColor: '#D8D8D8',
  }
  
  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Edit',
        id: 'edit',
      }
    ]
  }

  constructor(props) {
    super(props)
    this.state = {
      entry: this.props.entry
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'edit') {
        this.gotoEdit(this.props.entry)
      }
    }
  }

  render () {
    var entry = this.state.entry
    return (
      <ScrollView style={[GlobalStyles.container, GlobalStyles.innerContainer]}>

      </ScrollView>
    )
  }

  gotoEdit(entry) {
    this.props.navigator.push({
      screen: 'app.EditEntry',
      title: 'Edit',
      passProps: {entry}
    })
  }
}

const styles = StyleSheet.create({
  card_text: {
    fontSize: 13,
    marginTop: 10,
    marginBottom: 10,
    color: '#808080'
  },
  card_prompt: {
  },
  card_first: {
    marginTop: 10,
  }
})

module.exports = ShowEntry
