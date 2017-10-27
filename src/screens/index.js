import {Navigation} from 'react-native-navigation'
// Navigation
import Drawer from './Drawer'
import Notification from './Notification'
// General screens
import Today from './Today'
import Map from './Map'
import Photos from './Photos'
import Settings from './Settings'
import Locked from './Locked'
import Stats from './Stats'
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
  Navigation.registerComponent('app.Photos', () => Photos)
  Navigation.registerComponent('app.Settings', () => Settings)
  Navigation.registerComponent('app.Locked', () => Locked)
  Navigation.registerComponent('app.Stats', () => Stats)

  Navigation.registerComponent('app.Calendar', () => Calendar)
  Navigation.registerComponent('app.EditEntry', () => EditEntry)
  Navigation.registerComponent('app.NewEntry', () => NewEntry)
  Navigation.registerComponent('app.ShowAnswer', () => ShowAnswer)
  Navigation.registerComponent('app.EditAnswer', () => EditAnswer)
}
