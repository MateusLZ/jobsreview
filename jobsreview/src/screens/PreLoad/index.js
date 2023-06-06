import React, { useEffect, useContext } from "react";
import { Container, LoadingIcon } from "./styles";
import Logo from "../../components/Logo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context } from "../../context/dataContext";

import api from "../../api";

const PreLoad = ({ navigation }) => {
  const { state, dispatch } = useContext(Context);
  setTimeout(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        try {
          const data = await api.get("/user", {
            headers: {
              token: token,
            },
          });
          await dispatch({ type: "verify", payload: data.data.authData });
          navigation.navigate("Routes");
        } catch (error) {
          console.log(error);
          dispatch({ type: "login", payload: false });
        }
      } else {
        dispatch({ type: "login", payload: false });
      }
    };
    checkToken();
  }, 500);

  return (
    <Container>
      <Logo />
      <LoadingIcon size="large" color="#FFFFFF" />
    </Container>
  );
};

export default PreLoad;
