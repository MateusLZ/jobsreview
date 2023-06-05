import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context } from "../../context/dataContext";
import api from "../../api";
import { FlatList } from "react-native";

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

export default ({}) => {
  const { state, dispatch } = useContext(Context);
  const navigation = useNavigation();
  const [vagas, setVaga] = useState([]);

  const getVagas = async () => {
    try {
      const res = await api.get("/vaga/find");
      console.log(res);
      //Aqui esta dando erro
      if (res.status === 200) {
        setVaga(res.data.Vagas);
        dispatch({ type: "update", payload: false });
      } else {
        console.log(`Error: ${res.error}`);
      }
    } catch (error) {
      console.log("Error occurred while fetching data:", error);
    }
  };

  getVagas();

  // useEffect(() => {
  //   getVagas();
  //   console.log("fui chamado");
  // }, []);

  const viewVaga = async (item) => {
    navigation.navigate("Vaga", item);
  };

  return (
    <FlatList
      data={vagas}
      renderItem={({ item }) => {
        return (
          <Area onPress={() => viewVaga(item)}>
            <Icon>
              <AntDesign name="iconfontdesktop" size={50} color="black" />
            </Icon>
            <InfoArea>
              <UserName>{item.name}</UserName>

              <Tipo>{item.type}</Tipo>

              <VerPerfilBotao>
                <VerPerfilBotaoText>Ver Vaga</VerPerfilBotaoText>
              </VerPerfilBotao>
            </InfoArea>
          </Area>
        );
      }}
      keyExtractor={(item) => item.id}
    />
  );
};
