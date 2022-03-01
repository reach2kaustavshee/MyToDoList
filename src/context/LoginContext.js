import {createContext, useContext, useState} from 'react';

import {AsyncStorage} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

export const LoginContext = createContext();

function LoginContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState("logout");

  function fetchLogin() {
    AsyncStorage.getItem("isLoggedIn", (error, result) => {
        if (result) {
        //   console.log(result);
          setIsLoggedIn(result);
        }
      });
  }

  function login() {
    setIsLoggedIn("login",isLoggedIn);
    AsyncStorage.setItem("isLoggedIn", "login");
    console.log('context login');
  }

  function logout() {
    setIsLoggedIn("logout");
    AsyncStorage.setItem("isLoggedIn", "logout");
    console.log('context logout');
  }

  return (
    <LoginContext.Provider value={{isLoggedIn, login, logout, fetchLogin}}>
      {props.children}
    </LoginContext.Provider>
  );
}

export const useLogin = () => useContext(LoginContext);

export default LoginContextProvider;
