import React, { Component } from 'react';
import './App.css';
import MapContainer from './components/MapContainer.js';
import 'whatwg-fetch';
import InfoDisplay from './components/InfoDisplay'

class App extends Component {

state = {
        locations: [],
        venueInfo: {},
        query: "",
      }

  componentDidMount() {
      this.getVenues();
  }

  getVenues = () => {

    const venuesEndpoint = 'https://api.foursquare.com/v2/venues/explore?';

    // this.getLocation();

    this.getLocation((latlong) => {

    const params = {
      client_id: "SNZTLCEBVGHWN1B0VB4J0GGCG5VE541QNOS54LHOXNX22H4Z", //Client ID obtained by getting developer access
      client_secret: "PXL0DTUC3OO4YBZ3VDLMJW4ODFAKTFVTGEOWM3CISX0FFHK5", //Client Secret obtained by getting developer access
      limit: 30, //The max number of venues to load
      query: 'Pub', //The type of venues we want to query
      v: '20130619', //The version of the API.
      ll: latlong,
      radius: '20000'
    };

    fetch(venuesEndpoint + new URLSearchParams(params), {
      method: 'GET'
    }).then(response => response.json()).then(response => {
      const locations = response.response.groups[0].items.map(item => {
      return {
        position: { lat: item.venue.location.lat, lng: item.venue.location.lng },
        title: item.venue.name,
        id: item.venue.id,
        category: item.venue.categories[0].name,
        address: item.venue.location.formattedAddress[0] + " " + item.venue.location.formattedAddress[3],
      }
    })

    this.setState({ locations })
    })
    //If the api fails to load
    .catch(err => {
    console.log('Failed to fetch foursquare data', err)
    })
  })
  };

  getLocation = (callback) => {

    navigator.geolocation.getCurrentPosition((response) => {
        callback(response.coords.latitude + "," + response.coords.longitude)
        this.setState({lat: response.coords.latitude})
        this.setState({lng: response.coords.longitude})
       })
  }

  menuClick = e => {
    this.setState({
      query: e.target.textContent.replace(/- /g, '')
    })

    const modal = document.querySelector('.details-modal')

    for (const location of this.state.locations) {
      if (location.title === e.target.textContent.replace(/- /g, '')) {
        this.setState({ venueInfo: location })
        modal.style.display = 'block'
        modal.style.opacity = '0.95'
        }
      }
    }

  markerClick = (props) => {
      this.setState({
        query: props.title.replace(/- /g, '')
      })

      const modal = document.querySelector('.details-modal')

      for (const location of this.state.locations) {
        if (location.title === props.title.replace(/- /g, '')) {
          this.setState({ venueInfo: location })
          modal.style.display = 'block'
          modal.style.opacity = '0.95'
          }
        }
      }


  infoClose = e => {
      const modal = document.querySelector('.details-modal')

      modal.style.opacity = '0'
      setTimeout(() => {
        modal.style.display = 'none'
      }, 500)
      this.setState({
        query: ""})
    }

  updateQuery = e => {
        this.setState({
          query: e.trim()})
      }

  render() {
    return (
      <div className="App">
        <header>
          <MapContainer locations={this.state.locations}
          lat={this.state.lat}
          lng={this.state.lng}
          onItemClick={this.menuClick}
          closeModal={this.infoClose}
          onMarkerClickInfo={this.markerClick}
          onSearch={this.updateQuery}
          query={this.state.query}
          selectedLocation={this.state.locationDisplayed}
        />
          <h1 id="title">Bars Near You</h1>
        </header>
          <InfoDisplay
          venueInfo={this.state.venueInfo}
          closeModal={this.infoClose}
          />
      </div>

    );
  }
}

export default App
