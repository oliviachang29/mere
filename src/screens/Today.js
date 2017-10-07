import React, { Component } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Keyboard, 
  TouchableWithoutFeedback, 
  TouchableOpacity, 
  Image,
  ScrollView
} from 'react-native'
import GlobalStyles from '../GlobalStyles'
import Utils from '../Utils'
import realm from '../realm'
import LinearGradient from 'react-native-linear-gradient'
import Button from '../components/Shared/Button'
import Answer from '../components/Shared/Answer'
import uuid from 'uuid'
var ImagePicker = require('react-native-image-picker')
// var RNFS = require('react-native-fs')


var emojis = Utils.emojis()
var colors = Utils.colors()

export default class Today extends Component {
  static navigatorStyle = {
    navBarTextFontFamily: 'BrandonGrotesque-Medium',
    navBarTextFontSize: 20,
    // navBarButtonColor: '#D8D8D8',
  }
  
  static navigatorButtons = {
    leftButtons: [
      {
        icon: require('../assets/images/drawer-icon.png'),
        id: 'drawer',
        disableIconTint: true,
      }
    ]
  }

  constructor(props) {
    super(props)

    console.log(realm.path)

    var date = new Date()
    realm.write(() => {
      // realm.delete(realm.objects('Entry'))
      // realm.delete(realm.objects('Answer'))
      // const fakeEntry = realm.create('Entry', {id: 1, dateCreated: new Date(date.getFullYear(), 8, 3), answers: [], color: colors[Utils.randomNum(21, 0)]})
      // fakeEntry.answers.push({question: 'What was the best part?'})
      // fakeEntry.answers.push({question: 'What was the worst part?'})
      // fakeEntry.answers.push({question: 'What was the funniest part?'})
    })
    // get today's entry
    var dateWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    // set entry
    var entry = realm.objects('Entry').filtered('dateCreated = $0', dateWithoutTime)[0]
    if (!entry) {
//      console.log("Today's entry doesn't exist, creating it now...")
      // create the entry
      realm.write(() => {
        entry = realm.create('Entry', {
          id: realm.objects('Entry').length + 1,
          dateCreated: dateWithoutTime,
          answers: [],
          color: colors[Utils.randomNum(21, 0)]
        })
      })
      Utils.createAnswers(entry)
    }
    var imageSource = entry.imageSource === '' ? '' : JSON.parse(entry.imageSource)
    this.state = {
      imageSource: imageSource
    }

    realm.addListener('change', () => {
      this.getEntryForToday()
    })

    this.changeRating = this.changeRating.bind(this)
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this)
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
          id: realm.objects('Entry').length + 1,
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
    // TODO: replace tap to answer with actual text
    return this.state.entry.answers.map((answer, i) => {
      var text = answer.text != '' ? answer.text : 'Tap to answer...'
      var location = answer.location === '' ? '' : JSON.parse(answer.location)
      return (
        <Answer answer={answer} text={text} location={location} />

      )
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
          <TouchableWithoutFeedback onPress={() => this.changeRating(i)} key={i}>
            <View>
              <Text style={GlobalStyles.emoji}> {emoji} </Text>
            </View>
          </TouchableWithoutFeedback>
        )
      }
    })
  }

  renderPhoto() {
    if (this.state.imageSource != '') {
      return (
        <View style={[GlobalStyles.photo_container, {marginBottom: 20}]}>
          <Image style={GlobalStyles.photo} source={this.state.imageSource} />
        </View>
      )
    }
  }

  render () {
    const photoButtonText = this.state.imageSource === '' ? '🌄  ADD PHOTO' : '🌃  CHANGE PHOTO'
    return (
      <ScrollView style={styles.innerContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.goodTimeOfDay_container}>
          <Text style={[GlobalStyles.h1, styles.goodTimeOfDay_good]}>good</Text>
          <Text style={[GlobalStyles.h1, styles.goodTimeOfDay_time, {color: this.state.entry.color}]}>{Utils.getTimeOfDay(this.state.dateWithoutTime)}.</Text>
        </View>
        {/*{this.renderImage()}*/}
        <View style={[GlobalStyles.separator, styles.separator]} />
        <Text style={[GlobalStyles.h4, styles.howWasYourDay]}>How was your day?</Text>
        <View style={GlobalStyles.emoji_container}>
          {this.renderEmojiScale()}
        </View>
        {/*<ActivityIndicator animating={this.state.showActivityIndicator}/>*/}
        {this.renderPhoto()}
        <View style={styles.photo_buttonContainer}>
          <Button 
            onPress={() => this.selectPhotoTapped()}
            text={photoButtonText}
            viewStyle={styles.photo_button} />
        </View>
        {this.renderAnswers()}
      </ScrollView>
    )
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'drawer') {
        this.props.navigator.toggleDrawer({
          side: 'left',
          passPropsLeft: {currentScreen: 'Today'}
        });
      }
    } else if (event.type == 'DeepLink') {
//      console.log('deep link pressed')
      if (event.link === 'Calendar') {
        // handle the link somehow, usually run a this.props.navigator command
        this.props.navigator.resetTo({
          screen: 'app.Calendar',
          title: 'C A L E N D A R',
          animationType: 'fade',
        });
      }
      if (event.link === 'Map') {
        // handle the link somehow, usually run a this.props.navigator command
        this.props.navigator.resetTo({
          screen: 'app.Map',
          title: 'M A P',
          animationType: 'fade',
        });
      }
    }
  }

  updateSize = (height) => {
    this.setState({
      height
    })
  }

  gotoEditAnswer(answer, color1, color2){
    this.props.navigator.showModal({
      screen: 'app.EditAnswer',
      title: 'A N S W E R',
      passProps: {answer, color1, color2}
    })
  }

  
  selectPhotoTapped() {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          imageSource: source
        });
        realm.write(() => {
          this.state.entry.imageSource = JSON.stringify(source)
        })
      }
    });
  }

}

const styles = StyleSheet.create({
  innerContainer: {
    paddingTop: 10
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
  photo_button: {
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 30
  },
  photo_buttonContainer: {
    // alignSelf: 'center',
    // marginTop: 30
  }
})

module.exports = Today