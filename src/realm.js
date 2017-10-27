'use strict'

const Realm = require('realm')

class Entry extends Realm.Object {}
Entry.schema = {
  name: 'Entry',
  primaryKey: 'id',
  properties: {
    id: 'string',
    dateCreated: 'date',
    answers: {type: 'list', objectType: 'Answer'}, // creates a to-many relationship between entry and answers
    rating: {type: 'int', default: 2},
    color: 'string'
  }
}

class Answer extends Realm.Object {}
Answer.schema = {
  name: 'Answer',
  primaryKey: 'id',
  properties: {
    id: 'string',
    dateCreated: 'date',
    question: {type: 'string', default: ''},
    text: {type: 'string', default: ''},
    height: {type: 'int', default: 40},
    location: {type: 'string', default: ''},
    random: {type: 'bool', default: false},
    fileName: {type: 'string', default: ''}
  }
}

export default new Realm({
  schema: [Entry, Answer],
  schemaVersion: 31
})
