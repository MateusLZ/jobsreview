import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Context } from "../../context/dataContext";
import { Picker } from "@react-native-picker/picker";
import Stars from "react-native-stars";
import {
  Container,
  BackButton,
  Header,
  HeaderInfo,
  HeaderText,
  HeaderStats,
  HeaderIcon,
  Star,
  PageBody,
  BodyTitle,
  PickerView,
  StarView,
  CustomButton,
  CustomButtonText,
  CadastroMensagem,
  CustomButtonExcluir,
} from "./styled";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import api from "../../api";
import { useNavigation } from "@react-navigation/native";

const Habilidade = ({ route }) => {
  const { state, dispatch } = useContext(Context);
  const [availableOptions, setAvailableOptions] = useState([]);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [type, setType] = useState("");
  const [stars, setStars] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    if (route && route.params) {
      // Verifica se route e route.params estão definidos
      EditarHabilidade();
    } else {
      listSkills();
    }
  }, [route]);

  const EditarHabilidade = async () => {
    try {
      const { skill, stars } = route.params; // Obtém as informações da habilidade selecionada
      setType(skill.name); // Define o tipo da habilidade no estado do componente
      setStars(stars); // Define as estrelas no estado do componente
      setIsEditing(false);
      setShowDeleteButton(true);
    } catch (error) {
      console.error(error);
    }
  };
  const onRegisterPressed = async () => {
    try {
      // Fazer a requisição POST para comparar a habilidade
      const response = await api.post("/skill/compare", { nome: type });
      const { id } = response.data;
      // Exemplo de como usar o ID:
      const userSkillResponse = await api.post("/userskill", {
        userId: state.idUser,
        skillId: id,
        stars: stars,
      });
      dispatch({ type: "update", payload: true });
      setShowMessage(true);
      setTimeout(() => {
        handleBackButton();
        setShowMessage(false);
      }, 500);
      setType("");
    } catch (error) {
      console.error(error);
    }
  };

  const listSkills = async () => {
    try {
      const response = await api.get("/skill/find");
      const responsete = await api.get(`/userskill/user/${state.idUser}`);
      const userSkillsUser = responsete.data.userSkills;
      const skills = response.data.Skills; // Acesse a propriedade "Skills" da resposta

      const userSkillIds = userSkillsUser.map((skill) => skill.skillId);
      const availableOptionsFiltered = skills.filter(
        (option) => !userSkillIds.includes(option.id)
      );
      setAvailableOptions(availableOptionsFiltered);
      const nameSkillPicker = availableOptionsFiltered[0].name;
      setType(nameSkillPicker);
    } catch (error) {
      console.error(error);
    }
  };
  const handleBackButton = () => {
    navigation.goBack();
  };

  const onDeletePressed = async () => {
    const idSkill = route.params.id;
    try {
      const response = await api.delete(`/userskill/delete/${idSkill}`);
      console.log(response.data); // Exibe a resposta do servidor (opcional)
      // Faça qualquer ação adicional após a exclusão do item
      dispatch({ type: "update", payload: true });

      setTimeout(() => {
        handleBackButton();
      }, 500);
    } catch (error) {
      console.error(error);
      // Trate o erro de acordo com sua lógica de manipulação de erros
    }
  };

  return (
    <Container>
      <Header>
        <HeaderInfo>
          <HeaderStats>
            <Star>
              <HeaderIcon name="star" size={20} color="yellow" />
            </Star>
            <HeaderText>Iniciante</HeaderText>
          </HeaderStats>
          <HeaderStats>
            <Star>
              <HeaderIcon name="star" size={20} color="yellow" />
              <HeaderIcon name="star" size={20} color="yellow" />
            </Star>
            <HeaderText>Intermediário</HeaderText>
          </HeaderStats>
          <HeaderStats>
            <Star>
              <HeaderIcon name="star" size={20} color="yellow" />
              <HeaderIcon name="star" size={20} color="yellow" />
              <HeaderIcon name="star" size={20} color="yellow" />
            </Star>
            <HeaderText>Avançado</HeaderText>
          </HeaderStats>
          <HeaderStats>
            <Star>
              <HeaderIcon name="star" size={20} color="yellow" />
              <HeaderIcon name="star" size={20} color="yellow" />
              <HeaderIcon name="star" size={20} color="yellow" />
              <HeaderIcon name="star" size={20} color="yellow" />
            </Star>
            <HeaderText>Especialista</HeaderText>
          </HeaderStats>
          <HeaderStats>
            <Star>
              <HeaderIcon name="star" size={20} color="yellow" />
              <HeaderIcon name="star" size={20} color="yellow" />
              <HeaderIcon name="star" size={20} color="yellow" />
              <HeaderIcon name="star" size={20} color="yellow" />
              <HeaderIcon name="star" size={20} color="yellow" />
            </Star>
            <HeaderText>Expert</HeaderText>
          </HeaderStats>
        </HeaderInfo>
      </Header>
      <PageBody>
        <BodyTitle>
          {isEditing ? "Escolha sua habilidade" : "Editar Skill"}
        </BodyTitle>
        <PickerView>
          <Picker
            selectedValue={isEditing ? type : route.params.skill.name}
            style={styles.picker}
            onValueChange={(value) => {
              setType(value);
            }}
            enabled={isEditing}
          >
            {!isEditing && (
              <Picker.Item
                label={route.params.skill.name}
                value={route.params.skill.name}
                key={route.params.skill.id}
              />
            )}
            {availableOptions.map((option) => (
              <Picker.Item
                label={option.name}
                value={option.name}
                key={option.id}
              />
            ))}
          </Picker>
        </PickerView>

        <StarView>
          <Stars
            default={stars}
            update={(val) => {
              setStars(val);
            }}
            count={5}
            half={false}
            starSize={50}
            fullStar={<AntDesign name="star" style={[styles.myStarStyle]} />}
            halfStar={<AntDesign name="star" style={[styles.myStarStyle]} />}
            emptyStar={
              <AntDesign name="staro" style={[styles.myEmptyStarStyle]} />
            }
          />
        </StarView>

        <CustomButton onPress={onRegisterPressed}>
          <CustomButtonText>{isEditing ? "Enviar" : "Editar"}</CustomButtonText>
        </CustomButton>

        {showDeleteButton && (
          <CustomButtonExcluir onPress={onDeletePressed} backgroundColor="red">
            <CustomButtonText style={{ color: "#2658ab" }}>
              Excluir
            </CustomButtonText>
          </CustomButtonExcluir>
        )}
        {showMessage && <CadastroMensagem>Cadastrado</CadastroMensagem>}
      </PageBody>
      <BackButton onPress={handleBackButton}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </BackButton>
    </Container>
  );
};

export default Habilidade;

const styles = StyleSheet.create({
  picker: {
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "lightgray",
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    borderWidth: 0,
    height: 45,
    width: "100%",
  },

  myStarStyle: {
    color: "yellow",
    backgroundColor: "transparent",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    width: 50,
    fontSize: 50,
  },
  myEmptyStarStyle: {
    color: "gray",
    width: 50,
    fontSize: 50,
  },
});
