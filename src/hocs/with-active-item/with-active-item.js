import React, {PureComponent} from 'react';

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItemID: -1
      };
      this._setActiveItem = this._setActiveItem.bind(this);
    }

    _setActiveItem(id) {
      this.setState({activeItemID: id});
      console.log(id);
    }

    render() {
      const {activeItemID} = this.state;
      return <Component {...this.props}
        activeItem={activeItemID}
        setActiveItem={this._setActiveItem}
      />;
    }
  }

  WithActiveItem.propTypes = {};

  return WithActiveItem;
};

export default withActiveItem;
