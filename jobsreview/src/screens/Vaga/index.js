import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
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
  SoftSkills,
  SoftName,
  SoftNivel,
  HardSkills,
  HardName,
  HardNivel,
  DescriptionTitle,
  DescriptionText,
  AplicationArea,
  CustomButton,
  CustomButtonText,
} from "./styles";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const Vaga = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [vagaInfo, setvagaInfo] = useState("");

  useEffect(() => {
    const getVagaInfo = async () => {
      setLoading(true);
      const vaga = route.params.id;
      if (vaga.id != "") {
        setvagaInfo(route.params);
      } else {
        alert("Erro");
      }
      setLoading(false);
    };
    getVagaInfo();
  }, []);

  const handleBackButton = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <Scroller>
        <Header></Header>
        <PageBody>
          <VagaInfoArea>
            <VagaIcon />
            <VagaInfor>
              <VagaName>{vagaInfo.name}</VagaName>
              <VagaType>{vagaInfo.type}</VagaType>
            </VagaInfor>
            <VagaFavButton>
              <MaterialIcons name="favorite-border" size={24} color="red" />
            </VagaFavButton>
          </VagaInfoArea>
          {loading && <LoadingIcon size="large" color="#000000" />}
          <InfoSkillArea>
            <AbilityTitle>Requesitos</AbilityTitle>
            <AbilitySkills>
              <SoftSkills>
                <SoftName>Liderença</SoftName>
                <SoftNivel>5</SoftNivel>
              </SoftSkills>
              <HardSkills>
                <HardName>React</HardName>
                <HardNivel>5</HardNivel>
              </HardSkills>
            </AbilitySkills>
          </InfoSkillArea>

          <DescriptionArea>
            <DescriptionTitle>Descrição da vaga</DescriptionTitle>
            <DescriptionText>{vagaInfo.description}</DescriptionText>
          </DescriptionArea>

          <AplicationArea>
            <CustomButton>
              <CustomButtonText>Aplicar</CustomButtonText>
            </CustomButton>
            <CustomButton
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid",
                borderColor: "#2658ab",
              }}
            >
              <CustomButtonText style={{ color: "#2658ab" }}>
                Candidatos
              </CustomButtonText>
            </CustomButton>
          </AplicationArea>
        </PageBody>
      </Scroller>
      <BackButton onPress={handleBackButton}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </BackButton>
    </Container>
  );
};

export default Vaga;
