'use strict'

const Realm = require('realm')

class Entry extends Realm.Object {}
Entry.schema = {
  name: 'Entry',
  primaryKey: 'id',
  properties: {
    id: 'int',
    dateCreated: 'date',
    answers: {type: 'list', objectType: 'Answer'}, // creates a to-many relationship between entry and answers
    rating: {type: 'int', default: 3},
    color: 'string',
    imageSource: {type: 'string', default: ''},
  }
}

class Answer extends Realm.Object {}
Answer.schema = {
  name: 'Answer',
  properties: {
    entryId: 'int',
    dateCreated: 'date',
    question: {type: 'string', default: ''},
    text: {type: 'string', default: ''},
    height: {type: 'int', default: 40},
    location: {type: 'string', default: ''},
    random: {type: 'string', default: false}
  }
}

export default new Realm({
  schema: [Entry, Answer],
  schemaVersion: 23
})
