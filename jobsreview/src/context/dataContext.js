import React, { useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

let initialState = {
  Loading: true,
  isLogged: false,
  name: "",
  idUser: "",
  typeLogin: false,
  update: false,
  idVaga: "",
  nameVaga: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "logIn":
      return { ...state, isLogged: action.payload, Loading: false };
    case "logOut":
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("location");
      return {
        ...state,
        isLogged: false,
        typeLogin: false,
      };
    case "verify":
      return {
        ...state,
        isLogged: true,
        Loading: false,
        idUser: action.payload.id,
        typeLogin: action.payload.tipo_login,
        name: action.payload.name,
      };
    case "setVaga":
      return {
        ...state,
        idVaga: action.payload.id,
        nameVaga: action.payload.name,
      };
    case "update":
      return {
        ...state,
        update: action.payload,
      };
    default:
      return state;
  }
};

export const Context = React.createContext();

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
