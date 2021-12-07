import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    CHANGE_ALERT: "CHANGE_ALERT"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        alert: "",
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true
                })
            }
            case AuthActionType.CHANGE_ALERT: {
                return setAuth({
                    user: auth.user,
                    loggedIn: auth.loggedIn,
                    alert: payload.alert
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.SET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
    }

    auth.registerUser = async function(userData, store) {
        try{
            const response = await api.registerUser(userData);      
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
                store.nonGuest();
            } 
        }catch(err){
            authReducer({
                type: AuthActionType.CHANGE_ALERT,
                payload: {
                    alert: err.response.data.errorMessage
                }
            })
        }    
    }

    auth.loginUser = async function(userData, store) {
        try{
            const response = await api.loginUser(userData)
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.GET_LOGGED_IN,
                    payload: {
                        user: response.data.user,
                        loggedIn: true
                    }
                })
                history.push("/");
                store.nonGuest();
            }
        }catch(err){
            authReducer({
                type: AuthActionType.CHANGE_ALERT,
                payload: {
                    alert: err.response.data.errorMessage
                }
            })
        }
    }

    auth.guest = async function(store){
        try{
            const response = await api.loginUser({email:"guest",password:"12345678"})
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.GET_LOGGED_IN,
                    payload: {
                        user: response.data.user,
                        loggedIn: true
                    }
                })
                history.push("/");
                store.initGuest();
            }
        }catch(err){
            authReducer({
                type: AuthActionType.CHANGE_ALERT,
                payload: {
                    alert: err.response.data.errorMessage
                }
            })
        }
    }

    auth.setAlert = function(payload){
        authReducer({
            type: AuthActionType.CHANGE_ALERT,
            payload: {
                alert: payload
            }
        })
    }

    auth.logoutUser = function(){
        authReducer({
            type: AuthActionType.GET_LOGGED_IN,
                    payload: {
                        user: null,
                        loggedIn: false
                    }
        })
    }

    auth.clearAlert = function(){
        authReducer({
            type: AuthActionType.CHANGE_ALERT,
            payload: {
                alert: ""
            }
        })
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };