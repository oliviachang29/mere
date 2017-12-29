'use strict'
import React, {Component} from 'react'
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import {Agenda, LocaleConfig} from 'react-native-calendars'
import GlobalStyles from '../../GlobalStyles'
import Utils from '../../Utils'
import realm from '../../realm'
import Card from '../../components/Shared/Card'
const {height} = Dimensions.get('window')
var monthNames = Utils.monthNames()
var colors = Utils.colors()
var quotes = require('../../assets/quotes.json')
// parse Date () into a format acceptable for calendar, ex: '2017-08-27'
function convertDateToString (date) {
  var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
  var day = (date.getDate()) < 10 ? '0' + date.getDate() : date.getDate()
  var dateString = date.getFullYear() + '-' + month + '-' + day
  return dateString
}

export default class Calendar extends Component {
  static navigatorStyle = Utils.navigatorStyle()
  static navigatorButtons = Utils.navigatorButtons()

  constructor (props) {
    super(props)

    LocaleConfig.locales['en'] = {
      monthNames: Utils.monthNames(),
      monthNamesShort: Utils.monthNamesShort(),
      dayNames: ['Su','M','T','W','Th','F','S'],
      dayNamesShort: ['Su','M','T','W','Th','F','S']
    };

    LocaleConfig.defaultLocale = 'en';

    this.state = {
      src: '',
      // example of items: {'2017-09-02': [{date: new Date(2017, 8, 2)}]}
      items: [],
      today: '',
      quotes: quotes
    }

    realm.addListener('change', () => {
      const loadToday = this.loadToday()
      this.setState({src: loadToday[0], items: loadToday[1], today: loadToday[2]})
    })

    this.onDayChange = this.onDayChange.bind(this)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  componentWillMount() {
    const loadToday = this.loadToday()
    this.setState({src: loadToday[0], items: loadToday[1], today: loadToday[2]})
  }

  loadToday() {
    // get today's date
    var date = new Date()
    var today = convertDateToString(date)

    var src = realm.objects('Entry')

    var items = {}
    // Load all entries
    for (var i = src.length - 1; i >= 0; i--) {
      // get date of the entry
      var tempDate = src[i].dateCreated
      // add to items {} obj
      // format [{date: new Date(2017, 7, 25)}]
      items[convertDateToString(tempDate)] = [{date: tempDate}]
    }
    if (!items[today]) {
      items[today] = [] // get rid of spinner on this day
    }
    return [src, items, today]
  }

  onNavigatorEvent (event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'drawer') {
        this.props.navigator.toggleDrawer({
          side: 'left',
          to: 'open'
        })
      }
    } else if (event.type == 'DeepLink') {
      console.log('deep link pressed')
      this.props.navigator.resetTo({
        screen: 'app.' + event.link,
        title: Utils.capitalizeAndSpace(event.link),
        animationType: 'fade'
      })
    }
  }

  onDayChange (day) {
    // console.log('onDayChange() called')
    // convert from returned day object to a date
    var date = new Date(day.year, day.month - 1, day.day)
    var dateString = convertDateToString(date)
    if (!this.state.items[dateString]) {
      console.log('No entry for this date, adding this date to this.state.items...')
      // this.state.items[dateString] = []
      let clone = Object.assign({}, this.state.items, { [dateString]: [] })
      this.setState({ items: clone })
    } else if (this.state.items[dateString] === []) {
      console.log('No entry for this date, already added date to this.state.items.')
    } else {
      console.log('Found an entry for this date.')
    }
  }

  renderCard (date) {
    // console.log('switched to date: ' + date)
    var selectedEntry = this.state.src.filtered('dateCreated = $0', date)
    if (selectedEntry != '') {
      return (<Card entry={selectedEntry[0]} navigator={this.props.navigator} />)
    }
  }

  renderEmptyStateButton(date) {
    var today = new Date()
    today.setDate(today.getDate() - 1)
    if (date < today) {
      return (
        <TouchableOpacity onPress={() => this.gotoNewEntry(date)} style={styles.emptyState_button}>
          <Text style={styles.emptyState_button_text}>Add an entry</Text>
        </TouchableOpacity>
      )
    }
  }

  // Empty State
  renderEmptyDate (day) {
    console.log(day)
    var randomNum = Utils.randomNum(quotes.length, 0)
    return (
      <View>
        <View style={[GlobalStyles.container, styles.emptyState_container]}>
          <Text style={[GlobalStyles.p, GlobalStyles.centered, styles.emptyState_text]}>No entry on this date.</Text>
          <Text style={[GlobalStyles.p, styles.emptyState_quote]}>{this.state.quotes[randomNum] ? this.state.quotes[randomNum].quote : ''}</Text>
          <Text style={[GlobalStyles.p, styles.emptyState_author]}>{this.state.quotes[randomNum] ? '- ' + this.state.quotes[randomNum].name : ''}</Text>
          {this.renderEmptyStateButton(day[0])}
        </View>
        <View style={styles.separator} />
      </View>
    )
  }

  render () {
    return (
      <View style={GlobalStyles.container}>
        <Agenda
          items={this.state.items}
          // callback that gets called when items for a certain month should be loaded (month became visible)
          onDayPress={(day) => { this.onDayChange(day) }}
          onDayChange={(day) => { this.onDayChange(day) }}
          // initially selected day
          selected={this.state.today}
          // specify how each item should be rendered in agenda
          renderItem={(item, firstItemInDay, date) => { return (<View>{this.renderCard(item.date)}</View>) }}
          renderEmptyDate={(day) => this.renderEmptyDate(day)}
          rowHasChanged={(r1, r2) => { return r1.date !== r2.date }}
          renderDay={(day, item) => {return (<View />);}}
          renderKnob={() => {return (<View style={styles.knob} />)}}
          theme={{
            calendarBackground: '#ffffff',
            textDayFontFamily: 'Gibson-Regular',
            textMonthFontFamily: 'FreightDispBold',
            textDayHeaderFontFamily: 'FreightDisplayW01-Book',
            textMonthFontSize: 24,
            dotColor: '#13B4C6',
            selectedDayBackgroundColor: '#13B4C6',
            selectedDotColor: '#13B4C6',
            todayTextColor: '#13B4C6',
            dayTextColor: '#797979',
          }}
          style={{}}
        />
      </View>
    )
  }

  gotoNewEntry(date) {
    date.setDate(date.getDate()+1)
    var entry
    realm.write(() => {
      entry = realm.create('Entry', {
        id: Utils.uuid(),
        dateCreated: date,
        answers: [],
        color: colors[Utils.randomNum(21, 0)]
      })
    })
    Utils.createAnswers(entry)
    this.props.navigator.push({
      screen: 'app.EditEntry',
      title: 'N E W',
      passProps: {dateCreated: date}
    })
  }
}

const styles = StyleSheet.create({
  calendar: {
    paddingTop: 5
  },
  separator: {
    // width: '80%',
    // height: 1,
    // alignSelf: 'center',
    // backgroundColor: '#B3B3B3'
  },
  emptyState_container: {
    height: height,
    paddingLeft: 24,
    paddingRight: 24,
    marginTop: -120,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyState_text: {
    marginTop: 20,
    marginBottom: 40,
    fontSize: 25
  },
  emptyState_quote: {
    color: '#B3B3B3',
    fontSize: 20,
    textAlign: 'center'
  },
  emptyState_author: {
    color: '#B3B3B3',
    fontSize: 20,
    marginTop: 30,
  },
  emptyState_button: {
    alignItems: 'center',
    // justifyContent: 'center',
    width: 217,
    height: 53,
    marginTop: 67,
    backgroundColor: '#DD5F8E',
    borderRadius: 2000
  },
  emptyState_button_text: {
    fontFamily: 'FreightDisplayW01-Book',
    color: 'white',
    fontSize: 19,
    marginTop: 12
  },
  emptyState_future: {
    color: '#595959',
    fontSize: 20,
    textAlign: 'center'
  },
  knob: {
    width: 45,
    height: 3,
    backgroundColor: '#D8D8D8',
    borderRadius: 100,
    marginTop: 15
  }
})

module.exports = Calendar
