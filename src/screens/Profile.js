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

class Profile extends Component {
	static navigatorStyle = Utils.navigatorStyle()
  static navigatorButtons = Utils.navigatorButtons()

  constructor(props) {
  	super(props)
  	var imageSource = require('../assets/images/avatar.png')
  	var entries = realm.objects('Entry')
  	var entryCount = entries.length
  	let answers = realm.objects('Answer')
    let answersWithPhoto = answers.filtered('imageSource != ""')
    let answersWithLocation = answers.filtered('location != ""')

    var photos = []

    answersWithPhoto.map(function(answer, i) {
    	var newAnswer = {}
    	newAnswer.i = i
    	newAnswer.src = answer.imageSource
      newAnswer.dateCreated = answer.dateCreated
      photos.push(newAnswer)
    })

  	this.state = {
  		name: 'Olivia Chang',
  		dateJoined: '6/27/17',
  		imageSource: imageSource,
  		entryCount: entryCount,
  		locationsCount: answersWithLocation.length,
  		photosCount: answersWithPhoto.length,
  		photos: photos,
  	}
  	this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'drawer') {
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

  renderPhotoGrid() {
  	if (this.state.photosCount > 0) {
  		return (
  			<Grid items={this.state.photos} navigator={this.props.navigator} />
  		)
  	} else {
  		return (
  			<Text style={[GlobalStyles.h5]}>No photos to show.</Text>
  		)
  	}
  }

  render () {
    return (
      <ScrollView style={styles.ScrollView} showsVerticalScrollIndicator={false}>
      	<View style={styles.subheading_container}>
      		<Avatar imageSource={this.state.imageSource} />
      		<View style={styles.subheading_rightContainer}>
        		<Text style={styles.subheading_name}>{this.state.name}</Text>
        		<Text style={[GlobalStyles.h5, styles.subheading_joined]}>joined {this.state.dateJoined}</Text>
        		<Button
  						text='🗺 OPEN MAP'
  						onPress={() => this.gotoMap()}
  						viewStyle={styles.subheading_openMap_button} />
        	</View>
        </View>
        <View style={styles.stats_container}>
        	<View style={[styles.stats_indv_container, styles.stats_entries_container]}>
        		<Text style={[styles.stats_amount]}>{this.state.entryCount}</Text>
        		<Text style={[GlobalStyles.h5, styles.stats_caption]}>entries</Text>
        	</View>
        	<View style={[styles.stats_indv_container, styles.stats_locations_container]}>
        		<Text style={styles.stats_amount}>{this.state.locationsCount}</Text>
        		<Text style={[GlobalStyles.h5, styles.stats_caption]}>locations</Text>
        	</View>
        	<View style={[styles.stats_indv_container, styles.stats_pictures_container]}>
        		<Text style={styles.stats_amount}>{this.state.photosCount}</Text>
        		<Text style={[GlobalStyles.h5, styles.stats_caption]}>pictures</Text>
        	</View>
        </View>
        <View style={[GlobalStyles.separator, styles.separator]} />
        <View style={[GlobalStyles.innerContainer, styles.innerContainer]}>
        	<Text style={[GlobalStyles.buttonStyleText, styles.title, styles.photos_title]}>PHOTOS</Text>
	        {this.renderPhotoGrid()}
	      </View>
      </ScrollView>
    )
  }

  gotoMap () {
    this.props.navigator.push({
      screen: 'app.Map',
      title: 'M A P'
    })
  }

}

const styles = StyleSheet.create({
	innerContainer: {
		marginBottom: 30
	},
	subheading_container: {
		paddingTop: 50,
		paddingBottom: 50,
		paddingLeft: 23,
		backgroundColor: '#F9F9F9',
		flexDirection: 'row'
	},
	subheading_rightContainer: {
		marginTop: 5
	},
	subheading_name: {
		fontFamily: 'FreightDispBold',
		fontSize: 24
	},
	subheading_joined: {
		marginTop: 5
	},
	subheading_openMap_button: {
		marginTop: 30,
	},
	stats_container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20
	},
	stats_indv_container: {
		alignItems: 'center'
	},
	stats_entries_container: {
		marginLeft: 50,
	},
	stats_locations_container: {

	},
	stats_pictures_container: {
		marginRight: 50,
	},
	stats_amount: {
		color: '#4A4A4A',
		fontFamily: 'FreightDispBold',
		fontSize: 48
	},
	stats_caption: {

	},
	separator: {
		marginTop: 32
	},
	title: {
		color: '#4A4A4A'
	},
	photos_title: {
		marginTop: 20,
		marginBottom: 20
	},
	locations_title:{
		marginTop: 30,
		marginBottom: 15,
		flex: 1
	},
	locations_title_container: {
		// flexDirection: 'row'
		// marginBottom: 15
	},
	locations_openmap: {
		alignSelf: 'flex-end',
		flex: 1,
		marginTop: -35,
	}
})

module.exports = Profile
