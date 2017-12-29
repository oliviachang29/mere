// lightbox

import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Button from '../../components/Shared/Button'
import Photo from '../../components/Shared/Photo'
import GlobalStyles from '../../GlobalStyles'
import realm from '../../realm'
import Utils from '../../Utils'
var gradientColors = Utils.gradientColors()

class ShowAnswer extends Component {
  static navigatorStyle = Utils.navigatorStyle()
  static navigatorButtons = {
    leftButtons: [
      {
        icon: require('../../assets/images/back-arrow.png'),
        id: 'back',
        disableIconTint: true,
      }
    ]
  }

  constructor(props) {
    super(props)
    let answer = this.props.answer
    var location = answer.location === '' ? '' : JSON.parse(answer.location)
    var source = Utils.sourceFromFileName(answer.fileName)
    this.state = {
      location: location,
      height: answer.height + 100,
      source: source
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  render () {
    var color = this.state.text ? '#4A4A4A' : '#9B9B9B'
    var answer = this.props.answer
    var dateWithFormatting = Utils.formatDate(answer.dateCreated).toUpperCase()
    return (
      <ScrollView style={[styles.innerContainer]}>
        <Text style={[GlobalStyles.buttonStyleText, styles.date]}>{dateWithFormatting}</Text>
        <Text style={[GlobalStyles.p, GlobalStyles.card_question, styles.card_question]}>{answer.question}</Text>
        <Text style={[GlobalStyles.p, GlobalStyles.card_answer, {color: color}]}>{answer.text ? answer.text : 'No answer for this question.'}</Text>
        <View style={[GlobalStyles.separator, styles.separator]} />
        {Utils.isBlank(answer.location) ? null : 
          <Text style={[GlobalStyles.card_location_text, GlobalStyles.buttonStyleText]}>📍 {this.state.location.name.toUpperCase()}</Text>
        }
        
        <Photo imageSource={this.state.source} viewStyle={styles.photo} />
        <TouchableOpacity 
          onPress={() => this.dismissLightBox()}
          style={styles.card_close_container}>
          <Text style={[GlobalStyles.p, styles.card_close_text]}>Close</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }

  dismissLightBox() {
    this.props.navigator.dismissLightBox();
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'back') {
        // pop back screen
        this.props.navigator.pop()
      }
    }
  }

}

const styles = StyleSheet.create({
  innerContainer: {
    width: Dimensions.get('window').width * 0.8,
    // height: Dimensions.get('window').height * 0.8,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 24,
  },
  date: {
    // fontSize: 20,
    marginBottom: 15
  },
  card_close_container: {
    alignSelf: 'flex-end',
    marginTop: 15
  },
  card_close_text: {
    fontSize: 20
  },
  photo: {
    marginTop: 30,
    marginBottom: 15
  },
  separator: {
    marginTop: 10
  }
})

module.exports = ShowAnswer
