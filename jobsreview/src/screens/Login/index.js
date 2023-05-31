import React, { useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
} from "./styles";
import Logo from "../../components/Logo";
import CustomInput from "../../components/CustomInput";
import Api from "../../api";
import { Context } from "../../context/dataContext";

const Login = ({ navigation }) => {
  const [emailField, setEmailField] = useState("");
  const { dispatch } = useContext(Context);
  const [passwordField, setPasswordField] = useState("");

  const handleSignClick = async () => {
    if (emailField !== "" && passwordField !== "") {
      try {
        const authData = await Api.post("/login", {
          email: emailField,
          password: passwordField,
        });

        if (authData.status === 200) {
          await AsyncStorage.setItem("token", authData.data.token);
          dispatch({ type: "login", payload: true });
        } else {
          alert("Email ou Senha Inválidos");
          setPasswordField("");
        }
      } catch (error) {
        alert("Email ou Senha Inválidos");
        setPasswordField("");
      }
    }
  };

  const handleMessageButtonClick = () => {
    navigation.reset({
      routes: [{ name: "RegisterUser" }],
    });
  };

  return (
    <Container>
      <Logo />

      <InputArea>
        <CustomInput
          placeholder="Digite seu e-mail"
          value={emailField}
          onChangeText={(t) => setEmailField(t)}
        />
        <CustomInput
          placeholder="Digite sua senha"
          value={passwordField}
          onChangeText={(t) => setPasswordField(t)}
          password={true}
        />

        <CustomButton onPress={handleSignClick}>
          <CustomButtonText>Login</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>
          Ainda não possui uma conta?
        </SignMessageButtonText>
        <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
};

export default Login;
