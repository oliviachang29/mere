import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import GlobalStyles from '../../GlobalStyles'
import realm from '../../realm'
import Button from './Button'
var ImagePicker = require('react-native-image-picker')

class PhotoUpload extends Component {

  constructor(props) {
    super(props)
    this.state = {
      imageSource: this.props.imageSource
    }
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this)
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
      <View>
        {this.renderPhoto()}
      	<View style={styles.photo_buttonContainer}>
          <Button 
            onPress={() => this.selectPhotoTapped()}
            text={photoButtonText}
            viewStyle={styles.photo_button} />
        </View>
      </View>
    )
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
          this.props.answer.imageSource = JSON.stringify(source)
        })
      }
    });
  }

}

const styles = StyleSheet.create({ 
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
module.exports = PhotoUpload
