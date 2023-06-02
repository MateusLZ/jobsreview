import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Container, BackButton } from "./styles";
import { AntDesign } from "@expo/vector-icons";

const Vaga = ({ route, navigation }) => {
  const vaga = route.params;

  const handleBackButton = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <View>
        <Text>{vaga.nome}</Text>
        <Text>{vaga.endereco}</Text>
        <Text>{vaga.descricao}</Text>
        <Text>{vaga.tipo}</Text>
      </View>
      <BackButton onPress={handleBackButton}>
        <AntDesign name="back" size={24} color="black" />
      </BackButton>
    </Container>
  );
};

export default Vaga;
