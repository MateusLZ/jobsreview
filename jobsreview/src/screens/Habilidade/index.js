import { StyleSheet, Text, View } from "react-native";
import { Context } from "../../context/dataContext";
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
} from "./styled";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import api from "../../api";

import React, { useContext, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import Stars from "react-native-stars";

const Pesquisa = ({ navigation }) => {
  const { state, dispatch } = useContext(Context);
  const [type, setType] = useState("");
  const [stars, setStars] = useState("");

  const onRegisterPressed = async () => {
    try {
      // Fazer a requisição POST para comparar a habilidade
      const response = await api.post("/skill/compare", { nome: type });
      const { id } = response.data;

      // Faça o que você deseja com o ID retornado (por exemplo, enviá-lo para a tabela de relacionamento)

      // Exemplo de como usar o ID:
      const userSkillResponse = await api.post("/userskill", {
        userId: state.idUser,
        skillId: id,
        stars: stars,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleBackButton = () => {
    navigation.goBack();
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
        <BodyTitle>Escolha sua habilidade</BodyTitle>
        <PickerView>
          <Picker
            selectedValue={type}
            style={styles.picker}
            onValueChange={setType}
          >
            <Picker.Item label="Proatividade" value="Proatividade" />
            <Picker.Item label="Liderança" value="Liderança" />
            <Picker.Item label="Comunicação" value="Comunicação" />
            <Picker.Item label="ReactJS" value="ReactJS" />
            <Picker.Item label="JavaScript" value="JavaScript" />
            <Picker.Item label="Css" value="Css" />
            <Picker.Item label="Python" value="Python" />
            <Picker.Item label="Html" value="Html" />
            <Picker.Item label="C+" value="C+" />
            <Picker.Item label="TypeScript" value="TypeScript" />
          </Picker>
        </PickerView>

        <StarView>
          <Stars
            default={0}
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
          <CustomButtonText>Enviar</CustomButtonText>
        </CustomButton>
      </PageBody>
      <BackButton onPress={handleBackButton}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </BackButton>
    </Container>
  );
};

export default Pesquisa;

const styles = StyleSheet.create({
  picker: {
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "lightgray",
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: "14px",
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
