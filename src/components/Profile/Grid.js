import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, PixelRatio } from 'react-native'
import PhotoGrid from 'react-native-photo-grid'
import GlobalStyles from '../../GlobalStyles'
import Utils from '../../Utils'
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
        itemMargin={30}
        renderHeader={this.renderHeader}
        renderItem={this.renderItem.bind(this)}
      />
    )
  }

  renderItem (item, itemSize) {
    return (
      <TouchableOpacity onPress={() => this.onPhotoPress(item)} key={item.i}>
        <Photo imageSource={item.src} photoStyle={styles.photo} />
      </TouchableOpacity>
    )
  }

  onPhotoPress (item) {
    var dateCreated = Utils.capitalizeAndSpace(Utils.formatDate(item.dateCreated))
    this.props.navigator.showModal({
      screen: 'app.ShowAnswer',
      title: dateCreated,
      passProps: {
        id: item.id,
      }
    })
  }
}

const styles = StyleSheet.create({
  photo: {
  	width: 100,
    // width: '30%',
  	height: 100
  }
})
module.exports = Grid
