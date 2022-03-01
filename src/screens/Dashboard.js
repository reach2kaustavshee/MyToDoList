import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import {heightToDpi, widthToDpi} from '../Utility/Dimensions';

import ColorsConstants from '../constants/ColorsConstants';
import CustomSubmitButton from '../component/CustomSubmitButton';
import ImageConstants from '../constants/ImageConstants';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      isPlusClicked: true,
    };
    this.logoutClicked = this.logoutClicked.bind(this);
    this.addClicked = this.addClicked.bind(this);
  }

  logoutClicked() {}

  addClicked() {
    this.setState({isPlusClicked: !this.state.isPlusClicked});
  }

  render() {
    return (
      <SafeAreaView style={styles.main}>
        <Image source={ImageConstants.header} style={styles.imageHeader} />
        <View style={styles.topButtonContainer}>
          <TouchableOpacity onPress={this.addClicked}>
            <Image
              source={ImageConstants.add}
              style={{
                width: widthToDpi('7%'),
                height: 'auto',
                aspectRatio: 1 / 1,
              }}
            />
          </TouchableOpacity>
          <View style={{width: widthToDpi('5%')}} />
          <TouchableOpacity onPress={this.logoutClicked}>
            <Image
              source={ImageConstants.logout}
              style={styles.imageLogoutStyle}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, paddingHorizontal: widthToDpi('4%')}}>
          {this.state.isPlusClicked === true && (
            <View style={styles.textContainer}>
              <TextInput
                multiline={true}
                style={styles.textField}
              />
              <View style={styles.buttonContainer}>
                <CustomSubmitButton
                  text="Reset"
                  callback={this.cancelPressed}
                />
                <View style={{width: 25}} />
                <CustomSubmitButton
                  text="ADD"
                  callback={this.signinPressed}
                />
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: ColorsConstants.primarySwatch,
    // alignItems: 'center',
  },
  imageHeader: {
    width: '100%',
    height: 'auto',
    aspectRatio: 1 / 0.35,
    resizeMode: 'cover',
  },
  topButtonContainer: {
    width: '100%',
    height: heightToDpi('10%'),
    position: 'absolute',
    top: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: widthToDpi('4%'),
    flexDirection: 'row',
  },
  imageLogoutStyle: {
    width: widthToDpi('7%'),
    height: 'auto',
    aspectRatio: 1 / 1,
  },
  textContainer: {
    width: '100%',
    height: heightToDpi('25%'),
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: heightToDpi('1.5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textField: {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: widthToDpi('5%'),
    overflow: 'hidden',
    width: '100%',
    height: heightToDpi('17%'),
    padding: widthToDpi('5%'),
    textAlignVertical:'top'
  }
});
