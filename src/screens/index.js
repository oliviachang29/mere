import {Navigation} from 'react-native-navigation'

import Drawer from './Drawer'
import Today from './Today'
import Map from './Map'
import Notification from './Notification'
import Calendar from './Entries/Calendar'
import ShowEntry from './Entries/Show'
import EditEntry from './Entries/Edit'
import NewEntry from './Entries/New'
import EditAnswer from './Answers/Edit'
import ShowAnswer from './Answers/Show'

export default function () {
  Navigation.registerComponent('app.Drawer', () => Drawer)
  Navigation.registerComponent('app.Today', () => Today)
  Navigation.registerComponent('app.Map', () => Map)
  Navigation.registerComponent('app.Calendar', () => Calendar)
  Navigation.registerComponent('app.Notification', () => Notification)
  Navigation.registerComponent('app.ShowEntry', () => ShowEntry)
  Navigation.registerComponent('app.EditEntry', () => EditEntry)
  Navigation.registerComponent('app.NewEntry', () => NewEntry)
  Navigation.registerComponent('app.ShowAnswer', () => ShowAnswer)
  Navigation.registerComponent('app.EditAnswer', () => EditAnswer)
}
