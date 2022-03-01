import { createContext, useContext, useState } from "react";

import React from "react";

export const LoginContext = createContext();

function LoginContextProvider(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isProfileSetupDone, setIsProfileSetUpDone] = useState(false);

    function login() {
        setIsLoggedIn(true);
        console.log("context login");
    }

    function logout() {
        setIsLoggedIn(false);
        console.log("context logout");
    }

    return (
        <LoginContext.Provider value={{isLoggedIn, login, logout}}>
            {props.children}
        </LoginContext.Provider>
    )
}

export const useLogin = () => useContext(LoginContext);

export default LoginContextProvider;