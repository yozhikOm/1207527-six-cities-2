import React, {PureComponent} from 'react';

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItemID: -1
      };
      this.handleActiveItemSet = this.handleActiveItemSet.bind(this);
    }

    handleActiveItemSet(id) {
      this.setState({activeItemID: id});
    }

    render() {
      const {activeItemID} = this.state;
      return <Component {...this.props}
        activeItemID={activeItemID}
        onSetActiveItem={this.handleActiveItemSet}
      />;
    }
  }

  WithActiveItem.propTypes = {};

  return WithActiveItem;
};

export default withActiveItem;
