// lightbox

import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Button from '../../components/Shared/Button'
import Photo from '../../components/Shared/Photo'
import GlobalStyles from '../../GlobalStyles'
import realm from '../../realm'
import Utils from '../../Utils'
var gradientColors = Utils.gradientColors()

class MultipleAnswers extends Component {
  static navigatorStyle = Utils.navigatorStyle()
  static navigatorButtons = {
    rightButtons: [
      {
        icon: require('../../assets/images/x.png'),
        id: 'x',
        disableIconTint: true,
      }
    ]
  }

  constructor(props) {
    super(props)
    let answers = realm.objects('Answer');
    let answersWithSameLocation = answers.filtered('location == $0', this.props.location)

    this.state = {
      answers: answersWithSameLocation,
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  renderAnswers() {
    return this.state.answers.map((answer, i) => {
      var dateCreated = Utils.formatDate(answer.dateCreated).toUpperCase()
      var text = answer.text.split(' ').slice(0,30).join(' ')
      var ellipses = ''
      if (text.split(" ").length == 30) {
        ellipses = '...'
      }
      return (
        <View>
          {i == 0 ? null :
            <View style={[GlobalStyles.separator, styles.separator]} />  
          }
          <TouchableOpacity onPress={() => this.gotoShowAnswer(answer)} key={i} style={styles.answerContainer}>
            <Text style={[GlobalStyles.buttonStyleText, styles.dateCreated]}>{dateCreated}</Text>
            <Text style={GlobalStyles.p}>{text}{ellipses}</Text>
          </TouchableOpacity>
        </View>
      )
    })
  }

  render () {
    return (
      <ScrollView style={[styles.innerContainer]} showsVerticalScrollIndicator={false}>
        {this.renderAnswers()}
      </ScrollView>
    )
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'x') {
        // pop back screen
        this.props.navigator.dismissModal()
      }
    }
  }

  gotoShowAnswer(answer) {
    var title = Utils.capitalizeAndSpace(Utils.formatDate(answer.dateCreated))
    this.props.navigator.showModal({
      screen: 'app.ShowAnswer',
      title: title,
      passProps: {
        id: answer.id,
      }
    })
  }

}

const styles = StyleSheet.create({
  innerContainer: {
    // width: Dimensions.get('window').width * 0.8,
    // height: Dimensions.get('window').height * 0.8,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    paddingLeft: 24,
    paddingBottom: 24
  },
  answerContainer: {
    paddingTop: 20,
    paddingBottom: 20
  },
  dateCreated: {
    marginBottom: 10
  },
  separator: {
    height: 2
  }
})

module.exports = MultipleAnswers
