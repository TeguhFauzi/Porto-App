import React, { createContext, useReducer } from "react";

export const AuthContext = createContext();

const initialState = {
  isLogin: false,
  user: {},
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "USER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem(`token`, payload.token);
      return {
      
        isLogin: true,
        user: payload,
      };
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem(`token`);
      return {
        isLogin: false,
        user: {},
      };
    default:
      throw new Error();
  }
};

export const  AuthContextProvider= ({ children }) => {
 
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={[ state, dispatch] }>
      {children}
    </AuthContext.Provider>
  );
}
