import { FlatList } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../context/dataContext";
import { ActionModal } from "../../components/ActionModal";

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
  DescriptionArea,
  DescriptionTitle,
  DescriptionText,
  HabilidadeArea,
  HabilidadeTitle,
  AdicionarHabilidade,
  HeaderHabilidadeArea,
  Area,
  ListArea,
  InfoArea,
  UserName,
  LoadingIcon,
  JanelaModal,
  BackButton,
} from "./styled";
import { AntDesign, Entypo } from "@expo/vector-icons";
import api from "../../api";
import StarComponent from "../../components/StarComponent";

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
        const response = await api.get("/user/findByUser", {
          params: {
            id: state.idUser,
          },
        });
        const userData = response.data.user;
        setUser(userData);
        setLoading(false);

        dispatch({ type: "update", payload: false });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchUserSkills = async () => {
      try {
        const response = await api.get(`/userskill/user/${state.idUser}`);
        const userSkills = response.data.userSkills;
        setList(userSkills);
      } catch (error) {
        console.error("Error fetching user skills:", error);
      }
    };
    onScreenLoad();
    fetchUserSkills();
  }, [state.update]);

  const newAbility = async () => {
    navigation.navigate("Habilidade");
  };
  const minhasVagas = async () => {
    navigation.navigate("VagasAplicada");
  };

  const editAbility = async (item) => {
    navigation.navigate("Habilidade", item);
  };

  return (
    <Container>
      <Scroller>
        <Header>
          <FotoPerfil>
            <Entypo name="user" size={45} color="black" />
          </FotoPerfil>
          <HeaderInfo>
            <NomeUser>{user.name}</NomeUser>
            <CustomButtonText>{user.tag}</CustomButtonText>
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
              <CustomButton
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid",
                  borderColor: "#2658ab",
                }}
              >
                <CustomButtonText
                  onPress={() => minhasVagas()}
                  style={{ color: "#2658ab" }}
                >
                  Minhas Vagas
                </CustomButtonText>
              </CustomButton>
            </AplicationArea>
          </HeaderInfo>
        </Header>
        <PageBody>
          {loading && <LoadingIcon size="large" color="#000000" />}

          <DescriptionArea>
            <DescriptionTitle>Sobre</DescriptionTitle>
            <DescriptionText>{user.description}</DescriptionText>
          </DescriptionArea>
          <HabilidadeArea>
            <HeaderHabilidadeArea>
              <HabilidadeTitle>Habilidades</HabilidadeTitle>
              <AdicionarHabilidade onPress={() => newAbility()}>
                <AntDesign name="pluscircleo" size={24} color="black" />
              </AdicionarHabilidade>
            </HeaderHabilidadeArea>

            <ListArea>
              <FlatList
                data={list}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                renderItem={({ item }) => {
                  return (
                    <Area onPress={() => editAbility(item)}>
                      <InfoArea>
                        <UserName>{item.skill.name}</UserName>

                        <StarComponent stars={item.stars} />
                      </InfoArea>
                    </Area>
                  );
                }}
                keyExtractor={(item) => item.id}
              />
            </ListArea>
          </HabilidadeArea>
        </PageBody>
      </Scroller>

      <BackButton onPress={() => dispatch({ type: "logOut" })}>
        <Entypo name="log-out" size={24} color="black" />
      </BackButton>
    </Container>
  );
};

export default Profile;
