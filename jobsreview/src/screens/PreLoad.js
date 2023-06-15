import React, { useEffect, useContext } from "react";
import Logo from "../components/Logo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context } from "../context/dataContext";
import styled from "styled-components/native";

import api from "../api";

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
          dispatch({ type: "logIn", payload: false });
        }
      } else {
        dispatch({ type: "logIn", payload: false });
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

const Container = styled.SafeAreaView`
  background-color: #283593;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoadingIcon = styled.ActivityIndicator`
  margin-top: 50px;
`;
