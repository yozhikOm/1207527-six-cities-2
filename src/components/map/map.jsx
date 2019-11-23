import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._map = null;
    this._zoom = 12;
    this._markersGroup = null;
  }

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

  _renderMap(map, zoom, currentCityCoords, offersArray, activeItemID) {
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });
    const activeIcon = leaflet.icon({
      iconUrl: `img/pin-active.svg`,
      iconSize: [30, 30]
    });

    map.setView(currentCityCoords, zoom);
    offersArray.forEach((offer) => {
      leaflet
          .marker(offer.coordinates, offer.id === activeItemID ? activeIcon : {icon})
          .addTo(this._markersGroup);
    });

  }

  render() {
    return (
      <div id="map" style={{width: `100%`, height: `100%`}} ></div>
    );
  }

  componentDidMount() {
    const {currentCityCoords, offersArray, activeItemID} = this.props;

    this._map = this._initMap(this._zoom, currentCityCoords);
    this._markersGroup = leaflet.layerGroup().addTo(this._map);
    this._renderMap(this._map, this._zoom, currentCityCoords, offersArray, activeItemID);

  }

  componentDidUpdate() {
    const {currentCityCoords, offersArray, activeItemID} = this.props;
    this._markersGroup.clearLayers();
    this._renderMap(this._map, this._zoom, currentCityCoords, offersArray, activeItemID);
  }

}

Map.propTypes = {
  currentCityCoords: PropTypes.arrayOf(PropTypes.number.isRequired, PropTypes.number.isRequired).isRequired,
  offersArray: PropTypes.shape({
    id: PropTypes.number,
    coordinates: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.number.isRequired, PropTypes.number.isRequired).isRequired
    ),
  }),
  activeItemID: PropTypes.number,
};

Map.defaultProps = {
  currentCityCoords: [52.38333, 4.9]
};

export {Map};
