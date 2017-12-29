import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, PixelRatio} from 'react-native'
import GlobalStyles from '../GlobalStyles'
import realm from '../realm'
import Utils from '../Utils'
import store from 'react-native-simple-store'
// import { VictoryChart, VictoryTheme, VictoryLine } from "victory-native";
var moment = require('moment');

var emojis = Utils.emojis()
var days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
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

    var entries = realm.objects('Entry').sorted('dateCreated');
    var entryCount = entries.length
    let answers = realm.objects('Answer')
    let answersWithPhoto = answers.filtered('fileName != ""')
    let answersWithLocation = answers.filtered('location != ""')

    var moodTotal = 0
    var past7DaysCount = 0
    past7DaysMoodTotal = 0
    var past30DaysCount = 0
    past30DaysMoodTotal = 0
    var pastYearCount = 0
    var secondToLastEntryWritten

    entries.map(function(entry, i) {
      console.log(i)
      moodTotal += entry.rating
      if (isWithinPastNumberOfDays(entry.dateCreated, 365)) {
        // entry was made within last year
        pastYearCount += 1
        if (isWithinPastNumberOfDays(entry.dateCreated, 30)) {
          // entry was made within last 30 days
          past30DaysCount += 1
          past30DaysMoodTotal += entry.rating
          if (isWithinPastNumberOfDays(entry.dateCreated, 7)) {
            // entry was made within last 7 days
            past7DaysCount += 1
            past7DaysMoodTotal += entry.rating
            // past7Days.push({day: days[entry.dateCreated.getDay()], rating: entry.rating})
          }
        }
      }
      // if it is the second to last entry
      if (i === (entryCount - 1)) {
        console.log('i ... ' + i)
        var secondToLastEntryWritten = entry.dateCreated
        console.log(entry.dateCreated)
      }
    })

    this.state = {
      entryCount: entryCount,
      locationsCount: answersWithLocation.length,
      photosCount: answersWithPhoto.length,
      averageMood: Math.round(moodTotal / entryCount),
      
      past7DaysCount: past7DaysCount,
      past7DaysAverageMood: Math.round(past7DaysMoodTotal / past7DaysCount),
      
      past30DaysCount: past30DaysCount,
      past30DaysAverageMood: Math.round(past30DaysMoodTotal / past30DaysCount),
      
      pastYearCount: pastYearCount,
      // timeSinceLastEntry: moment(secondToLastEntryWritten).fromNow(true)
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  componentDidMount() {
    store.get('user')
      .then(result => {
        this.setState({dateJoined: Utils.formatDate(result.dateJoined)})
      })
      .catch(error => {
        console.log('error: \n\n' + error)
      })
  }

  render () {
    return (
      <ScrollView style={styles.innerContainer} showsVerticalScrollIndicator={false}>
        <View style={[styles.photo_container, this.props.viewStyle]}>
          <Image style={[styles.photo, this.props.photoStyle]} source={require('../assets/images/avatar.png')} />
        </View>
        <Text style={[GlobalStyles.buttonStyleText, styles.yourActivityText]}>YOU</Text>
        <Text style={[GlobalStyles.p, styles.dateJoinedText]}>joined {this.state.dateJoined}</Text>
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
          <Text style={[styles.stats_amount, styles.averageMood_emoji]}> {emojis[this.state.averageMood]} </Text> 
          <Text style={[GlobalStyles.p, styles.text]}>On average, you are {emoji_captions[this.state.averageMood]}</Text>
        </View>

        <View style={[GlobalStyles.separator, styles.separator]} />

{/* Removed because it always said "a few seconds ago" */}
{/*     <View style={styles.container}>
          <Text style={styles.stats_amount}>{this.state.timeSinceLastEntry}</Text>
          <Text style={[GlobalStyles.p, styles.text]}>Time since you last wrote an entry.</Text>
        </View>
        <View style={[GlobalStyles.separator, styles.separator]} />
*/}
        <Text style={[GlobalStyles.p, styles.text]}>Average mood of the past...</Text>
        <View style={[styles.stats_container, styles.pastDaysMood_container]}>
          <StatItem 
            amount={emojis[this.state.past7DaysAverageMood]}
            caption='7 days'
            flipped />
          <StatItem 
            amount={emojis[this.state.past30DaysAverageMood]}
            caption='30 days'
            flipped />
        </View>

        <View style={[GlobalStyles.separator, styles.separator]} />
        <Text style={[GlobalStyles.p, styles.text]}>Number of entries made in the past...</Text>
        <View style={[styles.stats_container, styles.pastDaysCount_container]}>
          <StatItem 
            amount={this.state.past7DaysCount}
            caption='7 days'
            flipped />
          <StatItem 
            amount={this.state.past30DaysCount}
            caption='30 days'
            flipped />
          <StatItem 
            amount={this.state.pastYearCount}
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
  dateJoinedText: {
    margin: 25,
    color: '#9E9E9E',
    alignSelf: 'center',
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
    // fontSize: 30,
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
  pastDaysMood_container: {
    marginLeft: 100,
    marginRight: 100
  },
  pastDaysCount_container: {
    marginBottom: 60
  }
})

module.exports = Stats
