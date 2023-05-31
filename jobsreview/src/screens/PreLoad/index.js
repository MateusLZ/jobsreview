import React, { useEffect, useContext } from "react";
import { Container, LoadingIcon } from "./styles";
import Logo from "../../components/Logo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context } from "../../context/dataContext";

import api from "../../api";

const PreLoad = () => {
  const { state, dispatch } = useContext(Context);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      try {
        const data = await api.get("/user/verify", {
          headers: {
            token: token,
          },
        });
        await dispatch({ type: "verify", payload: data.data.authData });
      } catch (error) {
        console.log(error);
        dispatch({ type: "login", payload: false });
      }
    } else {
      dispatch({ type: "login", payload: false });
    }
  };
  checkToken();

  return (
    <Container>
      <Logo />
      <LoadingIcon size="large" color="#FFFFFF" />
    </Container>
  );
};

export default PreLoad;
