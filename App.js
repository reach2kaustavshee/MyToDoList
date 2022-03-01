/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';

import LoginContextProvider, {useLogin} from './src/context/LoginContext';
import {StatusBar, StyleSheet} from 'react-native';

import BottomTabNavigator from './src/Navigator/BottomTabNavigator';
import React from 'react';
import StackNavigator from './src/Navigator/StackNavigator';

const _LoginDecider = () => {
  const {isLoggedIn} = useLogin();
  if (isLoggedIn) {
    return <StackNavigator />;
  } else {
    return <BottomTabNavigator />;
  }
};

const App = () => {
  return (
    <LoginContextProvider>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />
      <_LoginDecider />
    </LoginContextProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
