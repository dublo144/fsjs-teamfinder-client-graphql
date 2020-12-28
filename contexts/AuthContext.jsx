import React from "react";
import SyncStorage from "sync-storage";

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

const initialState = {
  role: "",
  jwtToken: "",
  userName: "",
  name: "",
  isLoggedIn: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SIGN_IN": {
      console.log("Sign in");
      return signIn(state, action);
    }
    case "SIGN_IN_ERROR": {
      console.log("Sign in error");
      return signInError(state, action);
    }
    case "SIGN_OUT": {
      return signOut();
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
};

const init = (initialState) => {
  const token = SyncStorage.get("token");
  if (token) {
    const { userId, username, firstName, lastName, email } = getUserinfo(token);
    return {
      ...initialState,
      jwtToken: token,
      userId: userId,
      firstName,
      lastName,
      email,
      username: username,
      isLoggedIn: true,
    };
  }

  return initialState;
};

const signIn = (state, action) => {
  SyncStorage.set("token", action.payload.token);
  return {
    ...state,
    userName: action.payload.userName,
    name: action.payload.name,
    jwtToken: action.payload.token,
    role: action.payload.token,
    isLoggedIn: true,
  };
};

const signInError = (state, action) => {
  return {
    ...state,
    error: action.payload.error.message,
  };
};

const signOut = () => {
  SyncStorage.remove("token");
  return initialState;
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState, init);
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

const useAuthState = () => {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
};

const useAuthDispatch = () => {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuthState, useAuthDispatch };
