import React, {PureComponent} from 'react';

const withVisibleSorting = (Component) => {
  class WithVisibleSorting extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isSortingVisible: false
      };
      this.handleVisibilitySet = this.handleVisibilitySet.bind(this);
    }

    handleVisibilitySet() {
      this.setState({isSortingVisible: !this.state.isSortingVisible});
    }

    render() {
      const {isSortingVisible} = this.state;
      return <Component {...this.props}
        isSortingVisible={isSortingVisible}
        onSetSortingVisibility={this.handleVisibilitySet}
      />;
    }
  }

  WithVisibleSorting.propTypes = {};

  return WithVisibleSorting;
};

export default withVisibleSorting;
