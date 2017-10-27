import React, { Component } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import GlobalStyles from '../../GlobalStyles'

class XButton extends Component {
  render () {
    return (
      <TouchableOpacity 
        style={GlobalStyles.pullRight}
        onPress={this.props.onPress}>
        <Image source={require('../../assets/images/x.png')} style={{width: 15}} />
      </TouchableOpacity>
    )
  }
}

module.exports = XButton
