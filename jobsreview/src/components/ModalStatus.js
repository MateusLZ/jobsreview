import React, { useState, useContext, useEffect } from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { StyleSheet, Platform, Modal, FlatList } from "react-native";

import styled from "styled-components/native";
import { Picker } from "@react-native-picker/picker";
import api from "../api";
import { Context } from "../context/dataContext";

export function ModalStatus({ handleClose, vaga }) {
  const [type, setType] = useState(true);
  const { dispatch } = useContext(Context);

  const atualizarStatus = async () => {
    try {
      const response = await api.post("vaga/editar", {
        id: vaga.id,
        status: type,
      });
      if (response.status === 200) {
        const data = response.data;

        dispatch({ type: "update", payload: true });

        handleClose();
      } else {
        throw new Error("Erro ao atualizar o perfil");
      }
    } catch (error) {
      console.log(error);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  return (
    <Container>
      <AreaSair onPress={handleClose}></AreaSair>

      <AreaSuperiorPerfil>
        <IconConfirme>
          <FontAwesome
            name="close"
            size={30}
            color="#ffff"
            onPress={handleClose}
          />
        </IconConfirme>
        <HeaderInfo>
          <HeaderStats>
            <Texto>Status</Texto>
            <Picker
              style={styles.picker}
              selectedValue={type}
              onValueChange={(itemValue) => setType(itemValue)}
            >
              <Picker.Item label="Aberta" value="true" />
              <Picker.Item label="Fechada" value="false" />
            </Picker>
            <CustomButton onPress={atualizarStatus}>
              <CustomButtonText>Enviar</CustomButtonText>
            </CustomButton>
          </HeaderStats>
        </HeaderInfo>
      </AreaSuperiorPerfil>

      <AreaSair onPress={handleClose}></AreaSair>
    </Container>
  );
}

const CustomButton = styled.TouchableOpacity`
  height: 50px;
  width: 150px;
  background-color: #2658ab;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
const CustomButtonText = styled.Text`
  font-weight: 700;
  font-size: 15px;
  color: #fff;
`;
const HeaderInfo = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const HeaderStats = styled.View`
  height: 100%;
  align-items: center;
  flex-direction: column;
  margin-bottom: 7px;
  justify-content: space-evenly;
`;

const Texto = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const HeaderText = styled.Text`
  flex-direction: row;
  font-weight: 700;
  font-size: 15px;
  width: 120px;
`;

const HeaderIcon = styled(AntDesign)`
  margin-right: 5px;
  margin-top: 2px;
`;

export const ErroMensagem = styled.Text`
  margin-top: 20px;
  font-weight: 700;
  font-size: 15px;
  color: #fff;
`;

const IconConfirme = styled.View`
  width: 100%;
  height: 25px;
  align-items: flex-end;
  margin-right: 20px;
`;

const AreaSuperiorPerfil = styled.View`
  background-color: #63c2d1;
  min-height: 200px;
  width: 100%;
  align-items: center;
  border-bottom-color: #cccccc;
  border-bottom-width: 5px;
`;

const AreaSair = styled.TouchableOpacity`
  flex: 2;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-end;
`;

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
    height: 40,
    width: 125,
  },
});
