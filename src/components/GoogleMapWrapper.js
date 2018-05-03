import React from 'react';
import GoogleMapComponenet from './googleMap';
import { connect } from 'react-redux';

import { getMarkers } from '../actions/markerActions';
import { setUserLocation } from '../actions/reportActions';

export class GoogleMapWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMarkerShown: true,
      location: {
        lat: -34.397,
        lng: 150.644,
      },
      indicatorPin: {
        lat: -34.397,
        lng: 150.644,
      },
      popupIsOpen: false,
    };
  }

  componentDidMount() {
    // Get markers from server
    this.props.dispatch(getMarkers());

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log(position);
          this.setState({
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  handleMapClick(event) {
    let lat = event.latLng.lat();
    let lng = event.latLng.lng();
    console.log('lat:', lat);
    console.log('lng', lng);
    this.setState({
      indicatorPin: {
        lat,
        lng,
      },
    });
    // set the pin location in state
    this.props.dispatch(setUserLocation({ lat, lng }));
  }

  onToggleOpen() {
    this.setState({
      popupIsOpen: !this.state.popupIsOpen,
    });
  }

  render() {
    return (
      <GoogleMapComponenet
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        position={this.state.location}
        onHandleClick={e => this.handleMapClick(e)}
        markers={this.props.markersFromServer}
        indicatorPin={this.state.indicatorPin}
        isOpen={this.state.popupIsOpen}
        onToggleOpen={() => this.onToggleOpen()}
      />
    );
  }
}

export const mapStateToProps = (state, props) => ({
  markersFromServer: state.markers.allMarkers ? state.markers.allMarkers : [],
  username: state.auth.username,
  id: state.auth.id,
});

export default connect(mapStateToProps)(GoogleMapWrapper);
