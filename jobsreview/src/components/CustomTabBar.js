import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Context } from "../context/dataContext";

const TabArea = styled.View`
  height: 60px;
  background-color: #4eadbe;
  flex-direction: row;
`;
const TabItem = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const TabItemCenter = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 35px;
  border: 3px solid #4eadbe;
  margin-top: -20px;
`;
const AvatarIcon = styled.Image`
  width: 24px;
  height: 24px;
  border-radius: 12px;
`;

export default ({ state, navigation, showCustomTabBar }) => {
  const { state: user } = useContext(Context);
  const { dispatch } = useContext(Context);

  const goTo = (screenName) => {
    navigation.navigate(screenName);
  };
  const currentRoute = state.routes[state.index];
  const routeName = currentRoute.state
    ? currentRoute.state.routeNames[currentRoute.state.index]
    : currentRoute.name;

  const isRecruiter = user.typeLogin;

  if (
    routeName === "Vaga" ||
    routeName === "Habilidade" ||
    routeName === "Candidato" ||
    routeName === "NewVaga" ||
    routeName === "Aplicacao" ||
    routeName === "VagasAplicada"
  ) {
    return null;
  }
  return (
    <TabArea>
      {isRecruiter ? (
        <>
          <TabItem onPress={() => goTo("HomeRecruter")}>
            <AntDesign
              style={{ opacity: state.index === 0 ? 1 : 0.5 }}
              name="home"
              size={24}
              color="#FFFFFF"
            />
          </TabItem>
          <TabItem onPress={() => goTo("Vagas")}>
            <AntDesign
              style={{ opacity: state.index === 1 ? 1 : 0.5 }}
              name="search1"
              size={24}
              color="#FFFFFF"
            />
          </TabItem>
          <TabItem onPress={() => goTo("Perfil")}>
            <AntDesign
              style={{ opacity: state.index === 2 ? 1 : 0.5 }}
              name="user"
              size={24}
              color="#FFFFFF"
            />
          </TabItem>
        </>
      ) : (
        <>
          <TabItem onPress={() => goTo("TimeLine")}>
            <AntDesign
              style={{ opacity: state.index === 0 ? 1 : 0.5 }}
              name="home"
              size={24}
              color="#FFFFFF"
            />
          </TabItem>
          <TabItem onPress={() => goTo("Pesquisa")}>
            <AntDesign
              style={{ opacity: state.index === 1 ? 1 : 0.5 }}
              name="search1"
              size={24}
              color="#FFFFFF"
            />
          </TabItem>
          <TabItem onPress={() => goTo("Profile")}>
            <AntDesign
              style={{ opacity: state.index === 2 ? 1 : 0.5 }}
              name="user"
              size={24}
              color="#FFFFFF"
            />
          </TabItem>
        </>
      )}
    </TabArea>
  );
};
