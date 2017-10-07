import realm from './realm'
let Utils = {
  randomNum (max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  // For today.js - get time of day
  getTimeOfDay(time){
    var today = new Date()
    var curHr = today.getHours()

    if (curHr < 12) {
      return 'morning'
    } else if (curHr < 18) {
      return 'afternoon'
    } else {
      return 'evening'
    }
  },
  // Need to push answers to separate array and set it as this.state.answers
  // because the answers are actively edited by user, and if it were this.state.entry.answers
  // every time the user edited a textinput, it would need a realm.write
  pushAnswersToArray(entry) {
    var answers = []
    entry.answers.map(function(answer, i) {
       var newAnswer = {}
       newAnswer.question = answer.question
       newAnswer.text = answer.text
       newAnswer.height = answer.height
       answers.push(newAnswer)
    })
    return answers
  },
  createAnswers(entry) {
    realm.write(() => {
      entry.answers.push({question: 'What was the best part?', entryId: entry.id, dateCreated: new Date()})
      entry.answers.push({question: 'What was the worst part?', entryId: entry.id, dateCreated: new Date()})
      entry.answers.push({question: 'What was the funniest part?', entryId: entry.id, dateCreated: new Date()})
    })
  },
  // just returns set informationeach time
  gradientColors () {
    return [{first: '#DA608F', second: '#8E80A4'},
            {first: '#13B4C6', second: '#8E80A4'},
            {first: '#FEC65B', second: '#8E80A4'}]
  },
  emojis () {
    return ['😞', '🙁', '😐', '🙂', '😄']
  },
  colors () {
    return ['#FF708D', '#DE9796', '#F4A04F', '#86CB92', '#3BC1A5', '#5EBCD0', '#64B0D6', '#4E8794', '#6A78B7', '#B58CBE', '#C493BB', '#DA9F93', '#8A1C7C', '#FAA275', '#985277', '#13B4C6', '#FFC75B', '#519D9E', '#9DC8C8', '#D1B6E1', '#3EB17D']
  },
  monthNames () {
  	return ['January', 'February', 'March', 'April', 'May', 'June',
  	 'July', 'August', 'September', 'October', 'November', 'December']
  },
  monthNamesShort () {
    return ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.']
  },
  isBlank (text) {
    return !text.replace(/\s/g, '') ? true : false
  },
  capitalizeAndSpace(text) {
    return text.split('').join(' ').toUpperCase()
  }
}

module.exports = Utils
