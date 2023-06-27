import { StyleSheet, Text, View, FlatList, Modal } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../context/dataContext";
import { ActionModal } from "../../components/ActionModal";
import { format } from "date-fns";

import {
  Container,
  Scroller,
  Header,
  PageBody,
  FotoPerfil,
  HeaderInfo,
  NomeUser,
  AplicationArea,
  CustomButton,
  CustomButtonText,
  HabilidadeArea,
  HabilidadeTitle,
  AdicionarVaga,
  HeaderHabilidadeArea,
  ListArea,
  InfoArea,
  UserName,
  LoadingIcon,
  JanelaModal,
  Tipo,
  TopList,
  NomeVaga,
  DataCriado,
  StatusVaga,
  AreaFlatlist,
  Status,
  NameArea,
  DataArea,
  StatusArea,
  BackButton,
} from "./styled";
import { AntDesign, Entypo } from "@expo/vector-icons";
import api from "../../api";

const Profile = ({ navigation }) => {
  const { state, dispatch } = useContext(Context);
  const [user, setUser] = useState({});
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  useEffect(() => {
    const onScreenLoad = async () => {
      setLoading(true);
      try {
        const response = await api.get("/recrutador/findByUser", {
          params: {
            id: state.idUser,
          },
        });
        const userData = response.data.recrutador;
        setUser(userData);
        setLoading(false);

        dispatch({ type: "update", payload: false });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getMyVagas();
    onScreenLoad();
    // fetchUserSkills();
  }, [state.update]);

  const newVaga = async () => {
    navigation.navigate("NewVaga");
  };

  const getMyVagas = async () => {
    setLoading(true);

    try {
      const res = await api.get(`/vaga/${state.idUser}`);
      setList(res.data.recrutadorVagas);
    } catch (error) {
      console.log("Error occurred while fetching data:", error);
    }

    setLoading(false);
  };

  const viewVaga = async (item) => {
    await dispatch({ type: "setVaga", payload: item });

    navigation.navigate("Vaga", item);
  };

  return (
    <Container>
      <Scroller>
        <Header>
          <FotoPerfil />
          <HeaderInfo>
            <NomeUser>{user.nome}</NomeUser>
            <AplicationArea>
              <CustomButton onPress={() => setVisibleModal(true)}>
                <CustomButtonText>Editar perfil</CustomButtonText>
              </CustomButton>

              <JanelaModal
                visible={visibleModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setVisibleModal(false)}
              >
                <ActionModal
                  handleClose={() => setVisibleModal(false)}
                  user={user}
                />
              </JanelaModal>
            </AplicationArea>
          </HeaderInfo>
        </Header>
        <PageBody>
          {loading && <LoadingIcon size="large" color="#000000" />}

          <HabilidadeArea>
            <HeaderHabilidadeArea>
              <HabilidadeTitle>Vagas Cadastradas</HabilidadeTitle>
              <AdicionarVaga onPress={() => newVaga()}>
                <AntDesign name="pluscircleo" size={24} color="black" />
              </AdicionarVaga>
            </HeaderHabilidadeArea>
          </HabilidadeArea>
          <ListArea>
            <TopList>
              <NameArea>
                <NomeVaga>Nome</NomeVaga>
              </NameArea>
              <DataArea>
                <DataCriado>Data</DataCriado>
              </DataArea>
              <StatusArea>
                <StatusVaga>Status</StatusVaga>
              </StatusArea>
            </TopList>
            <AreaFlatlist>
              <FlatList
                data={list}
                renderItem={({ item }) => {
                  return (
                    <InfoArea onPress={() => viewVaga(item)}>
                      <NameArea>
                        <UserName>{item.name}</UserName>
                      </NameArea>

                      <DataArea>
                        <Tipo>
                          {format(new Date(item.createdAt), "dd/MM/yyyy")}
                        </Tipo>
                      </DataArea>

                      <StatusArea>
                        <Status>{item.status ? "Aberta" : "Fechada"}</Status>
                      </StatusArea>
                    </InfoArea>
                  );
                }}
                keyExtractor={(item) => item.id}
              />
            </AreaFlatlist>
          </ListArea>
        </PageBody>
      </Scroller>
      <BackButton onPress={() => dispatch({ type: "logOut" })}>
        <Entypo name="log-out" size={24} color="black" />
      </BackButton>
    </Container>
  );
};

export default Profile;
