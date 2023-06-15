import styled from "styled-components/native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;
export const Scroller = styled.ScrollView`
  flex: 1;
`;

export const Header = styled.View`
  background-color: #63c2d1;
  min-height: 350px;
  width: 100%;
  align-items: center;
`;

export const HeaderInfo = styled.View`
  margin-top: 30px;
  width: 100%;
  align-items: center;
`;

export const HeaderText = styled.Text`
  font-weight: 700;
  font-size: 30px;
`;

export const InputArea = styled.View`
  margin-left: 25px;
  margin-right: 25px;
  margin-top: 20px;
  width: 80%;
  height: 100%;
`;
export const AreaClick = styled.TouchableOpacity`
  flex-direction: column;
  width: 100%;
  min-height: 40px;
  border-bottom-color: #000;
  border-bottom-width: 1px;
  margin-bottom: 15px;
  padding: 13px;
`;
export const TopAreaClick = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 30%;
`;
export const BotAreaClick = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 70%;
`;
export const TituloAreaClick = styled.Text`
  font-weight: bold;
`;
export const DescricaoTitulo = styled.View`
  width: 100%;
  height: 70%;
  margin-bottom: 1px;
  margin-top: 5px;
`;
export const TextoTitulo = styled.Text``;

export const PageBody = styled.View`
  width: 100%;
  background-color: #63c2d1;
  min-height: 400px;
  align-items: center;
  flex-direction: column;
`;

export const LocationArea = styled.View`
  height: 45px;
  margin-left: 25px;
  margin-right: 25px;
  margin-top: 20px;
  border-bottom-color: #000;
  border-bottom-width: 1px;
  width: 80%;
  flex-direction: column;
  align-items: center;
`;
export const LocationInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  width: 100%;
  color: #ffffff;
`;
export const LocationFinder = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
`;
export const TypeArea = styled.View`
  width: 80%;
  margin-top: 20px;
  align-items: center;
`;

export const SkillsArea = styled.View`
  width: 80%;
  margin-top: 20px;
`;
export const SkillTitleArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const TitleSkill = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const IconSkillAdd = styled.TouchableOpacity``;

export const ButtonEnviarArea = styled.View``;

export const Area = styled.TouchableOpacity`
  width: 150px;
  height: 50px;
  margin-bottom: 10px;
`;
export const StarView = styled.View`
  width: 100%;
`;

export const ListArea = styled.View`
  margin-top: 20px;
`;
export const InfoArea = styled.View`
  width: 100%;
  align-items: center;
`;
export const UserName = styled.Text`
  text-align: center;
  width: 100%;
  font-size: 17px;
  font-weight: bold;
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
export const CustomButtonText = styled.Text`
  font-weight: 700;
  font-size: 15px;
  color: #fff;
`;
export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
`;
