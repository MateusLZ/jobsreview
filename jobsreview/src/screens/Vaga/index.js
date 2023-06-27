import React, { useContext, useEffect, useState, useCallback } from "react";
import { View, FlatList, Modal } from "react-native";
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
  CustomButton,
  CustomButtonText,
  EmpresaArea,
  LocalizacaoArea,
  EmpresaTitle,
  LocalizacaoTitle,
  SobreArea,
  SubDescriptionTitle,
  VagaStatsText,
  VagaStatsText2,
} from "./styles";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import api from "../../api";
import StarComponent from "../../components/StarComponent";
import { Context } from "../../context/dataContext";
import { ModalStatus } from "../../components/ModalStatus.js";

const Vaga = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [vagaInfo, setvagaInfo] = useState("");
  const [list, setList] = useState([]);
  const { state, dispatch } = useContext(Context);
  const [hasApplied, setHasApplied] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getVagaSkills = async () => {
    setLoading(true);
    const vagaId = route.params.id;
    try {
      const response = await api.get(`/vagaskill/${vagaId}/habilidades`);
      const vagaSkills = response.data.vagaSkills;
      setList(vagaSkills);
    } catch (error) {
      console.error("Erro ao buscar habilidades da vaga:", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    const getVagaInfo = async () => {
      setLoading(true);
      const vaga = route.params.id;
      if (vaga.id !== "") {
        setvagaInfo(route.params);

        getVagaSkills(); // Chame a função para buscar as habilidades da vaga
        dispatch({ type: "update", payload: false });
      } else {
        alert("Erro");
      }
      setLoading(false);
      if (!state.typeLogin) {
        await checkIfApplied();
      }
    };
    getVagaInfo();
  }, [handleApplyVaga, state.update]);
  const handleBackButton = () => {
    dispatch({ type: "update", payload: true });

    navigation.goBack();
  };

  const checkIfApplied = async () => {
    try {
      const vagaId = route.params.id;
      const response = await api.get(`/candidatura/${vagaId}/${state.idUser}`);
      const candidatura = response.data;
      if (candidatura) {
        setHasApplied(true);
      }
      if (candidatura.success === false) {
        setHasApplied(false);
      }
    } catch (error) {
      console.error("Erro ao verificar candidatura:", error);
    }
  };

  const handleEditVaga = async () => {
    try {
      const response = await api.delete(`/vaga/${vagaInfo.id}`); // Substitua a URL pela rota correta do seu servidor
      console.log(response.data); // Exibe a resposta da exclusão
      dispatch({ type: "update", payload: true });

      navigation.goBack();
    } catch (error) {
      console.error("Erro ao excluir a vaga:", error);
      // Trate o erro de acordo com sua lógica de tratamento de erros
    }
  };

  const aplicationArea = async () => {
    navigation.navigate("Aplicacao", { vagaInfo: vagaInfo });
  };
  const handleApplyVaga = useCallback(async () => {
    const userId = state.idUser;
    const vagaId = vagaInfo.id;

    try {
      const response = await api.post("/candidatura/apply", { userId, vagaId });
      setHasApplied(true);
    } catch (error) {
      console.error("Erro ao se candidatar à vaga:", error);
      // Trate o erro de acordo com sua lógica de tratamento de erros
    }
  }, [state.idUser, vagaInfo.id]);

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const statusVaga = vagaInfo.status;
  const canEditVaga = state.typeLogin && vagaInfo.recrutadorId === state.idUser;
  return (
    <Container>
      <Scroller>
        <Header></Header>
        <PageBody>
          <VagaInfoArea>
            <VagaIcon />
            <VagaInfor>
              <VagaName>{vagaInfo.name}</VagaName>
              <VagaType>{vagaInfo.address}</VagaType>
            </VagaInfor>
            <VagaFavButton
              onPress={canEditVaga ? handleModalOpen : null}
              disabled={!canEditVaga}
            >
              <VagaStatsText>Status</VagaStatsText>
              <VagaStatsText2>
                {statusVaga ? "Aberta" : "Fechada"}
              </VagaStatsText2>
            </VagaFavButton>
          </VagaInfoArea>
          {loading && <LoadingIcon size="large" color="#000000" />}
          <InfoSkillArea>
            <AbilityTitle>Requesitos</AbilityTitle>
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
            <DescriptionTitle>Descrição da vaga</DescriptionTitle>

            <EmpresaArea>
              <SubDescriptionTitle>Empresa</SubDescriptionTitle>
              <EmpresaTitle>{vagaInfo.empresa}</EmpresaTitle>
            </EmpresaArea>

            <LocalizacaoArea>
              <SubDescriptionTitle>Tipo de vaga</SubDescriptionTitle>
              <LocalizacaoTitle>{vagaInfo.type}</LocalizacaoTitle>
            </LocalizacaoArea>

            <SobreArea>
              <SubDescriptionTitle>Sobre</SubDescriptionTitle>
              <DescriptionText>{vagaInfo.description}</DescriptionText>
            </SobreArea>
          </DescriptionArea>

          <AplicationArea>
            <CustomButton
              onPress={canEditVaga ? handleEditVaga : handleApplyVaga}
              disabled={!vagaInfo.status || hasApplied}
              style={
                hasApplied || !vagaInfo.status ? disabledButtonStyle : null
              }
            >
              <CustomButtonText>
                {canEditVaga ? "Excluir" : "Aplicar"}
              </CustomButtonText>
            </CustomButton>
            <CustomButton
              onPress={aplicationArea}
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
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <ModalStatus
            handleClose={() => {
              setIsModalVisible(false);
            }}
            vaga={vagaInfo}
          />
        </Modal>
      </Scroller>
      <BackButton onPress={handleBackButton}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </BackButton>
    </Container>
  );
};

export default Vaga;

const disabledButtonStyle = {
  backgroundColor: "#ccc",
  color: "#666",
  cursor: "not-allowed",
};
