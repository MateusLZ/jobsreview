import React, { useContext } from "react";
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

export default ({ state, navigation }) => {
  const { state: user } = useContext(Context);
  const { dispatch } = useContext(Context);
  const goTo = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <TabArea>
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
      {/* <TabItem onPress={() => dispatch({ type: "logOut" })}>
        <MaterialIcons
          style={{ opacity: state.index === 3 ? 1 : 0.5 }}
          name="exit-to-app"
          size={24}
          color="#FFFFFF"
        />
      </TabItem> */}
    </TabArea>
  );
};
