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
import { AntDesign, Ionicons } from "@expo/vector-icons";
import api from "../../api";
import CandidatoModal from "../Candidato";

const Aplicacao = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { dispatch } = useContext(Context);

  const getCand = async () => {
    setLoading(true);
    const idVaga = route.params.vagaInfo.id;
    try {
      const res = await api.get(`/candidatura/aplicacao/${idVaga}/users`);
      const candidaturas = res.data;

      const usersPromises = candidaturas.map(async (candidatura) => {
        const res = await api.get(`/user/findByUser?id=${candidatura.idUser}`);
        return res.data.user;
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

  const openModal = (item) => {
    setSelectedItem(item);
    setVisibleModal(true);
  };

  return (
    <Container>
      <Scroller
        RefreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <HeaderArea>
          <HeaderTitle numberOfLines={2}>Candidatos aplicados</HeaderTitle>
        </HeaderArea>

        {loading && <LoadingIcon size="large" color="#FFF" />}

        <ListArea>
          <FlatList
            data={list}
            renderItem={({ item }) => {
              return (
                <Area onPress={() => openModal(item)}>
                  <Icon>
                    <AntDesign name="iconfontdesktop" size={50} color="black" />
                  </Icon>
                  <InfoArea>
                    <UserName>{item.name}</UserName>

                    <Tipo>{item.description}</Tipo>

                    <VerPerfilBotao>
                      <VerPerfilBotaoText>Ver Perfil</VerPerfilBotaoText>
                    </VerPerfilBotao>
                  </InfoArea>
                </Area>
              );
            }}
            keyExtractor={(item) => item.id}
          />
          <JanelaModal
            visible={visibleModal}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setVisibleModal(false)}
          >
            <CandidatoModal
              handleClose={() => setVisibleModal(false)}
              route={selectedItem}
            />
          </JanelaModal>
        </ListArea>
      </Scroller>

      <BackButton onPress={handleBackButton}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </BackButton>
    </Container>
  );
};

export default Aplicacao;
