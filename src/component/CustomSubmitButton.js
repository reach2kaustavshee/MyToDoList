import {Text, TouchableOpacity, View} from 'react-native';
import {heightToDpi, widthToDpi} from '../Utility/Dimensions';

import ColorsConstants from '../constants/ColorsConstants';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';

export default function CustomSubmitButton({text, callback}) {
  return (
    <TouchableOpacity onPress={callback}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[
          ColorsConstants.buttonStartColor,
          ColorsConstants.buttonEndColor,
        ]}
        style={{
          width: widthToDpi('40%'),
          height: heightToDpi('6%'),
          borderRadius: heightToDpi('6%') / 2.0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color:'white', fontWeight: 'bold'}}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
CustomSubmitButton.defaultProps = {
  text: '',
  callback: null,
};
