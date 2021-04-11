import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';
import {Button} from 'react-native-paper';
import {RNCamera} from 'react-native-camera';
import {Modalize} from 'react-native-modalize';

const barText = 'barcode-number';
const url = 'https://randomuser.me/api/?seed=%7Bbarcode-number';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      showModal: false,
      data: {},
    };
  }

  modal = React.createRef();

  async _getData() {
    let uri, rawData, fetchedData;
    let productDetails = {
      name: '',
      phone: '',
      email: '',
      picture: '',
    };

    uri = url.replace(barText, '') + this.state.data.data;

    fetchedData = await fetch(uri)
      .then((response) => response.json())
      .then((data) => {
        rawData = data.results;
      });

    let keys = Object.keys(productDetails);
    keys.map((item) => {
      productDetails[item] = rawData[0][item];
    });

    debugger;
    return [productDetails];
  }

  _renderCamera() {
    return (
      <RNCamera
        style={{flex: 1, justifyContent: 'flex-end'}}
        ref={(ref) => {
          this.camera = ref;
        }}
        type={RNCamera.Constants.Type.back}
        onBarCodeRead={(data) => {
          if (data !== undefined) {
            this.setState({
              visible: !this.state.visible,
              showModal: true,
              data: data,
            });
          }
        }}
      />
    );
  }

  renderContent(product) {
    debugger;
    return <View style={{backgroundColor: 'orange'}} />;
  }

  async _renderModal() {
    let productDetails = await this._getData();
    console.log(productDetails);

    debugger;
    return (
      <View style={{backgroundColor: 'red'}}>
        {/* <Modalize
          ref={this.modal}
          snapPoint={300}
          modalHeight={500}
          // customRenderer={this.renderContent(productDetails)}
        /> */}
      </View>
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        {this.state.showModal && this._renderModal()}
        {this.state.visible && this._renderCamera()}
        {!this.state.visible && (
          <Button
            mode={'contained'}
            dark
            style={{
              width: 150,
            }}
            compact
            onPress={() =>
              this.setState({
                showModal: false,
                visible: !this.state.visible,
              })
            }>
            SCAN PRODUCT
          </Button>
        )}
      </View>
    );
  }
}

export default Home;
