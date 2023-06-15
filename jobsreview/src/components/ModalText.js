import React, { useState, useContext, useEffect } from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import styled from "styled-components/native";
import api from "../api";
import { Context } from "../context/dataContext";

const Input = styled.TextInput`
  flex: 1;
  font-size: 22px;
  width: 100%;
  color: #ffffff;
  background-color: #000000;
`;

export function ModalInput({ value, onChangeText }) {
  return (
    <Input
      autoFocus={true}
      multiline={true}
      numberOfLines={20}
      value={value}
      onChangeText={onChangeText}
    />
  );
}

export function ModalText({
  handleClose,
  setValue,
  initialValue,
  selectedField,
}) {
  const { state, dispatch } = useContext(Context);
  const [modalTextValues, setModalTextValues] = useState(initialValue);

  const handleInputChange = (text) => {
    setModalTextValues((prevValues) => ({
      ...prevValues,
      [selectedField]: text,
    }));
  };

  useEffect(() => {
    setModalTextValues(initialValue);
  }, [initialValue]);

  const handleSave = () => {
    setValue(modalTextValues);
    handleClose();
  };

  return (
    <Container>
      <AreaConteudo>
        <AreaSuperiorPerfil>
          <AreaText>
            <TextPerfil onPress={handleSave}>Salvar</TextPerfil>
          </AreaText>
          <IconConfirme>
            <HeaderIcon
              onPress={handleClose}
              name="close"
              size={30}
              color="#ffffff"
            />
          </IconConfirme>
        </AreaSuperiorPerfil>
        <ModalInput
          value={modalTextValues[selectedField]}
          onChangeText={handleInputChange}
        />
      </AreaConteudo>
      <AreaSair onPress={handleClose}></AreaSair>
    </Container>
  );
}

const HeaderIcon = styled(AntDesign)`
  margin-right: 10px;
  margin-top: 2px;
`;

export const ErroMensagem = styled.Text`
  margin-top: 20px;
  font-weight: 700;
  font-size: 15px;
  color: #fff;
`;

const IconConfirme = styled.View`
  width: 50%;
  align-items: flex-end;
  margin-right: 20px;
`;
const TextPerfil = styled.Text`
  margin-left: 20px;
  font-size: 25px;
  font-weight: bold;
  color: #ffffff;
`;
const AreaText = styled.View`
  width: 50%;
`;

const AreaSuperiorPerfil = styled.View`
  width: 100%;
  background-color: #0f0f0f;
  height: 40px;
  flex-direction: row;
`;
const AreaConteudo = styled.View`
  flex: 8;
  background-color: #080808;
`;
const AreaSair = styled.TouchableOpacity`
  flex: 2;
  background-color: rgba(0, 0, 0, 0.5);
`;
const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-end;
`;
