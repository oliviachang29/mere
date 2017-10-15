import React, { Component } from 'react'
import { View, Image, StyleSheet, PixelRatio } from 'react-native'
import GlobalStyles from '../../GlobalStyles'
import Utils from '../../Utils'

class Photo extends Component {
  renderPhoto () {
    if (this.props.imageSource && this.props.imageSource != '') { // && Utils.parseable(src)) {
      return (
        <View style={[styles.photo_container, this.props.viewStyle]}>
          <Image style={[styles.photo, this.props.photoStyle]} source={JSON.parse(this.props.imageSource)} />
        </View>
      )
    }
  }

  render () {
    return (
      <View>{this.renderPhoto()}</View>
    )
  }
}

const styles = StyleSheet.create({
  photo_container: {
    borderColor: 'transparent',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  photo: {
    width: '100%',
    height: 200
  }
})
module.exports = Photo
