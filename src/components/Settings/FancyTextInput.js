import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Keyboard } from 'react-native'
import GlobalStyles from '../../GlobalStyles'
import Utils from '../../Utils'
import LinearGradient from 'react-native-linear-gradient'

var gradientColors = Utils.gradientColors()

class FancyTextInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value
    }
  }

  render () {
    return (
      <View style={this.props.viewStyle}>
        <View style={[styles.textInputViewStyle, this.props.textInputViewStyle]}>
          <TextInput
            placeholder="Your name"
            defaultValue={this.props.value}
            onChangeText={(text) => this.setState({value: text})}
            onEndEditing={() => this.onEndEditing()}
            style={[GlobalStyles.p, GlobalStyles.card_textInput, styles.textInput, this.props.textInputStyle]}
          />
        </View>
        <LinearGradient 
          colors={[gradientColors[0].first, gradientColors[0].second]} 
          style={GlobalStyles.linearGradient} 
          start={{x: 0.0, y: 0.0}} end={{x: 0.5, y: 1.0}}
          />
      </View>
    )
  }

  onEndEditing(text) {
    Keyboard.dismiss()
    this.props.onEndEditing(this.state.value)
    console.log(this.state.value)

    this.props.navigator.showInAppNotification({
      screen: 'app.Notification',
      passProps: {
        title: '✓ All changes saved.',
        type: 'success'
      },
      autoDismissTimerSec: 2
    })

  }

}
const styles = StyleSheet.create({
  textInput: {
    color: 'black'
  },
  textInputViewStyle: {
    marginBottom: 10
  }
})

module.exports = FancyTextInput
