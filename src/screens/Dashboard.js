import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {Component} from 'react';
import {heightToDpi, widthToDpi} from '../Utility/Dimensions';

import ColorsConstants from '../constants/ColorsConstants';
import CustomSubmitButton from '../component/CustomSubmitButton';
import ImageConstants from '../constants/ImageConstants';
import {LoginContext} from '../context/LoginContext';
import {TodoContext} from '../context/ToDoContext';

export default () => (
  <LoginContext.Consumer>
    {loginContext => (
      <TodoContext.Consumer>
        {todoContext => (
          <Dashboard loginContext={loginContext} todoContext={todoContext} />
        )}
      </TodoContext.Consumer>
    )}
  </LoginContext.Consumer>
);

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlusClicked: false,
      text: '',
    };
    this.logoutClicked = this.logoutClicked.bind(this);
    this.addClicked = this.addClicked.bind(this);
    this.resetClicked = this.resetClicked.bind(this);
    this.saveRecord = this.saveRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
  }

  saveRecord() {
    if (this.state.text.length > 0) {
      this.props.todoContext.saveText(this.state.text);
      this.setState({text: ''});
    }
  }

  deleteRecord(index) {
    this.props.todoContext.deleteRecordAtIndex(index)
  }

  logoutClicked() {
    Alert.alert('Confirmation!!!', 'Are you sure to logout?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Canceal Pressed'),
      },
      {
        text: 'OK',
        onPress: () => {
          const {logout} = this.props.loginContext;
          logout();
        },
      },
    ]);
  }

  addClicked() {
    this.setState({isPlusClicked: !this.state.isPlusClicked});
  }

  resetClicked() {
    this.setState({
      text: '',
    });
  }

  render() {
    const _Row = ({item, index}) => {
      console.log(item);
      return (
        <View style={styles.rowView}>
          <Text style={{flex: 1, color: 'white', fontSize: widthToDpi('3.4%')}}>
            {item}
          </Text>
          <View
            style={{
              height: '100%',
              width: widthToDpi('8%'),
              marginLeft: widthToDpi('0.8%'),
            }}>
            <TouchableWithoutFeedback
              onPress={() => this.deleteRecord(index)}>
              <Image source={ImageConstants.delete} style={styles.deleteIcon} />
            </TouchableWithoutFeedback>
          </View>
        </View>
      );
    };

    console.log(this.state.items);
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
                value={this.state.text}
                placeholder="Enter your to do details"
                placeholderTextColor={ColorsConstants.placeholderColor}
                onChangeText={str => this.setState({text: str})}
              />
              <View style={styles.buttonContainer}>
                <CustomSubmitButton text="Reset" callback={this.resetClicked} />
                <View style={{width: 25}} />
                <CustomSubmitButton text="ADD" callback={this.saveRecord} />
              </View>
            </View>
          )}
          <FlatList
            data={this.props.todoContext.data}
            renderItem={({item, index}) => <_Row item={item} index={index} />}
            style={{flex: 1}}
          />
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
    textAlignVertical: 'top',
  },
  rowView: {
    width: '100%',
    height: 'auto',
    paddingHorizontal: widthToDpi('2%'),
    paddingVertical: widthToDpi('4%'),
    marginBottom: heightToDpi('2%'),
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: widthToDpi('1%'),
    elevation: widthToDpi('1%'),
    shadowColor: 'white',
    shadowRadius: widthToDpi('0.1%'),
  },
  deleteIcon: {
    flex: 1,
    width: '100%',
    height: heightToDpi('5%'),
    resizeMode: 'contain',
  },
});
