import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {Component} from 'react';
import {heightToDpi, widthToDpi} from '../Utility/Dimensions';

import ColorsConstants from '../constants/ColorsConstants';
import CustomEditText from '../component/CustomEditText';
import CustomSubmitButton from '../component/CustomSubmitButton';
import ImageConstants from '../constants/ImageConstants';
import { LoginContext } from '../context/LoginContext';

export default class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      userName: 'Admin',
      password: 'PASSWORD',
      passSecurity: true,
      errorUserName:'',
      errorPassword:''
    };
    this.validation = this.validation.bind(this);
    this.signinPressed = this.signinPressed.bind(this);
    this.cancelPressed = this.cancelPressed.bind(this);
  }

  cancelPressed() {
    this.setState({
      userName: '',
      password: '',
      passSecurity: true,
      errorUserName:'',
      errorPassword:''
    });
  }

  validation() {
    let flag = true;
    if (this.state.userName.length == 0) {
      this.setState({errorUserName:'Please enter the user name'});
      flag = false;
    }
    if (this.state.password.length == 0) {
      this.setState({errorPassword:'Please enter the password'});
      flag = false;
    }
    if (flag === false) {
      return flag;
    }
    if (this.state.userName != 'Admin' || this.state.password != 'PASSWORD') {
      this.setState({errorPassword:'User name and password mismatched, please try again!!!',errorUserName:''});
      flag = false;
    }
    return flag;
  }

  signinPressed() {
    if (this.validation()) {
      const {login} = this.context;
      login();
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        style={styles.main}
        KeyboardVerticalOffset={heightToDpi('68%')}>
        <Image source={ImageConstants.header} style={styles.imageHeader} />
        <View style={{flex: 1, paddingHorizontal: widthToDpi('4%')}}>
          <Text style={styles.topBigText}>{'Hello there,\nwelcome back'}</Text>
          <View style={{alignItems: 'center', marginTop: heightToDpi('1%')}}>
            <Image
              source={ImageConstants.loginface}
              style={{
                width: widthToDpi('30%'),
                height: 'auto',
                aspectRatio: 1 / 1.5,
              }}
            />
          </View>
          <CustomEditText
            text={this.state.userName}
            showPass={false}
            leftIcon={ImageConstants.user}
            placeholder={`User Name`}
            placeholderTextColor={ColorsConstants.placeholderColor}
            textCallBack={text => this.setState({userName: text})}
            errorMsg={this.state.errorUserName}
          />
          <CustomEditText
            text={this.state.password}
            showPass={true}
            leftIcon={ImageConstants.lock}
            placeholder={`Password`}
            placeholderTextColor={ColorsConstants.placeholderColor}
            textCallBack={text => this.setState({password: text})}
            textFieldSecurity={this.state.passSecurity}
            notifyTextSecurityChange={() =>
              this.setState({passSecurity: !this.state.passSecurity})
            }
            errorMsg={this.state.errorPassword}
          />
          <View style={styles.buttonContainer}>
            <CustomSubmitButton text="Reset" callback={this.cancelPressed} />
            <View style={{width: 25}} />
            <CustomSubmitButton text="Sign In" callback={this.signinPressed} />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

LoginScreen.contextType = LoginContext;

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
  topBigText: {
    color: 'white',
    fontSize: widthToDpi('8%'),
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: heightToDpi('6%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
