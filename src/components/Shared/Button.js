import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import GlobalStyles from '../../GlobalStyles'

class Button extends Component {

  render () {
    return (
    	<TouchableOpacity 
        style={this.props.viewStyle} 
        onPress={this.props.onPress}
        onLongPress={this.props.onLongPress}>
      	<Text style={[GlobalStyles.buttonStyleText, this.props.textStyle]}>{this.props.text}</Text>
      </TouchableOpacity>
    )
  }

}

module.exports = Button
