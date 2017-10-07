import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import GlobalStyles from '../../GlobalStyles'
import Utils from '../../Utils'
import realm from '../../realm'
import Button from './Button'
var emojis = Utils.emojis()

class Card extends Component {
  renderPhoto(imageSource) {
    console.log(imageSource)
    if (imageSource != '') {
      return (
        <View style={[GlobalStyles.photo_container, {marginBottom: 20}]}>
          <Image style={GlobalStyles.photo} source={JSON.parse(imageSource)} />
        </View>
      )
    }
  }

  renderAnswers () {
    return this.props.entry.answers.map((answer, i) => {
      var color = answer.text ? '#4A4A4A' : '#9B9B9B'
      var location = answer.location === '' ? '' : JSON.parse(answer.location)
      return (
        <View key={i}>
          <Text style={[GlobalStyles.p, GlobalStyles.card_question]}>{answer.question}</Text>
          <Text style={[GlobalStyles.p, GlobalStyles.card_answer, {color: color}]}>{answer.text ? answer.text : 'No answer for this question.'}</Text>
          {Utils.isBlank(answer.location) ? null : 
            <Text style={[styles.card_location_text, GlobalStyles.buttonStyleText]}>📍 {location.name.toUpperCase()}</Text>
          }
        </View>
      )
    })
  }

  render () {
    var entry = this.props.entry
    var day = (entry.dateCreated.getDate()) < 10 ? '0' + entry.dateCreated.getDate() : entry.dateCreated.getDate()
    return (
      <View style={[GlobalStyles.container, GlobalStyles.innerContainer, GlobalStyles.shadow, styles.card]}>
        <View style={[styles.card_circle, {backgroundColor: entry.color}]} />
        <Text style={styles.card_title}>{day}</Text>
        {this.renderPhoto(entry.imageSource)}
        {this.renderAnswers()}
        <View style={styles.card_bottomContainer}>
          <Button 
            onPress={() => this.gotoEdit(this.props.entry.dateCreated)}
            text='EDIT ENTRY'
            viewStyle={styles.card_editEntry} />
          <Text style={styles.card_emoji}> {emojis[entry.rating]} </Text>
        </View>
      </View>
    )
  }

  gotoEdit (dateCreated) {
    this.props.navigator.push({
      screen: 'app.EditEntry',
      title: 'E D I T',
      passProps: {dateCreated}
    })
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 20,
    marginBottom: 20,
    padding: 20
  },
  card_circle: {
    width: 117,
    height: 117,
    marginLeft: -33,
    backgroundColor: '#DD5F8E',
    borderRadius: 100,
  },
  card_title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 64,
    fontFamily: 'BrandonGrotesque-Black',
    marginTop: -107,
    marginBottom: 40,
  },
  card_question: {
    color: '#4A4A4A',
    fontSize: 20,
    fontFamily: 'FreightDispBold',
    marginBottom: 17,
    marginTop: 15
  },
  card_answer: {
    color: '#808080',
    fontSize: 20,
    marginBottom: 15,
  },
  card_location_text: {
    marginBottom: 20,
    marginTop: 10
  },
  card_bottomContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 20
  },
  card_emoji: {
    fontSize: 24
  },
  card_editEntry: {
    marginTop: 5
  },
})

module.exports = Card
