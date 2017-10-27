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
    return (
      <TouchableOpacity style={[GlobalStyles.shadow, GlobalStyles.card_container]} onPress={() => this.props.onPress()}>

        <Text style={[GlobalStyles.h4, GlobalStyles.card_textInput_prompt]}>{answer.question}</Text>
        <View style={GlobalStyles.card_textInput_container}>
          <Text style={[GlobalStyles.p, GlobalStyles.card_textInput, {height: answer.height}]}>
            {this.props.text}
          </Text>
        </View>
        <LinearGradient
          colors={[gradientColors[i].first, gradientColors[i].second]}
          style={GlobalStyles.linearGradient}
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
