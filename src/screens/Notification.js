'use strict'

import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native'
import GlobalStyles from '../GlobalStyles'
var {width} = Dimensions.get('window')
export default class Notification extends Component {
  constructor (props) {
    super(props)

    var backgroundColor
    if (this.props.type === 'success') {
      backgroundColor = '#86CB92'
    } else if (this.props.type === 'error') {
      backgroundColor = '#D93858'
    } else {
      backgroundColor = 'white'
    }
    this.state = {
      backgroundColor: backgroundColor
    }
  }

  renderText () {
    if (this.props.text) {
      return (
        <Text allowFontScaling={false} style={[GlobalStyles.p, styles.text]}>{this.props.text}</Text>
      )
    }
  }

  render () {
    return (
      <View style={[styles.container, {backgroundColor: this.state.backgroundColor}]}>
        <View style={styles.leftCol}>
          <Text allowFontScaling={false} style={[GlobalStyles.h4, styles.title]}>{this.props.title}</Text>
          {this.renderText()}
        </View>
      </View>
    )
  }

  closeNotification () {
    this.props.navigator.dismissInAppNotification()
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 30,
    padding: 16,
    paddingBottom: 20,
    margin: 10,
    marginTop: 30,
    borderRadius: 4,
    flexDirection: 'row'
  },
  title: {
    fontSize: 20,
    color: 'white'
  },
  text: {
    marginTop: 10,
    fontSize: 17,
    color: 'white'
  }
})

module.exports = Notification
