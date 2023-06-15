import React from "react";
import styled from "styled-components/native";
export const JanelaModal = styled.Modal``;
export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #63c2d1;
`;
export const Scroller = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;
export const HeaderArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  width: 150px;
`;
export const SearchButton = styled.TouchableOpacity`
  width: 26px;
  height: 26px;
`;

export const LoadingIcon = styled.ActivityIndicator`
  margin-top: 50px;
`;

export const ListArea = styled.View`
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const Area = styled.TouchableOpacity`
  background-color: #ffffff;
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 15px;
  flex-direction: row;
`;

export const Icon = styled.View`
  width: 88px;
  height: 88px;
  border-radius: 20px;
  background-color: grey;
  align-items: center;
  justify-content: center;
`;

export const InfoArea = styled.View`
  margin-left: 20px;
  justify-content: space-between;
`;

export const UserName = styled.Text`
  font-size: 17px;
  font-weight: bold;
`;

export const VerPerfilBotao = styled.View`
  width: 85px;
  height: 26px;
  border: 1px solid #4eadbe;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const VerPerfilBotaoText = styled.Text`
  font-size: 13px;
  color: #268596;
`;

export const Tipo = styled.Text`
  font-size: 13px;
  color: #268596;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
`;
