import React from "react";
import {
  Container,
  SectionCand,
  SectionEmpres,
  TextSection,
  ImgCliente,
  LinhaMeio,
} from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ClienteImg from "../../components/ClienteImg";
import EmpresaImg from "../../components/EmpresaImg";

const Teste = ({ navigation }) => {
  const candidatoLogin = async () => {
    try {
      await AsyncStorage.setItem("tipoLoguin", "candidato");
      navigation.navigate("Login");
    } catch (error) {
      console.log("Erro ao definir a flag:", error);
    }
  };
  const empresaLogin = async () => {
    try {
      await AsyncStorage.setItem("tipoLoguin", "empresa");
      navigation.navigate("Login");
    } catch (error) {
      console.log("Erro ao definir a flag:", error);
    }
  };

  return (
    <Container>
      <SectionCand onPress={candidatoLogin}>
        <ImgCliente>
          <TextSection>Portal cliente</TextSection>
          <ClienteImg />
        </ImgCliente>
      </SectionCand>
      <LinhaMeio />
      <SectionEmpres onPress={empresaLogin}>
        <ImgCliente>
          <TextSection>Portal Empresa</TextSection>
          <EmpresaImg />
        </ImgCliente>
      </SectionEmpres>
    </Container>
  );
};

export default Teste;
