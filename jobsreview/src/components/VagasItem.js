import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context } from "../context/dataContext";
import api from "../api";
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

export default ({ data }) => {
  const { state, dispatch } = useContext(Context);
  const navigation = useNavigation();
  const [vagas, setVaga] = useState([]);

  useEffect(() => {
    const onScreenLoad = async () => {
      const list = await api.get("/vaga/find");
      setVaga(list.data.Vagas);
      dispatch({ type: "update", payload: false });
    };
    onScreenLoad();
  }, [state.update]);

  // const handleClick = () => {
  //   navigation.navigate("Vaga", {
  //     id: data.id,
  //     nome: data.name,
  //     endereco: data.address,
  //     descricao: data.description,
  //     tipo: data.type,
  //   });
  // };
  const viewVaga = async (item) => {
    await dispatch({ type: "setVaga", payload: item });
    navigation.navigate("Vaga", {
      id: item.id,
      nome: item.name,
      endereco: item.address,
      descricao: item.description,
      tipo: item.type,
    });
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
                <VerPerfilBotaoText>Ver Perfil</VerPerfilBotaoText>
              </VerPerfilBotao>
            </InfoArea>
          </Area>
        );
      }}
      keyExtractor={(item) => item.id}
    />
  );
};
