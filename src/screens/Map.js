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
var monthNamesShort = Utils.monthNamesShort()

function formatDateToNiceString(date) {
  return monthNamesShort[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
}

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
  static navigatorStyle = {
    navBarTextFontFamily: 'BrandonGrotesque-Medium',
    navBarTextFontSize: 20,
    // navBarButtonColor: '#D8D8D8',
  }
  
  static navigatorButtons = {
    leftButtons: [
      {
        icon: require('../assets/images/drawer-icon.png'),
        id: 'drawer',
        disableIconTint: true,
      }
    ]
  }

  constructor(props) {
    super(props);

    // Get answers with a location
    let answers = realm.objects('Answer');
    let answersWithLocation = answers.filtered('location != ""');
    var markers = []
    var coordinates = []
    answersWithLocation.map(function(answer, i) {
       var newMarker = {}
       var location = JSON.parse(answer.location)
       var coordinate = {latitude: location.latitude, longitude: location.longitude}
       var dateFormatted = formatDateToNiceString(answer.dateCreated)
       newMarker.title = dateFormatted
       newMarker.description = location.name
       newMarker.coordinate = {latitude: location.latitude, longitude: location.longitude}
       newMarker.dateCreated = answer.dateCreated
       markers.push(newMarker)
       coordinates.push(coordinate)
    })

    var region = getRegionForCoordinates(coordinates)

    this.state = {
      region: region,
      markers: markers
      // markers: [
      //   {title: 'hi', description: 'yo', coordinate: {latitude: LATITUDE, longitude: LONGITUDE}}
      // ]
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'drawer') {
        this.props.navigator.toggleDrawer({
          side: 'left',
        });
      }
    } else if (event.type == 'DeepLink') {
      if (event.link === 'Today') {
        this.props.navigator.resetTo({
          screen: 'app.Today',
          title: 'T O D A Y',
          animationType: 'fade'
        })
      }
      if (event.link === 'Calendar') {
        this.props.navigator.resetTo({
          screen: 'app.Calendar',
          title: 'C A L E N D A R',
          animationType: 'fade',
        });
      }
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
            <Marker title={marker.title} description={marker.description} onPress={() => this.onMarkerPress(marker)}/>
          </MapView.Marker>
        ))}
          
        </MapView>
      </View>
    );
  }

  showLightBox = () => {
    this.props.navigator.showLightBox({
      screen: "example.Types.LightBox",
      passProps: {
        title: 'LightBox',
        content: 'Hey there, I\'m a light box screen :D',
        onClose: this.dismissLightBox,
      },
      style: {
        backgroundBlur: 'dark',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        tapBackgroundToDismiss: true
      }
    });
  };

  onMarkerPress (marker) {
    var answer = realm.objects('Answer').filtered('dateCreated = $0', marker.dateCreated)[0]
    // TODO: show as lightbox
    this.props.navigator.showLightBox({
      screen: 'app.ShowAnswer',
      // title: Utils.capitalizeAndSpace(marker.title),
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