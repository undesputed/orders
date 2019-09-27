import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import SignaturePad from 'react-native-signature-pad';
 
export default class Signature extends Component {

    static navigationOptions = {
        header: null
    }

  render = () => {
    return (
      <View style={{flex: 1}}>
          {/* <SignaturePad onError={this._signaturePadError}
                        onChange={this._signaturePadChange}
                        style={{flex: 1, backgroundColor: 'white'}}/> */}
            <SignaturePad
                style={{width: 600, height: 200}}
                color='red'
                onChange={this.onChange}
                ref={this.onRef}
            />
                <TouchableOpacity onPress={this.onClear} style={{height: 50,alignItems: 'center', backgroundColor: 'gray', width: '100%', alignSelf: 'center', borderRadius: 5}}>
                    <Text style={{padding: 10, fontSize: '20', fontWeight: 'bold'}}>Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onCaptureBase64} style={{height: 50,alignItems: 'center', backgroundColor: 'gray', width: '100%', alignSelf: 'center', borderRadius: 5}}>
                    <Text style={{padding: 10, fontSize: '20', fontWeight: 'bold'}}>Capture Base64</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onCaptureFile} style={{height: 50,alignItems: 'center', backgroundColor: 'gray', width: '100%', alignSelf: 'center', borderRadius: 5}}>
                    <Text style={{padding: 10, fontSize: '20', fontWeight: 'bold'}}>Capture file</Text>
                </TouchableOpacity>
      </View>
    )
  };
 
  _signaturePadError = (error) => {
    console.error(error);
  };
 
  _signaturePadChange = ({base64DataUrl}) => {
    // console.log("Got new signature: " + base64DataUrl);
  };
}