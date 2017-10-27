import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native'
import GlobalStyles from '../GlobalStyles'
import Utils from '../Utils'
import store from 'react-native-simple-store'
import realm from '../realm'
import Avatar from '../components/Profile/Avatar'
import Grid from '../components/Profile/Grid'
import Locations from '../components/Profile/Locations'
import Button from '../components/Shared/Button'

class Photos extends Component {
	static navigatorStyle = Utils.navigatorStyle()
  static navigatorButtons = Utils.navigatorButtons()

  constructor(props) {
  	super(props)
  	
  	var entries = realm.objects('Entry')
  	let answers = realm.objects('Answer')
    let answersWithPhoto = answers.filtered('fileName != ""')

    var photos = []

    answersWithPhoto.map(function(answer, i) {
    	var newAnswer = {}
    	newAnswer.i = i
      newAnswer.id = answer.id
    	newAnswer.src = Utils.sourceFromFileName(answer.fileName)
      newAnswer.dateCreated = answer.dateCreated
      photos.push(newAnswer)
    })

  	this.state = {
  		photos: photos,
      photosCount: answersWithPhoto.length
  	}
  	this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  updateName(name) {
    store
      .update('user', {
        name: name
      })
      .catch(error => {
        console.log('error: \n\n' + error)
      })
  }

  renderPhotoGrid() {
  	if (this.state.photosCount > 0) {
  		return (
  			<Grid items={this.state.photos} navigator={this.props.navigator} />
  		)
  	} else {
  		return (
  			<Text style={[GlobalStyles.h5, styles.emptyStateText]}>No photos to show.</Text>
  		)
  	}
  }

  render () {
    return (
      <ScrollView style={[GlobalStyles.innerContainer, styles.ScrollView]} showsVerticalScrollIndicator={false}>
        {this.renderPhotoGrid()}
      </ScrollView>
    )
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      console.log('hi')
      if (event.id == 'drawer') {
        console.log('hi there')
        this.props.navigator.toggleDrawer({
          side: 'left',
          to: 'open'
        });
      }
    } else if (event.type == 'DeepLink') {
      this.props.navigator.resetTo({
        screen: 'app.' + event.link,
        title: Utils.capitalizeAndSpace(event.link),
        animationType: 'fade'
      })
    }
  }

}

const styles = StyleSheet.create({
  ScrollView: {
    marginTop: 30
  },
  emptyStateText: {
    alignSelf: 'center',
    marginTop: 40
  }
})

module.exports = Photos
