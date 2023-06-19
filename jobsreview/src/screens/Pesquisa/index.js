import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import { Context } from "../../context/dataContext";

import React, { useContext } from "react";

const Pesquisa = ({ navigation }) => {
  const { dispatch } = useContext(Context);

  return (
    <View>
      <TabItem>
        <Text>sair</Text>
      </TabItem>
    </View>
  );
};

export default Pesquisa;

const TabItem = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
