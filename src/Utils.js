import realm from './realm'
import store from 'react-native-simple-store'

var questions = [
"What did you accomplish today?",
"What made you happy today?",
"What problems did you solve today?",
"What was one thing you did become more healthy?",
"Who did you talk to today? Did you meet anyone new?",
"Who was the nicest person you talked to?",
"What did you do today to further a long term goal?",
"What did you do today to make tomorrow better?",
"What can you change to make tomorrow better?",
"How many dogs did you see today?",
"What's the funniest joke you heard today?",
"Does the world seem good today? Why or why not?",
"Did you say please and thank you today? To whom?",
"How did you treat others today?",
"How much were you online today?",
"What did you do to feel productive today? Or, what did you do to feel lazy today?",
"What shirt did you wear today?",
"Did you treat yourself today?",
 "Have I made someone smile today?",
"What made you stressed today?",
"What are you grateful today?",
"What new thing did I learn today?",
"How did I push myself today?",
"How did you relax today?"
]

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
  createAnswers(entry) {
    function setStoreQuestionNumber(number) {
      store
        .update('user', {
          questionNumber: number
        })
        .catch(error => {
          console.log('error: \n\n' + error)
        })
    }
    var questionNumber = 0
    // get the stored question number
    store.get('user')
      .then(result => {
        if (Number.isInteger(result.questionNumber)) {
          questionNumber = result['questionNumber']
        } else {
          setStoreQuestionNumber(0)
        }
      })
      .catch(error => {
        console.log('error: \n\n' + error)
        setStoreQuestionNumber(0)
      })
      .then(() => {
        realm.write(() => {
          // Create three entries
          entry.answers.push({question: 'What was the best part?', dateCreated: new Date()})
          entry.answers.push({question: 'What was the funniest part?', dateCreated: new Date()})
          entry.answers.push({question: questions[questionNumber], dateCreated: new Date(), random: true})
        })
        if (questionNumber === 22) {
          setStoreQuestionNumber(0)
          console.log('set questionNumber to 0')
        } else {
          var plusOne = questionNumber + 1
          setStoreQuestionNumber(plusOne)
          console.log('set questionNumber to ' + plusOne)
        }
      })
    // var max = 22
    // var min = 0
    // var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  },
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
  isBlank (text) {
    return !text.replace(/\s/g, '') ? true : false
  },
  capitalizeAndSpace(text) {
    return text.split('').join(' ').toUpperCase()
  },
  formatDateToNiceString(date) {
    var monthNamesShort = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.']
    return monthNamesShort[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
  }
}

module.exports = Utils
