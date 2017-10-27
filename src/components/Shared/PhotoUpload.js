import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import GlobalStyles from '../../GlobalStyles'
import realm from '../../realm'
import Button from './Button'
import XButton from './XButton'
import Photo from './Photo'
var ImagePicker = require('react-native-image-picker')
// var RNFS = require('react-native-fs')

class PhotoUpload extends Component {
  constructor (props) {
    super(props)
    this.state = {
      imageSource: this.props.imageSource,
      animating: false
    }
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this)
  }

  removePhoto() {
    this.setState({imageSource: ''})
    realm.write(() => {
      this.props.answer.imageSource = ''
      this.props.answer.fileName = ''
    })
  }

  render () {
    const photoButtonText = this.state.imageSource === '' ? '🌆  ADD PHOTO' : '🌃  CHANGE PHOTO'
    return (
      <View style={styles.photo_buttonContainer}>
        <View style={GlobalStyles.pullRight_container}>
          <Button
            onPress={() => this.selectPhotoTapped()}
            text={photoButtonText}
            viewStyle={styles.photo_button} />
          {this.state.imageSource === '' ? null : 
            <XButton onPress={() => this.removePhoto()} />
          }
        </View> 
        {!this.props.photo ? null : 
          <Photo imageSource={this.state.imageSource} photoStyle={{marginTop: 30}}/>
        }
        <ActivityIndicator animating={this.state.animating} style={styles.ActivityIndicator} />
      </View>
    )
  }

  selectPhotoTapped () {
    this.setState({animating: true})
    
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled photo picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        var uri = response.uri
        let source = { uri: uri }
        this.props.onUpload(source)

        var fileName = uri.replace(/^.*[\\\/]/, '') // get name, ex: xxxx-xxxx.jpg
        this.setState({
          imageSource: source
        })
        realm.write(() => {
          this.props.answer.fileName = fileName
        })
      }

      this.setState({animating: false})
    })
  }
}

const styles = StyleSheet.create({
  photo_button: {
    // alignSelf: 'center',
    marginTop: 15
    // marginBottom: 30
  },
  photo_buttonContainer: {
    // alignSelf: 'center',
    // marginTop: 30
    flex: 1
  },
  ActivityIndicator: {
    marginTop: 30
  }
})
module.exports = PhotoUpload
