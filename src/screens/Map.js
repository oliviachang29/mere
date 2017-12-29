import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MapView from 'react-native-maps';
import Marker from '../components/Marker';
import realm from '../realm'
import Utils from '../Utils'

function getRegionForCoordinates(points) {
  // points should be an array of { latitude: X, longitude: Y }
  let minX, maxX, minY, maxY;

  // init first point
  ((point) => {
    minX = point.latitude;
    maxX = point.latitude;
    minY = point.longitude;
    maxY = point.longitude;
  })(points[0]);

  // calculate rect
  points.map((point) => {
    minX = Math.min(minX, point.latitude);
    maxX = Math.max(maxX, point.latitude);
    minY = Math.min(minY, point.longitude);
    maxY = Math.max(maxY, point.longitude);
  });

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const deltaX = (maxX - minX);
  const deltaY = (maxY - minY);

  return {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX,
    longitudeDelta: deltaY
  };
}

class Map extends React.Component {
  static navigatorStyle = Utils.navigatorStyle()
  static navigatorButtons = Utils.navigatorButtons()

  constructor(props) {
    super(props)

    // Get answers with a location
    let answers = realm.objects('Answer');
    let answersWithLocation = answers.filtered('location != ""');
    var markers = []
    var coordinates = []
    answersWithLocation.map(function(answer, i) {
       var newMarker = {}
       var location = JSON.parse(answer.location)
       var coordinate = {latitude: location.latitude, longitude: location.longitude}
       var dateFormatted = Utils.formatDate(answer.dateCreated)
       newMarker.title = dateFormatted
       newMarker.description = location.name
       newMarker.coordinate = {latitude: location.latitude, longitude: location.longitude}
       newMarker.dateCreated = answer.dateCreated
       // newMarker.id = answer.id
       markers.push(newMarker)
       coordinates.push(coordinate)
    })
    // make sure there is at least one coordinate to generate the region from
    if (coordinates.length > 0) {
      var region = getRegionForCoordinates(coordinates)
    } else {
      var region = getRegionForCoordinates([{latitude: 90, longitude: 0}, {latitude: -90, longitude: 0}])
    }

    this.state = {
      region: region,
      markers: markers
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
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

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
        >
        {this.state.markers.map((marker, i) => (
          <MapView.Marker coordinate={marker.coordinate} key={i}>
            <Marker title={marker.title} onPress={() => this.onMarkerPress(marker)}/>
          </MapView.Marker>
        ))}
          
        </MapView>
      </View>
    );
  }

  onMarkerPress (marker) {
    var answer = realm.objects('Answer').filtered('dateCreated = $0', marker.dateCreated)[0]
    this.props.navigator.showLightBox({
      screen: 'app.ShowAnswer',
      passProps: {
        answer
      },
      style: {
        backgroundBlur: 'dark',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        tapBackgroundToDismiss: true
      }
    })
  }
}

Map.propTypes = {
  provider: MapView.ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

module.exports = Map;