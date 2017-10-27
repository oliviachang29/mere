import React, { Component } from 'react'
import { View, Image, StyleSheet, PixelRatio, Text } from 'react-native'
import GlobalStyles from '../../GlobalStyles'

class Avatar extends Component {
  render () {
    console.log('this.props.imageSource...' + JSON.stringify(this.props.imageSource))
    return (
      <View style={[styles.photo_container, this.props.viewStyle]}>
        {/*<Image style={[styles.photo, this.props.photoStyle]} source={this.props.imageSource} />*/}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  photo_container: {
    borderColor: 'transparent',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 200,
    marginRight: 23
    // borderColor: 'black'
  },
  photo: {
    width: 60,
    height: 60
  }
})
module.exports = Avatar
