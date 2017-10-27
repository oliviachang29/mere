import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, PixelRatio} from 'react-native'
import GlobalStyles from '../GlobalStyles'
import realm from '../realm'
import Utils from '../Utils'
var emojis = Utils.emojis()
var emoji_captions = [
'very sads.',
'somewhat sad.',
'neither happy nor sad.',
'pretty happy.',
'very happy.'
]
class Stats extends Component {
  static navigatorStyle = Utils.navigatorStyle()
  static navigatorButtons = Utils.navigatorButtons()

  constructor(props) {
    super(props)

    var entries = realm.objects('Entry')
    var entryCount = entries.length
    let answers = realm.objects('Answer')
    let answersWithPhoto = answers.filtered('fileName != ""')
    let answersWithLocation = answers.filtered('location != ""')

    var moodTotal = 0
    entries.map(function(entry, i) {
      moodTotal += entry.rating
    })
    console.log(moodTotal)
    var averageMood = Math.round(moodTotal / entries.length)
    console.log(averageMood)

    this.state = {
      entryCount: entryCount,
      locationsCount: answersWithLocation.length,
      photosCount: answersWithPhoto.length,
      averageMood: averageMood
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  render () {
    return (
      <ScrollView style={[GlobalStyles.innerContainer, styles.innerContainer]}>
        <View style={[styles.photo_container, this.props.viewStyle]}>
          <Image style={[styles.photo, this.props.photoStyle]} source={require('../assets/images/avatar.png')} />
        </View>
        <Text style={[GlobalStyles.buttonStyleText, styles.yourActivityText]}>YOU</Text>
        <View style={[GlobalStyles.separator, styles.separator]} />
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
        <View style={styles.averageMood_container}>
          {/*<Text style={[GlobalStyles.buttonStyleText, styles.averageMood_title]}>AVERAGE MOOD</Text>*/}
          <Text style={styles.averageMood_emoji}> {emojis[this.state.averageMood]} </Text> 
          <Text style={[GlobalStyles.p, styles.averageMood_text]}>On average, you are {emoji_captions[this.state.averageMood]}</Text>
        </View>
        
        
        
        {/*<Text style={[GlobalStyles.buttonStyleText]}>LATEST STREAK</Text>*/}
      </ScrollView>
    )
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
}

const styles = StyleSheet.create({
  innerContainer: {
    marginTop: 30
  },
  photo_container: {
    borderColor: 'transparent',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 200,
    // borderColor: 'black'
  },
  photo: {
    width: 100,
    height: 100
  },
  yourActivityText: {
    marginTop: 20, 
    alignSelf: 'center'
  },
  separator: {
    width: '33%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  stats_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20
  },
  stats_indv_container: {
    alignItems: 'center'
  },
  stats_entries_container: {
    marginLeft: 20,
  },
  stats_locations_container: {

  },
  stats_pictures_container: {
    marginRight: 20,
  },
  stats_amount: {
    color: '#4A4A4A',
    fontFamily: 'FreightDispBold',
    fontSize: 48
  },
  stats_caption: {

  },
  averageMood_container: {
    // marginTop: 10,
    // marginBottom: 30
  },
  averageMood_title: {
    
  },
  averageMood_emoji: {
    fontSize: 30,
    marginTop: 15,
    marginBottom: 15,
    alignSelf: 'center'
  },
  averageMood_text: {
    alignSelf: 'center',
    fontSize: 17
  }
})

module.exports = Stats
