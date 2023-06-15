import styled from "styled-components/native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

export const Header = styled.View`
  background-color: #63c2d1;
  height: 200px;
  width: 100%;
  align-items: center;
  border-bottom-color: #cccccc;
  border-bottom-width: 5px;
`;

export const HeaderInfo = styled.View`
  margin-top: 30px;
  flex: 1;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

export const HeaderStats = styled.View`
  align-items: center;
  flex-direction: row;
  margin-bottom: 7px;
  justify-content: space-around;
`;

export const Star = styled.View`
  flex-direction: row;
  width: 120px;
  justify-content: end;
`;

export const HeaderText = styled.Text`
  flex-direction: row;
  font-weight: 700;
  font-size: 15px;
  width: 120px;
`;

export const HeaderIcon = styled(AntDesign)`
  margin-right: 5px;
`;
export const PageBody = styled.View`
  background-color: #ffffff;
  min-height: 400px;
  align-items: center;
  flex-direction: column;
`;

export const BodyTitle = styled.Text`
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
`;

export const PickerView = styled.View`
  width: 200px;
  margin-top: 20px;
`;

export const StarView = styled.View`
  margin-top: 20px;
`;

export const CustomButton = styled.TouchableOpacity`
  height: 50px;
  width: 300px;
  background-color: #2658ab;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
export const CustomButtonExcluir = styled.TouchableOpacity`
  height: 50px;
  width: 300px;
  background-color: #fff;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  border: 1px solid;
  border-color: #2658ab;
`;

export const CustomButtonText = styled.Text`
  font-weight: 700;
  font-size: 15px;
  color: #fff;
`;
export const CadastroMensagem = styled.Text`
  margin-top: 20px;
  font-weight: 700;
  font-size: 15px;
`;
export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
`;
