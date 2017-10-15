import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Keyboard} from 'react-native'
import GlobalStyles from '../../GlobalStyles'
import Utils from '../../Utils'
import realm from '../../realm'
import Answer from '../../components/Shared/Answer'
import LinearGradient from 'react-native-linear-gradient'
var gradientColors = Utils.gradientColors()
var monthNames = Utils.monthNames()
var emojis = Utils.emojis()

export default class EditEntry extends Component {
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
    realm.addListener('change', () => {
      this.getEntry()
    })
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  componentWillMount() {
    this.getEntry()
  }

  getEntry() {
    var entry = realm.objects('Entry').filtered('dateCreated = $0', this.props.dateCreated)[0]
    this.setState({
      entry: entry,
      answers: Utils.pushAnswersToArray(entry),
      rating: entry.rating,
    })
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'save') {
        this.saveEntry()
      }
      if (event.id == 'back') {
        this.props.navigator.pop()
      }
    }
  }

  renderAnswers() {
    return this.state.entry.answers.map((answer, i) => {
      var text = answer.text != '' ? answer.text : 'Tap to answer...'
      var location = answer.location === '' ? '' : JSON.parse(answer.location)
      return (
        <Answer 
          key={i}
          i={i}
          location={location} 
          answer={answer} 
          onPress={() => this.gotoEditAnswer(answer, gradientColors[i].first, gradientColors[i].second)}
          text={text} />
      )
    })
  }

  gotoEditAnswer(answer, color1, color2){
    this.props.navigator.push({
      screen: 'app.EditAnswer',
      title: 'A N S W E R',
      passProps: {answer, color1, color2}
    })
  }

  changeRating(i) {
    this.setState({rating: i})
    realm.write(() => {
      this.state.entry.rating = i
    })
  }

  renderEmojiScale() {
    return emojis.map((emoji, i) => {
      if (this.state.rating === i) {
        return (
          <View style={[GlobalStyles.emoji_selected, {backgroundColor: this.state.entry.color}]} key={i}>
            <Text style={[GlobalStyles.emoji]}> {emoji} </Text>
          </View>
        )
      } else {
        return (
          <TouchableOpacity onPress={() => this.changeRating(i)} key={i}>
            <Text style={GlobalStyles.emoji}> {emoji} </Text>
          </TouchableOpacity>
        )
      }
    })
  }

  render () {
    var entry = this.state.entry
    var date = monthNames[entry.dateCreated.getMonth()] + ' ' + entry.dateCreated.getDate()
    return (
      <ScrollView style={[styles.innerContainer]}>
        <Text style={[GlobalStyles.h4, styles.date]}>{date}</Text>
        <View style={[GlobalStyles.separator, styles.separator]} />
        <View style={GlobalStyles.emoji_container}>
          {this.renderEmojiScale()}
        </View>
        {this.renderAnswers()}
        {/* {this.renderAnswers()} */}
      </ScrollView>
    )
  }

  updateSize = (height) => {
    this.setState({
      height
    })
  }
}

const styles = StyleSheet.create({
  innerContainer: {
    paddingTop: 10
  },
  date: {
    fontSize: 36,
    color: '#4A4A4A',
    marginTop: 30,
    marginLeft: 26
  },
  separator: {
    marginTop: 26,
    marginBottom: 30,
  },
  linearGradient: {
    height: 2,
  },
})

module.exports = EditEntry
