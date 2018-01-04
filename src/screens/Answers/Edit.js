import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Keyboard } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LinearGradient from 'react-native-linear-gradient'
import Button from '../../components/Shared/Button'
import XButton from '../../components/Shared/XButton'
import GlobalStyles from '../../GlobalStyles'
import realm from '../../realm'
import Utils from '../../Utils'
import RNGooglePlaces from 'react-native-google-places'
import PhotoUpload from '../../components/Shared/PhotoUpload'
import Photo from '../../components/Shared/Photo'
var RNFS = require('react-native-fs')

class EditAnswer extends Component {

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
    let answers = realm.objects('Answer');
    var answer = realm.objects('Answer').filtered('id == $0', this.props.id)[0]
    var location = answer.location === '' ? '' : JSON.parse(answer.location)

    var source = Utils.sourceFromFileName(answer.fileName)

    this.state = {
      answer: answer,
      text: answer.text,
      height: answer.height,
      location: location,
      imageSource: source
    }

    this.openSearchModal = this.openSearchModal.bind(this)
    this.removeLocation = this.removeLocation.bind(this)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
    .then((place) => {
      console.log(place);
      this.setState({location: place})
      realm.write(() => {
        this.state.answer.location = JSON.stringify(place)
      })
    })
    .catch(error => console.log(error.message));  // error is a Javascript Error object
  }

  removeLocation() {
    this.setState({location: ''})
    realm.write(() => {
      this.state.answer.location = ''
    })
  }

  renderLocation() {
    var buttonText = '📍 ' + (this.state.location === '' ? 'add location' : this.state.location.name).toUpperCase()
    return (
      <View style={GlobalStyles.pullRight_container}>
        <Button 
          onPress={() => this.openSearchModal()}
          text={buttonText}
          viewStyle={[styles.card_locationButton]} />
        {this.state.location === '' ? null : 
          <XButton onPress={() => this.removeLocation()} />
        }
      </View>
    )
  }

  renderPhoto() {
    return (
      <View style={GlobalStyles.pullRight_container}>
        <PhotoUpload 
          answer={this.state.answer} 
          imageSource={this.state.imageSource}
          onUpload={(imageSource) => {this.setState({imageSource: imageSource})}}
          photo />
      </View>
    )
  }

  onEndEditing(state) {
    this.setState(state)
    realm.write(() => {
      this.state.answer.text = state.text
    })
  }

  render () {
    // had to do some trickery with state so that the state wasn't delayed too much
    var state = this.state
    return (
      <KeyboardAwareScrollView style={styles.innerContainer} extraHeight={140}>
        <View style={[GlobalStyles.shadow, styles.innerContainer, GlobalStyles.card_container]}>
          <View style={styles.card_subheadingContainer}>
            <Text style={[GlobalStyles.h4, GlobalStyles.card_textInput_prompt]}>{this.state.answer.question}</Text>
          </View>
          <View style={GlobalStyles.card_textInput_container}>
            <TextInput
              autoCorrect
              spellCheck
              editable
              multiline
              placeholder="Write about your day here..."
              placeholderTextColor="#9B9B9B"
              defaultValue={state.text}
              onEndEditing={() => this.onEndEditing(state)}
              onChangeText={(text) => {state.text = text}}
              style={[GlobalStyles.p, GlobalStyles.card_textInput, {height: this.state.height}]}
              onContentSizeChange={(e) => this.setState({height: e.nativeEvent.contentSize.height + 10})}
            />
          </View>
          <LinearGradient 
            colors={[this.props.color1, this.props.color2]} 
            style={GlobalStyles.linearGradient} 
            start={{x: 0.0, y: 0.0}} end={{x: 0.5, y: 1.0}}
            />
          {this.renderLocation()}
          {this.renderPhoto()}
        </View>
      </KeyboardAwareScrollView>
    )
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'x') {
        Keyboard.dismiss()
        realm.write(() => {
          this.state.answer.text = this.state.text
          this.state.answer.height = this.state.height
        })
        // close modal
        this.props.navigator.dismissAllModals()
      }
      if (event.id == 'back') {
        this.props.navigator.pop()
      }
    }
  }

}

const styles = StyleSheet.create({
  card_subheadingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  card_locationButton: {
    // flex: 1,
    marginTop: 30
  },
  card_button: {
    marginTop: 15
  },
})

module.exports = EditAnswer
