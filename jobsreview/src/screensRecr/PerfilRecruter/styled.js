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
  height: 200px;
  width: 100%;
  align-items: center;
  border-bottom-color: #cccccc;
  border-bottom-width: 5px;
`;
export const FotoPerfil = styled.Image`
  margin-top: 30px;
  width: 80px;
  height: 80px;
  border-radius: 20px;
  border-width: 4px;
  border-color: #ffffff;
  background-color: gray;
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
  flex: 1;
  flex-direction: column;
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

export const AdicionarVaga = styled.TouchableOpacity`
  margin-top: 20px;
  margin-right: 20px;
`;

export const ListArea = styled.View`
  width: 100%;
  min-height: 400px;
  margin-top: 40px;
  align-items: center;
  flex-direction: column;
`;

export const TopList = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-right: 20px;
  margin-left: 20px;
`;
export const NomeVaga = styled.Text`
  font-size: 17px;
  font-weight: bold;
  margin-left: 20px;
`;
export const DataCriado = styled.Text`
  font-size: 17px;
  font-weight: bold;
`;
export const StatusVaga = styled.Text`
  font-size: 17px;
  font-weight: bold;
  margin-right: 20px;
`;

export const AreaFlatlist = styled.View`
  width: 100%;
`;

export const InfoArea = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  align-items: center;
  border-radius: 5px;
  margin-top: 15px;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 5px;
  border-bottom-color: #000000;
  border-bottom-width: 1px;
`;
export const NameArea = styled.View`
  width: 33.3%;
  align-items: center;
`;
export const DataArea = styled.View`
  width: 33.3%;
  align-items: center;
`;
export const StatusArea = styled.View`
  width: 33.3%;
  align-items: center;
`;
export const UserName = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;

export const Tipo = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;
export const Status = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;

export const LoadingIcon = styled.ActivityIndicator`
  margin-top: 50px;
`;

export const JanelaModal = styled.Modal``;

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

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  right: 5;
  top: 5;
  z-index: 9;
`;
