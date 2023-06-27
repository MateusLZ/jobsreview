import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { FlatList } from "react-native";
import {
  Container,
  BackButton,
  Scroller,
  Header,
  PageBody,
  VagaInfoArea,
  InfoSkillArea,
  DescriptionArea,
  VagaInfor,
  VagaIcon,
  VagaName,
  VagaType,
  VagaFavButton,
  LoadingIcon,
  AbilityTitle,
  AbilitySkills,
  Area,
  InfoArea,
  UserName,
  DescriptionTitle,
  DescriptionText,
  AplicationArea,
} from "./styles";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";
import api from "../../api";
import StarComponent from "../../components/StarComponent";
import { Context } from "../../context/dataContext";

const Candidato = ({ route, navigation, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [candInfo, setCandInfo] = useState("");
  const [list, setList] = useState([]);
  const [typeLogin, setType] = useState(false);
  const { state, dispatch } = useContext(Context);
  const [idCand, setId] = useState("");
  useEffect(() => {
    const getCandInfo = async () => {
      setType(state.typeLogin);
      setLoading(true);
      const cand = route.id;
      if (cand.id != "") {
        setCandInfo(route);
        setId(cand);
      } else {
        alert("Erro");
      }
      setLoading(false);
    };
    const fetchUserSkills = async () => {
      try {
        const response = await api.get(`/userskill/user/${route.id}`);
        const userSkills = response.data.userSkills;

        setList(userSkills);
      } catch (error) {
        console.error("Error fetching user skills:", error);
      }
    };
    getCandInfo();
    fetchUserSkills();
  }, []);

  const handleBackButton = () => {
    handleClose();
  };

  return (
    <Container>
      <Scroller>
        <Header></Header>
        <PageBody>
          <VagaInfoArea>
            <VagaIcon>
              <Entypo name="user" size={65} color="black" />
            </VagaIcon>
            <VagaInfor>
              {typeLogin || candInfo.id === state.idUser ? (
                <>
                  <VagaName>{candInfo.name}</VagaName>
                  <VagaType>{candInfo.tag}</VagaType>
                </>
              ) : (
                <>
                  <VagaName>Candidato</VagaName>
                  <VagaType>{candInfo.tag}</VagaType>
                </>
              )}
            </VagaInfor>
            <VagaFavButton>
              <MaterialIcons name="favorite-border" size={24} color="red" />
            </VagaFavButton>
          </VagaInfoArea>
          {loading && <LoadingIcon si ze="large" color="#000000" />}
          <InfoSkillArea>
            <AbilityTitle>Skills</AbilityTitle>
            <AbilitySkills>
              <FlatList
                data={list}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                renderItem={({ item }) => {
                  return (
                    <Area>
                      <InfoArea>
                        <UserName>{item.skill.name}</UserName>

                        <StarComponent stars={item.stars} />
                      </InfoArea>
                    </Area>
                  );
                }}
                keyExtractor={(item) => item.id}
              />
            </AbilitySkills>
          </InfoSkillArea>

          <DescriptionArea>
            {typeLogin || candInfo.id === state.idUser ? (
              <>
                <DescriptionTitle>Sobre</DescriptionTitle>
                <DescriptionText>{candInfo.description}</DescriptionText>
              </>
            ) : (
              <>
                <DescriptionTitle>Sobre</DescriptionTitle>
                <DescriptionText>{}</DescriptionText>
              </>
            )}
          </DescriptionArea>

          <AplicationArea onPress={handleClose}></AplicationArea>
        </PageBody>
      </Scroller>
      <BackButton onPress={handleBackButton}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </BackButton>
    </Container>
  );
};

export default Candidato;
