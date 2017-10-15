import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Keyboard } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LinearGradient from 'react-native-linear-gradient'
import Button from '../../components/Shared/Button'
import GlobalStyles from '../../GlobalStyles'
import realm from '../../realm'
import Utils from '../../Utils'
import RNGooglePlaces from 'react-native-google-places'
import PhotoUpload from '../../components/Shared/PhotoUpload'
import Photo from '../../components/Shared/Photo'

class XButton extends Component {
  render () {
    return (
      <TouchableOpacity 
        style={GlobalStyles.pullRight}
        onPress={this.props.onPress}>
        <Image source={require('../../assets/images/x.png')} style={styles.x} />
      </TouchableOpacity>
    )
  }
}

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
    var answer = this.props.answer
    var location = answer.location === '' ? '' : JSON.parse(answer.location)
    this.state = {
      text: answer.text,
      height: answer.height,
      location: location,
      imageSource: answer.imageSource
    }
    this.openSearchModal = this.openSearchModal.bind(this)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
    .then((place) => {
      console.log(place);
      this.setState({location: place})
      realm.write(() => {
        this.props.answer.location = JSON.stringify(place)
      })
    })
    .catch(error => console.log(error.message));  // error is a Javascript Error object
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
          <XButton onPress={() => this.setState({location: ''})} />
        }
      </View>
    )
  }

  renderPhoto() {
    // if imageSource is a string, then don't stringify
    // if not a string (then an object), stringify
    var imageSourceForPhoto = (typeof(this.state.imageSource) === 'string') ? this.state.imageSource : JSON.stringify(this.state.imageSource)
    return (
      <View>
        <View style={GlobalStyles.pullRight_container}>
          <PhotoUpload 
            answer={this.props.answer} 
            imageSource={this.state.imageSource}
            onUpload={(imageSource) => {this.setState({imageSource: imageSource})}} />
          {this.state.imageSource === '' ? null : 
            <XButton onPress={() => this.setState({imageSource: ''})} />
          }
        </View>
        <Photo imageSource={imageSourceForPhoto} photoStyle={{marginTop: 30}}/>
      </View>
    )
  }

  render () {
    // had to do some trickery with state so that the state wasn't delayed too much
    var state = this.state
    return (
      <KeyboardAwareScrollView style={styles.innerContainer} extraHeight={140}>
        <View style={[GlobalStyles.shadow, styles.innerContainer, GlobalStyles.card_container]}>
          <View style={styles.card_subheadingContainer}>
            <Text style={[GlobalStyles.h4, GlobalStyles.card_textInput_prompt]}>{this.props.answer.question}</Text>
          </View>
          <View style={GlobalStyles.card_textInput_container}>
            <TextInput
              autoCorrect
              spellCheck
              editable
              multiline
              placeholder="Write about your day here..."
              defaultValue={state.text}
              onEndEditing={() => this.setState(state)}
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

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'x') {
        Keyboard.dismiss()
        realm.write(() => {
          this.props.answer.text = this.state.text
          this.props.answer.height = this.state.height
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
  x: {
    width: 15
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
