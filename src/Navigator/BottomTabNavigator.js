import ColorsConstants from '../constants/ColorsConstants';
import LoginScreen from '../screens/LoginScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import RegistrationScreen from '../screens/RegistrationScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'black',
          tabBarLabelPosition: 'beside-icon',
          tabBarLabelStyle: {fontWeight: 'bold'},
          tabBarStyle: {
            backgroundColor: ColorsConstants.buttonEndColor,
          },
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Login') {
              iconName = 'login';
            } else if (route.name === 'Registration') {
              iconName = 'account-plus';
            }
            return (
              <MaterialCommunityIcons
                name={iconName}
                color={color}
                size={size}
              />
            );
          },
        })}>
        <Tab.Screen name="Login" component={LoginScreen} />
        <Tab.Screen name="Registration" component={RegistrationScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
