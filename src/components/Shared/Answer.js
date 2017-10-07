import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Keyboard, TouchableWithoutFeedback} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Utils from '../../Utils'
import GlobalStyles from '../../GlobalStyles'

var gradientColors = Utils.gradientColors()

class Answer extends Component {
  render () {
  	var answer = this.props.answer
  	var i = this.props.i
    return (
    	<View style={[GlobalStyles.shadow, GlobalStyles.card_container]}>
          <Text style={[GlobalStyles.h4, GlobalStyles.card_textInput_prompt]}>{answer.question}</Text>
          <TouchableWithoutFeedback onPress={() => this.props.onPress()}>
            <View>
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
              {Utils.isBlank(answer.location) ? null : 
                <Text style={[GlobalStyles.card_location_text, GlobalStyles.buttonStyleText]}>📍 {this.props.location.name.toUpperCase()}</Text>
              }
            </View>
          </TouchableWithoutFeedback>
        </View>
    )
  }
}

module.exports = Answer;