import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

class Map extends PureComponent {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div id="map" style={{width: `100%`, height: `100%`}} ></div>
    );
  }

  componentDidMount() {
    const {coordinatesArray} = this.props;

    const city = [52.38333, 4.9];

    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    const zoom = 12;
    const map = leaflet.map(`map`, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });
    map.setView(city, zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);

    coordinatesArray.forEach((offerCoord) => {
      leaflet
          .marker(offerCoord, {icon})
          .addTo(map);
    });

  }

}


Map.propTypes = {
  coordinatesArray: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.number.isRequired, PropTypes.number.isRequired).isRequired
  ),
};

export {Map};
