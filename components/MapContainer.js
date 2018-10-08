import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import MenuButton from './MenuButton.js';
import PropTypes from 'prop-types'

window.gm_authFailure = () => {
    alert("Ooooops! Google maps failed to load.")
    console.log("Ooooops! Google maps failed to load.")
  }


class MapContainer extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    onItemClick: PropTypes.func.isRequired,
    locations: PropTypes.array.isRequired,
    query: PropTypes.string.isRequired
}

state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    loctations: [],
};

  onMarkerClick = (props, marker, e) => {
    this.props.onMarkerClickInfo(props)
  }

  openMenu = () => {
        const menu = document.querySelector( ".menu-wrapper" );
        menu.style.display === 'none' ? menu.style.display = 'block' : menu.style.display = 'none';
  }


  render() {
    const { query } = this.props
    const { locations } = this.props
  // Search feature adapted from udacity show contacts application.
    let displayLocations
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      displayLocations = locations.filter((location) => match.test(location.title))
    } else {
      displayLocations = locations
    }
    displayLocations.sort(sortBy('title'))

    return (
      <div>
        <div>
          <MenuButton open={this.openMenu}/>
        </div>
          <div className="menu-wrapper">
              <div className="form" role="form" aria-labelledby="filter">
                  <input type="text"
                        placeholder="Search..."
                         className="input" role="search"
                         onChange={(event) => this.props.onSearch(event.target.value)}/>
              </div>
              <ul className="no-results-hide">
                {displayLocations.length === 0 &&
                  <span id="title" className="no-results">No Results</span>}
                  {displayLocations && displayLocations.length && displayLocations.map((location, i) =>
                      <li key={i}>
                          <a href="#"
                          onClick={this.props.onItemClick}
                          key={location.id}
                          value={this.props.selectedLocation}
                          position={{ lat: location.position.lat, lng: location.position.lng}}
                          title={location.title}
                          aria-labelledby="location title"
                          tabIndex="0" role="button">{location.title}</a>
                      </li>
                  )}
              </ul>
      </div>
      <div className="map-container">
        <Map
          role="application"
          onClick={this.props.closeModal}
          google={this.props.google}
          zoom={12}
          initialCenter={{
            lat: this.props.lat,
            lng: this.props.lng
        }}>
        {displayLocations && displayLocations.length && displayLocations.map((location, i) =>{
          return (
            <Marker
              key={location.id}
              position={{ lat: location.position.lat, lng: location.position.lng}}
              animation={this.props.google.maps.Animation.DROP}
              title={location.title}
              onClick={this.onMarkerClick}
              address={location.address}
            />
          )
        })}
        </Map>
      </div>
    </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCCot3DxWsR9HvFRpAHcr4VRs93InlV6gQ")
})(MapContainer)
