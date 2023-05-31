import React, { useState } from "react";

import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
} from "./styled";
import Logo from "../../components/Logo";
import CustomInput from "../../components/CustomInput";
import Api from "../../api";

const RegisterUser = ({ navigation }) => {
  const [nameField, setNameField] = useState("");
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");

  const handleSignClick = async () => {
    if (nameField !== "" && emailField !== "" && passwordField !== "") {
      try {
        const data = await Api.post("/user/register", {
          name: nameField,
          email: emailField,
          password: passwordField,
        });
        if (data.status === 200) {
          navigation.navigate("Login");
        } else {
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleMessageButtonClick = () => {
    navigation.reset({
      routes: [{ name: "Login" }],
    });
  };

  return (
    <Container>
      <Logo />

      <InputArea>
        <CustomInput
          placeholder="Digite seu nome"
          value={nameField}
          onChangeText={(t) => setNameField(t)}
        />
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
          <CustomButtonText>Cadastrar</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>Ja possui uma conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
};

export default RegisterUser;
