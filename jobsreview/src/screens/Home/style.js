import styled from "styled-components/native";
import { Image } from "react-native";

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: #283593;
  display: flex;
  position: relative;
  flex-direction: column;
`;

export const SectionCand = styled.TouchableOpacity`
  width: 100%;
  height: 49%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

export const SectionEmpres = styled.TouchableOpacity`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LinhaMeio = styled.View`
  width: 100%;
  height: 1%;
  background-color: black;
`;

export const TextSection = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const ImgCliente = styled.View`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  align-items: center;
  display: flex;
`;
