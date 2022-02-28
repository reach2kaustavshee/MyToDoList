import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {heightToDpi, widthToDpi} from '../Utility/Dimensions';

import ColorsConstants from '../constants/ColorsConstants';
import ImageConstants from '../constants/ImageConstants';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function CustomEditText({
  showPass,
  leftIcon,
  placeholder,
  placeholderTextColor,
  textCallBack,
  textFieldSecurity,
  notifyTextSecurityChange,
  text,
  errorMsg,
}) {
  return (
    <View style={styles.parent}>
      <View style={styles.main}>
        <View style={styles.imageContainer}>
          <Image source={leftIcon} style={styles.icon} />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={text => textCallBack(text)}
          secureTextEntry={textFieldSecurity}
          value={text}
        />
        {showPass == true && (
          <TouchableOpacity onPress={notifyTextSecurityChange}>
            <View style={styles.imageContainer}>
              <Image
                source={
                  textFieldSecurity == true
                    ? ImageConstants.pass_hide
                    : ImageConstants.pass_show
                }
                style={styles.icon}
              />
            </View>
          </TouchableOpacity>
        )}
        <View style={styles.bottomBorder} />
      </View>
      {(errorMsg.length > 0) && (
        <Text style={{color: 'red', fontSize: widthToDpi('2%')}}>
          {errorMsg}
        </Text>
      )}
    </View>
  );
}

CustomEditText.defaultProps = {
  showPass: false,
  leftIcon: ImageConstants.user,
  placeholder: '',
  placeholderTextColor: ColorsConstants.placeholderColor,
  textCallBack: null,
  textFieldSecurity: false,
  notifyTextSecurityChange: null,
  text: '',
  errorMsg: '',
};

const styles = StyleSheet.create({
  bottomBorder: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: widthToDpi('0.5%'),
    borderWidth: 1,
    borderColor: ColorsConstants.textFieldBottomBorder,
  },
  parent: {
    width: '100%',
    height: 'auto',
    aspectRatio: 1 / 0.13,
    marginTop: heightToDpi('0.5%'),
  },
  main: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    marginTop: heightToDpi('2%'),
  },
  imageContainer: {
    height: '100%',
    width: 'auto',
    aspectRatio: 1 / 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: widthToDpi('5%'),
    height: 'auto',
    aspectRatio: 1 / 1,
    resizeMode: 'contain',
  },
  textInput: {
    flex: 1,
    marginHorizontal: widthToDpi('1%'),
    color: 'white',
  },
});
