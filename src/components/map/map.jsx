import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._map = null;
    this._zoom = 12;
  }

  /* set newMap(map) {
    this._map = map;
  } */

  _initMap(zoom, currentCityCoords) {
    const map = leaflet.map(`map`, {
      center: currentCityCoords,
      zoom,
      zoomControl: false,
      marker: true
    });

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);

    return (map);
  }

  _renderMap(map, zoom, currentCityCoords, coordinatesArray) {
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    map.setView(currentCityCoords, zoom);
    coordinatesArray.forEach((offerCoord) => {
      leaflet
          .marker(offerCoord, {icon})
          .addTo(map);
    });

  }

  render() {
    return (
      <div id="map" style={{width: `100%`, height: `100%`}} ></div>
    );
  }

  componentDidMount() {
    const {currentCityCoords, coordinatesArray} = this.props;

    this._map = this._initMap(this._zoom, currentCityCoords);
    this._renderMap(this._map, this._zoom, currentCityCoords, coordinatesArray);

  }

  componentDidUpdate() {
    const {currentCityCoords, coordinatesArray} = this.props;
    this._renderMap(this._map, this._zoom, currentCityCoords, coordinatesArray);
  }

}

Map.propTypes = {
  currentCityCoords: PropTypes.arrayOf(PropTypes.number.isRequired, PropTypes.number.isRequired).isRequired,
  coordinatesArray: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.number.isRequired, PropTypes.number.isRequired).isRequired
  ),
};

Map.defaultProps = {
  currentCityCoords: [52.38333, 4.9]
};

export {Map};
