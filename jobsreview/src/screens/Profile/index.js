import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../context/dataContext";
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
  Tipo,
} from "./styled";
import { AntDesign } from "@expo/vector-icons";
import api from "../../api";

const Profile = ({ navigation }) => {
  const { state, dispatch } = useContext(Context);
  const [user, setUser] = useState({});
  const [list, setList] = useState([]);

  const onScreenLoad = async () => {
    try {
      const response = await api.get("/user/findByUser", {
        params: {
          id: state.idUser,
        },
      });
      const userData = response.data.user;
      setUser(userData);

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
  useEffect(() => {
    onScreenLoad();
    fetchUserSkills();
  }, [state.update]);

  const newAbility = async (user) => {
    navigation.navigate("Habilidade", user);
  };

  return (
    <Container>
      <Scroller>
        <Header>
          <FotoPerfil />
          <HeaderInfo>
            <NomeUser>{user.name}</NomeUser>
            <AplicationArea>
              <CustomButton>
                <CustomButtonText>Editar perfil</CustomButtonText>
              </CustomButton>
              <CustomButton
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid",
                  borderColor: "#2658ab",
                }}
              >
                <CustomButtonText style={{ color: "#2658ab" }}>
                  Minhas Vagas
                </CustomButtonText>
              </CustomButton>
            </AplicationArea>
          </HeaderInfo>
        </Header>
        <PageBody>
          <DescriptionArea>
            <DescriptionTitle>Sobre</DescriptionTitle>
            <DescriptionText>{user.description}</DescriptionText>
          </DescriptionArea>
          <HabilidadeArea>
            <HeaderHabilidadeArea>
              <HabilidadeTitle>Habilidades</HabilidadeTitle>
              <AdicionarHabilidade onPress={() => newAbility(user)}>
                <AntDesign name="pluscircleo" size={24} color="black" />
              </AdicionarHabilidade>
            </HeaderHabilidadeArea>

            <ListArea>
              <FlatList
                data={list}
                renderItem={({ item }) => {
                  return (
                    <Area onPress={() => viewVaga(item)}>
                      <InfoArea>
                        <UserName>{item.skill.name}</UserName>

                        <Tipo>{item.stars}</Tipo>
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
    </Container>
  );
};

export default Profile;
