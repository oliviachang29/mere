import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, PixelRatio} from 'react-native'
import GlobalStyles from '../GlobalStyles'
import realm from '../realm'
import Utils from '../Utils'
// import { VictoryChart, VictoryTheme, VictoryLine } from "victory-native";

var moment = require('moment');
var emojis = Utils.emojis()
var emoji_captions = [
'very sads.',
'somewhat sad.',
'neither happy nor sad.',
'pretty happy.',
'very happy.'
]

function isWithinPastNumberOfDays(date, numberOfDays) {
  return (moment().diff(date, 'days') < numberOfDays)
}


class StatItem extends Component {
  render () {
    return (
      <View style={[styles.stats_indv_container, styles.stats_locations_container]}>
        {this.props.flipped ? 
          <Text style={[GlobalStyles.h5, styles.stats_caption]}>{this.props.caption}</Text>
          : null
        }
        <Text style={styles.stats_amount}>{this.props.amount}</Text>
        {this.props.flipped ? null :
          <Text style={[GlobalStyles.h5, styles.stats_caption]}>{this.props.caption}</Text>
        }
      </View>
    )
  }
}

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
    var past7Days = 0
    var past30Days = 0
    var pastYear = 0
    entries.map(function(entry, i) {
      moodTotal += entry.rating
      if (isWithinPastNumberOfDays(entry.dateCreated, 365)) {
        console.log('entry was made within last year')
        pastYear += 1
        if (isWithinPastNumberOfDays(entry.dateCreated, 30)) {
          console.log('entry was made within last 30 days')
          past30Days += 1
          if (isWithinPastNumberOfDays(entry.dateCreated, 7)) {
            console.log('entry was made within last 7 days')
            past7Days += 1
          }
        }
      }
    })
    // calculate average mood and round
    var averageMood = Math.round(moodTotal / entries.length)

    this.state = {
      entryCount: entryCount,
      locationsCount: answersWithLocation.length,
      photosCount: answersWithPhoto.length,
      averageMood: averageMood,
      past7Days: past7Days,
      past30Days: past30Days,
      pastYear: pastYear
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  render () {
    return (
      <ScrollView style={styles.innerContainer} showsVerticalScrollIndicator={false}>
        <View style={[styles.photo_container, this.props.viewStyle]}>
          <Image style={[styles.photo, this.props.photoStyle]} source={require('../assets/images/avatar.png')} />
        </View>
        <Text style={[GlobalStyles.buttonStyleText, styles.yourActivityText]}>YOU</Text>
        <View style={styles.entriesCountContainer}>
          <View style={[styles.stats_container]}>
            <StatItem 
              amount={this.state.entryCount}
              caption='entries' />
            <StatItem 
              amount={this.state.locationsCount}
              caption='locations' />
            <StatItem 
              amount={this.state.photosCount}
              caption='pictures' />
          </View>
        </View>
        <View style={styles.averageMood_container}>
          {/*<Text style={[GlobalStyles.buttonStyleText, styles.averageMood_title]}>AVERAGE MOOD</Text>*/}
          <Text style={styles.averageMood_emoji}> {emojis[this.state.averageMood]} </Text> 
          <Text style={[GlobalStyles.p, styles.text]}>On average, you are {emoji_captions[this.state.averageMood]}</Text>
        </View>
        {/*<SimpleChart />*/}
        <View style={[GlobalStyles.separator, styles.separator]} />
        <Text style={[GlobalStyles.p, styles.text]}>Number of entries made in the past...</Text>
        <View style={[styles.stats_container]}>
          <StatItem 
            amount={this.state.past7Days}
            caption='7 days'
            flipped />
          <StatItem 
            amount={this.state.past30Days}
            caption='30 days'
            flipped />
          <StatItem 
            amount={this.state.pastYear}
            caption='year'
            flipped />
        </View>

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
    
  },
  photo_container: {
    marginTop: 30,
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
    width: '50%',
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 40
  },
  entriesCountContainer: {
    backgroundColor: '#F9F9F9',
    marginTop: 30,
    marginBottom: 30,
    paddingTop: 30,
    paddingBottom: 30
  },
  stats_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 60,
    marginRight: 60
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
  averageMood_emoji: {
    fontSize: 30,
    marginBottom: 15,
    alignSelf: 'center'
  },
  text: {
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 15,
    // fontSize: 17
  },
  chart: {
    width: 200,
    height: 200,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
})

module.exports = Stats
