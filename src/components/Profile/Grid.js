import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, PixelRatio } from 'react-native'
import PhotoGrid from 'react-native-photo-grid'
import GlobalStyles from '../../GlobalStyles'
import Photo from '../Shared/Photo'
import realm from '../../realm'
class Grid extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    	items: this.props.items
    }
  }

  render () {
    return (
      <PhotoGrid
        data={this.state.items}
        itemsPerRow={3}
        itemMargin={1}
        renderHeader={this.renderHeader}
        renderItem={this.renderItem.bind(this)}
      />
    )
  }

  renderItem (item, itemSize) {
    console.log(item.src)
    var src = JSON.parse(item.src)
    return (
      <TouchableOpacity onPress={() => this.onPhotoPress(item.dateCreated)} key={item.i}>
        <Photo imageSource={item.src} photoStyle={styles.photo} />
      </TouchableOpacity>
    )
  }

  onPhotoPress (dateCreated) {
    var answer = realm.objects('Answer').filtered('dateCreated = $0', dateCreated)[0]
    this.props.navigator.showLightBox({
      screen: 'app.ShowAnswer',
      passProps: {
        answer
      },
      style: {
        backgroundBlur: 'dark',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        tapBackgroundToDismiss: true
      }
    })
  }
}

const styles = StyleSheet.create({
  photo: {
  	width: 100,
  	height: 100
  }
})
module.exports = Grid
