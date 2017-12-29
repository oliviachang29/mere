import React, { Component } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Keyboard, 
  TouchableWithoutFeedback, 
  TouchableOpacity, 
  ScrollView
} from 'react-native'
import GlobalStyles from '../GlobalStyles'
import Utils from '../Utils'
import realm from '../realm'
import LinearGradient from 'react-native-linear-gradient'
import Button from '../components/Shared/Button'
import Answer from '../components/Shared/Answer'
// var RNFS = require('react-native-fs')
var gradientColors = Utils.gradientColors()

var emojis = Utils.emojis()
var colors = Utils.colors()

export default class Today extends Component {
  static navigatorStyle = Utils.navigatorStyle()
  static navigatorButtons = Utils.navigatorButtons()

  constructor(props) {
    super(props)

    // console.log(realm.path)
    console.disableYellowBox = true

    Utils.setUpUser()

    var date = new Date()
    realm.write(() => {
      // realm.delete(realm.objects('Entry'))
      // realm.delete(realm.objects('Answer'))
    })
    // get today's entry
    var dateWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    // set entry
    var entry = realm.objects('Entry').filtered('dateCreated = $0', dateWithoutTime)[0]
    if (!entry) {
      realm.write(() => {
        entry = realm.create('Entry', {
          id: Utils.uuid(),
          dateCreated: dateWithoutTime,
          answers: [],
          color: colors[Utils.randomNum(21, 0)]
        })
      })
      Utils.createAnswers(entry)
    }
    this.state = {
      date: Utils.formatDate(dateWithoutTime).toUpperCase(),
      timeOfDay: Utils.getTimeOfDay(dateWithoutTime)
    }

    realm.addListener('change', () => {
      this.getEntryForToday()
    })

    this.changeRating = this.changeRating.bind(this)
    
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  componentWillMount() {
    this.getEntryForToday()
  }

  getEntryForToday() {
    var date = new Date()
    var dateWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    var entry = realm.objects('Entry').filtered('dateCreated = $0', dateWithoutTime)[0]
    if (!entry) {
      realm.write(() => {
        entry = realm.create('Entry', {
          id: Utils.uuid(),
          dateCreated: dateWithoutTime,
          answers: [],
          color: colors[Utils.randomNum(21, 0)]
        })
      })
      Utils.createAnswers(entry)
    }
    this.setState({
      entry: entry,
      answers: Utils.pushAnswersToArray(entry),
      rating: entry.rating,
      dateWithoutTime: dateWithoutTime,
      showActivityIndicator: false
    })
  }

  renderAnswers() {
    return this.state.entry.answers.map((answer, i) => {
      var location = answer.location === '' ? '' : JSON.parse(answer.location)
      return (
        <Answer
          key={i} 
          i={i}
          location={location} 
          answer={answer} 
          onPress={() => this.gotoEditAnswer(answer, gradientColors[i].first, gradientColors[i].second)}
          text={answer.text} />
      )
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
            <View>
              <Text style={GlobalStyles.emoji}> {emoji} </Text>
            </View>
          </TouchableOpacity>
        )
      }
    })
  }

  render () {
    return (
      <ScrollView style={styles.innerContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.goodTimeOfDay_container}>
          <Text style={[GlobalStyles.h1, styles.goodTimeOfDay_good]}>good</Text>
          <Text style={[GlobalStyles.h1, styles.goodTimeOfDay_time, {color: this.state.entry.color}]}>{this.state.timeOfDay}.</Text>
          <Text style={[GlobalStyles.buttonStyleText, styles.date]}>{this.state.date}</Text>
        </View>
        
        <View style={[GlobalStyles.separator, styles.separator]} />
        <Text style={[GlobalStyles.h4, styles.howWasYourDay]}>How was your day?</Text>
        <View style={GlobalStyles.emoji_container}>
          {this.renderEmojiScale()}
        </View>
        {this.renderAnswers()}
      </ScrollView>
    )
  }

  changeRating(i) {
    this.setState({rating: i})
    realm.write(() => {
      this.state.entry.rating = i
    })
  }

  // NAVIGATOR

  gotoEditAnswer(answer, color1, color2){
    this.props.navigator.push({
      screen: 'app.EditAnswer',
      title: 'A N S W E R',
      passProps: {answer, color1, color2}
    })
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'drawer') {
        this.props.navigator.toggleDrawer({
          side: 'left',
          to: 'open'
        });
      }
    } else if (event.type == 'DeepLink') {
      this.props.navigator.resetTo({
        screen: 'app.' + event.link,
        title: Utils.capitalizeAndSpace(event.link),
        animationType: 'fade'
      })
    }
  }

}

const styles = StyleSheet.create({
  innerContainer: {
    paddingTop: 10,
  },
  date: {
    marginLeft: 6,
    marginTop: 20,
    fontSize: 15,
    // fontFamily: 'BrandonGrotesque-Medium',
    // letterSpacing: 1.2
    // marginBottom: 30
  },
  goodTimeOfDay_container: {
    marginLeft: 18
  },
  goodTimeOfDay_good: {
    fontSize: 72,
    fontWeight: '700',
    color: 'black',
    // marginLeft: 10
  },
  goodTimeOfDay_time: {
    backgroundColor: 'transparent',
    color: '#DD5F8E',
    fontSize: 72,
    fontWeight: '700',
    marginTop: -40,
    // marginLeft: 10
  },
  howWasYourDay: {
    fontSize: 36,
    color: '#4A4A4A',
    alignSelf: 'center',
    // marginTop: 30,
    marginBottom: 30
  },
  separator: {
    marginTop: 26,
    marginBottom: 26,
    // marginBottom: 30,
  },
  card_addPicturesButton: {
    marginTop: 30
  },
})

module.exports = Today