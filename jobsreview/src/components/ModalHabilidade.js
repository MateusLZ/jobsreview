import React, { useState, useContext, useEffect } from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import styled from "styled-components/native";

export function ModalHabilidade({ handleClose }) {
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
      </AreaSuperiorPerfil>

      <AreaSair onPress={handleClose}></AreaSair>
    </Container>
  );
}

const HeaderInfo = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

const HeaderStats = styled.View`
  align-items: center;
  flex-direction: row;
  margin-bottom: 7px;
  justify-content: space-around;
`;

const Star = styled.View`
  flex-direction: row;
  width: 120px;
  justify-content: end;
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
