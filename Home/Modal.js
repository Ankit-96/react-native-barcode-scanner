import React, {Component} from 'react';
import {View} from 'react-native';

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <View style={{flex: 1, backgroundColor: 'red'}} />;
  }
}

export default Modal;

{
  /* <Modalize
  ref={this.modal}
  modalHeight={height * 0.9}
  snapPoint={height / 2}
  onClosed={this.props.onClosed ? () => this.props.onClosed() : undefined}
  customRenderer={this.renderList()}
  {...headerProp}
/>; */
}
