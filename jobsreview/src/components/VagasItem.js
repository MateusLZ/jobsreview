import React from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

const Area = styled.TouchableOpacity`
  background-color: #ffffff;
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 15px;
  flex-direction: row;
`;

const Icon = styled.View`
  width: 88px;
  height: 88px;
  border-radius: 20px;
  background-color: grey;
  align-items: center;
  justify-content: center;
`;

const InfoArea = styled.View`
  margin-left: 20px;
  justify-content: space-between;
`;

const UserName = styled.Text`
  font-size: 17px;
  font-weight: bold;
`;

const VerPerfilBotao = styled.View`
  width: 85px;
  height: 26px;
  border: 1px solid #4eadbe;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const VerPerfilBotaoText = styled.Text`
  font-size: 13px;
  color: #268596;
`;

const Tipo = styled.Text`
  font-size: 13px;
  color: #268596;
`;

export default ({ data }) => {
  return (
    <Area>
      <Icon>
        <AntDesign name="iconfontdesktop" size={50} color="black" />
      </Icon>
      <InfoArea>
        <UserName>{data.name}</UserName>

        <Tipo>{data.type}</Tipo>

        <VerPerfilBotao>
          <VerPerfilBotaoText>Ver Perfil</VerPerfilBotaoText>
        </VerPerfilBotao>
      </InfoArea>
    </Area>
  );
};
