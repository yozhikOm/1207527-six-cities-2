import React, {PureComponent} from 'react';

const withVisibleSorting = (Component) => {
  class WithVisibleSorting extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isSortingVisible: false
      };
      this._setVisibility = this._setVisibility.bind(this);
    }

    _setVisibility() {
      this.setState({isSortingVisible: !this.state.isSortingVisible});
    }

    render() {
      const {isSortingVisible} = this.state;
      return <Component {...this.props}
        isSortingVisible={isSortingVisible}
        onSetSortingVisibility={this._setVisibility}
      />;
    }
  }

  WithVisibleSorting.propTypes = {};

  return WithVisibleSorting;
};

export default withVisibleSorting;
