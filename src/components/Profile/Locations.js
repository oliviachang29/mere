import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import GlobalStyles from '../../GlobalStyles'

class Locations extends Component {
  renderLocations () {
    return this.props.items.map((item, i) => {
      var location = JSON.parse(item.location) // we already know that the location exists, so no need to check
      return (
        <View key={i}>
          <Text style={[styles.card_location_text, GlobalStyles.h5]}>📍 {location.name}</Text>
        </View>
      )
    })
  }

  render () {
  	return (
    <View>
      {this.renderLocations()}
    </View>
  	)
  }
}

const styles = StyleSheet.create({

})
module.exports = Locations
