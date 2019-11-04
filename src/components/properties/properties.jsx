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
      <React.Fragment>
        <div className="cities__places-list places__list tabs__content">
          {this.props.items.map((item) => (
            <React.Fragment key={item.id}>
              <PropertyCard offerInfo={item} cardMouseEnterHandler={this._cardMouseEnterHandler} />
            </React.Fragment>
          ))}
        </div>
      </React.Fragment>
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
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        photos: PropTypes.arrayOf(
            PropTypes.shape({
              src: PropTypes.string,
            })
        ),
        onClickTitle: PropTypes.func
      }).isRequired
  ),
  onClickTitle: PropTypes.func
};

export {Properties};
