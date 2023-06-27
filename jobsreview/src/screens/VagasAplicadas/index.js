import { FlatList, Platform, RefreshControl } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../context/dataContext";
import {
  Container,
  Scroller,
  HeaderArea,
  HeaderTitle,
  BackButton,
  LoadingIcon,
  ListArea,
  Area,
  Icon,
  InfoArea,
  UserName,
  VerPerfilBotao,
  VerPerfilBotaoText,
  Tipo,
  JanelaModal,
} from "./styles";
import { Entypo, Ionicons } from "@expo/vector-icons";
import api from "../../api";
import CandidatoModal from "../../screensRecr/Candidato";

const VagasAplicadas = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { state, dispatch } = useContext(Context);

  const getCand = async () => {
    setLoading(true);
    const idUser = state.idUser;
    try {
      const res = await api.get(`/candidatura/${idUser}/aplication`);
      const candidaturas = res.data;
      const usersPromises = candidaturas.map(async (candidatura) => {
        const res = await api.get(`/vaga/findByVaga?id=${candidatura.idVaga}`);
        return res.data.vagas;
      });
      const users = await Promise.all(usersPromises);
      setList(users);
    } catch (error) {
      console.log("Error occurred while fetching data:", error);
    }

    setLoading(false);
  };

  const handleBackButton = () => {
    navigation.goBack();
  };
  useEffect(() => {
    getCand();
  }, []);

  const onRefresh = () => {
    setRefreshing(false);
    getCand();
  };

  const viewVaga = async (item) => {
    await dispatch({ type: "setVaga", payload: item });

    navigation.navigate("Vaga", item);
  };

  return (
    <Container>
      <Scroller
        RefreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <HeaderArea>
          <HeaderTitle numberOfLines={2}>Vagas aplicadas</HeaderTitle>
        </HeaderArea>

        {loading && <LoadingIcon size="large" color="#FFF" />}

        <ListArea>
          <FlatList
            data={list}
            renderItem={({ item }) => {
              return (
                <Area onPress={() => viewVaga(item)}>
                  <Icon>
                    <Entypo name="briefcase" size={50} color="black" />
                  </Icon>
                  <InfoArea>
                    <UserName>{item.name}</UserName>

                    <Tipo>{` ${item.type}  |  ${item.address}`}</Tipo>

                    <VerPerfilBotao>
                      <VerPerfilBotaoText>Ver Perfil</VerPerfilBotaoText>
                    </VerPerfilBotao>
                  </InfoArea>
                </Area>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </ListArea>
      </Scroller>

      <BackButton onPress={handleBackButton}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </BackButton>
    </Container>
  );
};

export default VagasAplicadas;
