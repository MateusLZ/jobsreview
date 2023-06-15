import React, { useState, useContext, useEffect } from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import styled from "styled-components/native";
import api from "../api";
import { Context } from "../context/dataContext";
import { Button, TouchableOpacity } from "react-native";

export function ActionModal({ handleClose, user }) {
  const { state, dispatch } = useContext(Context);

  const [novoNome, setNovoNome] = useState(user.name);
  const [novoEmail, setNovoEmail] = useState(user.email);
  const [novaDescricao, setNovaDescricao] = useState(user.description || "");
  const [showMessage, setShowMessage] = useState(false);

  const atualizarPerfil = async () => {
    try {
      const response = await api.post("user/editar", {
        name: novoNome,
        email: novoEmail,
        description: novaDescricao,
        id: state.idUser,
      });
      if (response.status === 200) {
        const data = response.data;
        dispatch({ type: "update", payload: true });
        handleClose();
        // Realizar outras ações após a atualização do perfil
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
      <AreaConteudo>
        <AreaSuperiorPerfil>
          <IconClose>
            <AntDesign
              onPress={handleClose}
              name="close"
              size={30}
              color="white"
            />
          </IconClose>
          <AreaText>
            <TextPerfil>Editar Perfil</TextPerfil>
          </AreaText>
          <IconConfirme>
            <AntDesign
              name="check"
              size={30}
              color="#63c2d1"
              onPress={atualizarPerfil}
            />
          </IconConfirme>
        </AreaSuperiorPerfil>

        <AreaFotoPerfil>
          <FotoPerfil />
          <TouchableOpacity>
            <TextEditarFoto>Editar Foto</TextEditarFoto>
          </TouchableOpacity>
        </AreaFotoPerfil>

        <AreaInputsPerfil>
          <InputAreaName>
            <TextAreaInput>Nome</TextAreaInput>
            <InputName
              value={novoNome}
              onChangeText={(text) => setNovoNome(text)}
            />
          </InputAreaName>
          <InputAreaEmail>
            <TextAreaInput>Email</TextAreaInput>
            <InputName
              value={novoEmail}
              onChangeText={(text) => setNovoEmail(text)}
            />
          </InputAreaEmail>
          <InputAreaBio>
            <TextAreaInput>Bio</TextAreaInput>
            <InputName
              value={novaDescricao}
              onChangeText={(text) => setNovaDescricao(text)}
            />
          </InputAreaBio>
          {showMessage && <ErroMensagem>Email já existente</ErroMensagem>}
        </AreaInputsPerfil>
      </AreaConteudo>
      <AreaSair onPress={handleClose}></AreaSair>
    </Container>
  );
}
export const ErroMensagem = styled.Text`
  margin-top: 20px;
  font-weight: 700;
  font-size: 15px;
  color: #fff;
`;

const InputAreaEmail = styled.View`
  margin-top: 15px;
  width: 100%;
  flex-direction: column;
  border-bottom-width: 1px;
  border-color: #ffffff;
`;

const InputAreaBio = styled.View`
  margin-top: 15px;
  width: 100%;
  flex-direction: column;
  border-bottom-width: 1px;
  border-color: #ffffff;
`;
const InputAreaName = styled.View`
  width: 100%;
  flex-direction: column;
  border-bottom-width: 1px;
  border-color: #ffffff;
`;
const TextAreaInput = styled.Text`
  color: #cccccc;
  font-size: 12px;
`;
const InputName = styled.TextInput`
  flex: 1;
  font-size: 20px;
  margin-bottom: 5px;
  color: #ffffff;
  font-family: "Helvetica, sans-serif";
`;
const AreaInputsPerfil = styled.View`
  margin-right: 30px;
  margin-left: 30px;
  margin-top: 20px;
  flex: 1;
`;
const TextEditarFoto = styled.Text`
  font-size: 13px;
  font-weight: 500;
  color: #ffffff;
  margin-top: 10px;
`;
const AreaFotoPerfil = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const FotoPerfil = styled.Image`
  margin-top: 30px;
  width: 80px;
  height: 80px;
  border-radius: 20px;
  border-width: 1px;
  border-color: black;
  background-color: #ffffff;
`;
const IconConfirme = styled.View`
  width: 50%;
  justify-content: flex-end;
  align-items: flex-end;
`;
const TextPerfil = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
`;
const AreaText = styled.View`
  width: 40%;
`;
const IconClose = styled.View`
  width: 10%;
`;
const AreaSuperiorPerfil = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: 5px;
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
