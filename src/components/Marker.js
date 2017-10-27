import React, { PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'

const propTypes = {
  fontSize: PropTypes.number
}

const defaultProps = {
  fontSize: 13
}

class Marker extends React.Component {
  render () {
    const { fontSize, title, description, color } = this.props
    return (
      <TouchableOpacity onPress={() => this.props.onPress()} style={styles.container}>
        <View style={[styles.bubble]}>
          <Text style={[styles.title]}>{title}</Text>
        </View>
        <View style={styles.arrowBorder} />
        <View style={styles.arrow} />
      </TouchableOpacity>
    )
  }
}

Marker.propTypes = propTypes
Marker.defaultProps = defaultProps

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start'
  },
  bubble: {
    flex: 0,
    alignSelf: 'flex-start',
    backgroundColor: '#DD5F8E',
    padding: 5,
    borderRadius: 3
  },
  title: {
    color: 'white',
    fontFamily: 'FreightDisplayW01-Book'
  },
  description: {
    color: 'white',
    fontFamily: 'FreightDisplayW01-Book'
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#DD5F8E',
    alignSelf: 'center',
    marginTop: -9
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#DD5F8E',
    alignSelf: 'center',
    marginTop: -0.5
  }
})

module.exports = Marker
