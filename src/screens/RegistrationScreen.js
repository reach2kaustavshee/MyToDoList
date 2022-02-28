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

export default class RegistrationScreen extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      phone:'',
      email:'',
      password: '',
      passSecurity: true,
      errorUserName:'',
      errorPassword:'',
      errorEmail:'',
      errorPhone:''
    };
    this.validation = this.validation.bind(this);
    this.signupPressed = this.signupPressed.bind(this);
    this.cancelPressed = this.cancelPressed.bind(this);
  }

  cancelPressed() {
    this.setState({
      userName: '',
      password: '',
      passSecurity: true,
      errorUserName:'',
      errorPassword:'',
      errorEmail:'',
      errorPhone:''
    });
  }

  validation() {
    var flag = true;
    if (this.state.userName.length == 0) {
      this.setState({errorUserName:'Please enter the user name'});
      flag = false;
    }
    if (this.state.password.length == 0) {
      this.setState({errorPassword:'Please enter the password'});
      flag = false;
    }
    if (this.state.email.length == 0) {
      this.setState({errorEmail:'Please enter the email id'});
      flag = false;
    }
    if (this.state.phone.length == 0) {
      this.setState({errorPhone:'Please enter the phone number'});
      flag = false;
    }
    return flag;
  }

  signupPressed() {
    if (this.validation()) {
      console.log('login success');
    }
  }

  render() {
    console.log(this.state.passSecurity);
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        style={styles.main}
        KeyboardVerticalOffset={heightToDpi('68%')}>
        <Image source={ImageConstants.header} style={styles.imageHeader} />
        <View style={{flex: 1, paddingHorizontal: widthToDpi('4%')}}>
          <Text style={styles.topBigText}>{'Get on board'}</Text>
          <View style={{alignItems: 'center'}}>
            <Image
              source={ImageConstants.registration_logo}
              style={{
                width: widthToDpi('30%'),
                height: widthToDpi('30%'),
                borderWidth:1,
                borderColor:'#fff',
                borderRadius: widthToDpi('30%')/2.0,
                marginTop:heightToDpi('3%')
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
          <CustomEditText
            text={this.state.phone}
            showPass={false}
            leftIcon={ImageConstants.phone}
            placeholder={`Phone Number`}
            placeholderTextColor={ColorsConstants.placeholderColor}
            textCallBack={text => this.setState({phone: text})}
            errorMsg={this.state.errorPhone}
          />
          <CustomEditText
            text={this.state.email}
            showPass={false}
            leftIcon={ImageConstants.email}
            placeholder={`Email ID`}
            placeholderTextColor={ColorsConstants.placeholderColor}
            textCallBack={text => this.setState({email: text})}
            errorMsg={this.state.errorEmail}
          />
          <View style={styles.buttonContainer}>
            <CustomSubmitButton text="Reset" callback={this.cancelPressed} />
            <View style={{width: 25}} />
            <CustomSubmitButton text="Sign Up" callback={this.signupPressed} />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: ColorsConstants.primarySwatch,
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
