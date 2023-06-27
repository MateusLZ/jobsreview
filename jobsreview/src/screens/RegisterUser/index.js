import React, { useState } from "react";
import { StyleSheet } from "react-native";

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
import { Picker } from "@react-native-picker/picker";

const RegisterUser = ({ navigation }) => {
  const [nameField, setNameField] = useState("");
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [typeLogin, setType] = useState(false);

  const handleSignClick = async () => {
    if (nameField !== "" && emailField !== "" && passwordField !== "") {
      try {
        if (typeLogin) {
          // Registrar recrutador
          const data = await Api.post("/recrutador/register", {
            nome: nameField,
            email: emailField,
            senha: passwordField,
            tipo_login: typeLogin,
          });
          if (data.status === 200) {
            console.log(data);
            alert(data.data.message);
            navigation.navigate("Login");
          } else {
            console.log(data);
          }
          // Restante do código após o registro do recrutador
        } else {
          // Registrar usuário normal
          const data = await Api.post("/user/register", {
            name: nameField,
            email: emailField,
            password: passwordField,
            tipo_login: typeLogin,
          });
          if (data.status === 200) {
            navigation.navigate("Login");
          } else {
            console.log(data);
          }
          // Restante do código após o registro do usuário normal
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

        <Picker
          selectedValue={typeLogin}
          style={styles.picker}
          onValueChange={setType}
        >
          <Picker.Item label="Recruiter User" value="true" />
          <Picker.Item label="Regular User" value="false" />
        </Picker>

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

const styles = StyleSheet.create({
  picker: {
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "#83d6e3",
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    borderWidth: 0,
    marginBottom: 15,
    height: 45,
    width: "100%",
  },
});
