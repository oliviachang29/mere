import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Keyboard, TouchableOpacity} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Utils from '../../Utils'

var gradientColors = Utils.gradientColors()

class Answer extends Component () {

  render () {
  	var answer = this.props.answer
    return (
    	<View style={[GlobalStyles.shadow, GlobalStyles.card_container]} key={i}>
          <Text style={[GlobalStyles.h4, GlobalStyles.card_textInput_prompt]}>{answer.question}</Text>
          <TouchableWithoutFeedback onPress={() => this.gotoEditAnswer(answer, gradientColors[i].first, gradientColors[i].second)}>
            <View>
              <View style={GlobalStyles.card_textInput_container}>
                <Text 
                  style={[GlobalStyles.p, GlobalStyles.card_textInput]}>
                  {this.props.text}
                </Text>
              </View>
              <LinearGradient 
                colors={[gradientColors[i].first, gradientColors[i].second]} 
                style={GlobalStyles.linearGradient} 
                start={{x: 0.0, y: 0.0}} end={{x: 0.5, y: 1.0}}
                />
              {Utils.isBlank(answer.location) ? null : 
                <Text style={[GlobalStyles.card_location_text, GlobalStyles.buttonStyleText]}>📍 {location.name.toUpperCase()}</Text>
              }
            </View>
          </TouchableWithoutFeedback>
        </View>
    )
  }
}

module.exports = Answer;