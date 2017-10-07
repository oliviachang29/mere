'use strict'

import {
  StyleSheet,
  PixelRatio
} from 'react-native'

const GlobalStyles = StyleSheet.create({
  // TODO: add custom fonts
  // Bold, black text at top left of each screen
  container: {
    flex: 1
  },
  innerContainer: {
    marginLeft: 26,
    marginRight: 26
  },
  centered: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dark: {
    color: '#808080',
    fontSize: 20,
    fontWeight: 'bold'
  },
  h1: {
    color: '#808080',
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'BrandonGrotesque-Bold'
  },
  h4: {
    fontFamily: 'FreightDispBold'
  },
  p: {
    fontSize: 15,
    fontWeight: 'normal',
    fontFamily: 'FreightDisplayW01-Book'
  },
  buttonStyleText: {
    fontFamily: 'BrandonGrotesque-Bold',
    fontSize: 15,
    letterSpacing: 2.5
  },
  thinUnderline: {
    borderBottomColor: '#95989A',
    borderBottomWidth: 0.5
  },
  thickUnderline: {
    borderBottomColor: '#95989A',
    borderBottomWidth: 2,
    paddingBottom: 6
  },
  success: {
    color: '#86CB92',
    fontSize: 20,
    fontWeight: 'normal',
    marginBottom: 25
  },
  shadow: {
    shadowColor: '#565656',
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 10,
    shadowOpacity: 0.19,
  },
  separator: {
    backgroundColor: '#F4F4F4',
    width: '100%',
    height: 11,
    borderRadius: 100
  },

  // screens/Today
  // screens/Entries/Edit
  photo_container: {
    borderColor: 'transparent',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  photo: {
    width: 150,
    height: 150
  },
  emoji: {
    fontSize: 24,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: 2
  },
  emoji_selected: {
    backgroundColor: '#DD5F8E',
    borderRadius: 4,
    paddingTop: 4,
    paddingBottom: 4
  },
  emoji_container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 42,
    marginRight: 42,
    marginBottom: 35
  },
  card_container: {
    borderRadius: 5,
    padding: 24,
    paddingBottom: 34,
    margin: 24,
    marginTop: 16,
    marginBottom: 16,
  },
  card_textInput_container: {
    marginBottom: 20
  },
  card_textInput_prompt: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 20,
    color: '#4A4A4A'
  },
  card_textInput: {
    color: '#9B9B9B',
    fontSize: 20,
    height: 40,
    // marginBottom: 10,
  },
  card_location_text: {
    marginTop: 20
  },
  linearGradient: {
    height: 2,
    marginTop: -5
  },
  
  // components/Shared/Card.js
  // screens/Answers/Show.js
  card_question: {
    color: '#4A4A4A',
    fontSize: 20,
    fontFamily: 'FreightDispBold',
    marginBottom: 17,
    marginTop: 15
  },
  card_answer: {
    color: '#808080',
    fontSize: 20,
    marginBottom: 15,
  },
})

module.exports = GlobalStyles
