import React from "react";

// A reducer function. Has previous state and performs something based on the action
// to generate a new state
export const reducer = (state, action) => {
    switch (action.type) {
      case 'SIGN_IN':
        return {
          ...state,
          isSignout: false,
          loggedIn: true,
          userToken: action.token,
          isManager: action.isManager
        };
      case 'SIGN_OUT':
        return {
            ...state,
            loggedIn: false,
          isSignout: true,
          userToken: null,
        };
    }
  }
  
  // Initial state of the reducer
export const initialState = {
    isLoading: true,
    isSignout: false,
    userToken: null,
    isManager: false,
    loggedIn: false
}