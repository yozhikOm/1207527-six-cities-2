import React, {PureComponent} from "react";
import PropTypes from 'prop-types';
import {PropertyCard} from "../property-card/property-card.jsx";

class Properties extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hoveredCardID: -1
    };
    this._cardMouseEnterHandler = this._cardMouseEnterHandler.bind(this);
  }

  render() {
    return (
      <div className="cities__places-list places__list tabs__content">
        {this.props.items.map((item) => (
          <React.Fragment key={item.id}>
            <PropertyCard offerInfo={item} cardMouseEnterHandler={this._cardMouseEnterHandler} />
          </React.Fragment>
        ))}
      </div>
    );
  }

  _cardMouseEnterHandler(id) {
    this.setState({hoveredCardID: id});
  }
}

Properties.propTypes = {
  items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        location: PropTypes.shape({
          city: PropTypes.string.isRequired,
          coordinates: PropTypes.arrayOf(PropTypes.number, PropTypes.number).isRequired,
        }).isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        photos: PropTypes.arrayOf(
            PropTypes.shape({
              src: PropTypes.string,
            })
        ),
        host: PropTypes.string.isRequired,
      }).isRequired
  ),
};

export {Properties};
