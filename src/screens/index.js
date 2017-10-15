import {Navigation} from 'react-native-navigation'
// Navigation
import Drawer from './Drawer'
import Notification from './Notification'
// General screens
import Today from './Today'
import Map from './Map'
import Profile from './Profile'
import Settings from './Settings'
// Entries
import Calendar from './Entries/Calendar'
import EditEntry from './Entries/Edit'
import NewEntry from './Entries/New'
// Answers
import EditAnswer from './Answers/Edit'
import ShowAnswer from './Answers/Show'

export default function () {
  Navigation.registerComponent('app.Notification', () => Notification)
  Navigation.registerComponent('app.Drawer', () => Drawer)

  Navigation.registerComponent('app.Today', () => Today)
  Navigation.registerComponent('app.Map', () => Map)
  Navigation.registerComponent('app.Profile', () => Profile)
  Navigation.registerComponent('app.Settings', () => Settings)

  Navigation.registerComponent('app.Calendar', () => Calendar)
  Navigation.registerComponent('app.EditEntry', () => EditEntry)
  Navigation.registerComponent('app.NewEntry', () => NewEntry)
  Navigation.registerComponent('app.ShowAnswer', () => ShowAnswer)
  Navigation.registerComponent('app.EditAnswer', () => EditAnswer)
}
