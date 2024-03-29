import React from "react";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

export const Scroller = styled.ScrollView`
  flex: 1;
`;

export const Header = styled.View`
  background-color: #63c2d1;
  height: 220px;
  width: 100%;
  align-items: center;
  border-bottom-color: #cccccc;
  border-bottom-width: 5px;
`;
export const FotoPerfil = styled.View`
  margin-top: 30px;
  width: 80px;
  height: 80px;
  border-radius: 20px;
  border-width: 4px;
  border-color: #ffffff;
  background-color: gray;
  align-items: center;
  justify-content: center;
`;
export const HeaderInfo = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
`;
export const NomeUser = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #000000;
`;
export const AplicationArea = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  flex: 1;
`;
export const CustomButton = styled.TouchableOpacity`
  margin-top: 20px;
  height: 30px;
  width: 150px;
  background-color: #2658ab;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

export const CustomButtonText = styled.Text`
  font-weight: 700;
  font-size: 15px;
  color: #fff;
`;

export const PageBody = styled.View`
  background-color: #ffffff;
  min-height: 400px;
`;

export const DescriptionArea = styled.View``;

export const DescriptionTitle = styled.Text`
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  margin-left: 20px;
`;

export const DescriptionText = styled.Text`
  font-size: 17px;

  text-align: center;
  margin-top: 30px;
  margin-left: 20px;
  text-align: start;
  margin-right: 20px;
`;

export const HabilidadeArea = styled.View``;
export const HeaderHabilidadeArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const HabilidadeTitle = styled.Text`
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  margin-left: 20px;
`;

export const AdicionarHabilidade = styled.TouchableOpacity`
  margin-top: 20px;
  margin-right: 20px;
`;
export const Area = styled.TouchableOpacity`
  width: 150px;
  height: 50px;
  background-color: #ffffff;
  margin-bottom: 10px;
`;

export const ListArea = styled.View`
  margin-top: 20px;
  margin-left: 30px;
  margin-right: 30px;
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

export const Tipo = styled.Text`
  font-size: 13px;
  color: #268596;
`;

export const LoadingIcon = styled.ActivityIndicator`
  margin-top: 50px;
`;

export const JanelaModal = styled.Modal``;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  right: 5;
  top: 5;
  z-index: 9;
`;
