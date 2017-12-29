import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Keyboard, TouchableOpacity} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Utils from '../../Utils'
import GlobalStyles from '../../GlobalStyles'
import Photo from './Photo'
var RNFS = require('react-native-fs')

var gradientColors = Utils.gradientColors()

class Answer extends Component {
  render () {
  	var answer = this.props.answer
  	var i = this.props.i
    var source = Utils.sourceFromFileName(answer.fileName)
    var text = answer.text
    var color = '#4A4A4A'
    if (answer.text === '') {
      text = 'Tap to answer...'
      color = '#9B9B9B'
    }
    return (
      <TouchableOpacity style={[GlobalStyles.shadow, GlobalStyles.card_container]} onPress={() => this.props.onPress()}>

        <Text style={[GlobalStyles.h4, GlobalStyles.card_textInput_prompt]}>{answer.question}</Text>
        <Text style={[GlobalStyles.p, {color: color}]}>{text}</Text>
        <LinearGradient
          colors={[gradientColors[i].first, gradientColors[i].second]}
          style={[GlobalStyles.linearGradient, {marginTop: 30}]}
          start={{x: 0.0, y: 0.0}} end={{x: 0.5, y: 1.0}}
                />
        {Utils.isBlank(answer.location) ? null
          : <Text style={[GlobalStyles.card_location_text, GlobalStyles.buttonStyleText]}>📍 {this.props.location.name.toUpperCase()}</Text>
        }
        <Photo imageSource={source} photoStyle={{marginTop: 20}} />
      </TouchableOpacity>
    )
  }
}

module.exports = Answer
