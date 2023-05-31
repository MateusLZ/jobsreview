import React, { useContext } from "react";
import { Context } from "../../context/dataContext";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";

import Perfil from "../Perfil";
import Pesquisa from "../Pesquisa";

const Tab = createBottomTabNavigator();

const Routes = ({ navigation }) => {
  const { state, dispatch } = useContext(Context);
  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => (
          <Entypo
            name="log-out"
            size={20}
            style={{ margin: 10 }}
            color="#000"
            onPress={() => dispatch({ type: "logOut" })}
          />
        ),
      }}
    >
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: () => <Entypo name="bowl" size={30} />,
        }}
      />

      <Tab.Screen
        name="Pesquisa"
        component={Pesquisa}
        options={{
          tabBarIcon: () => <Entypo name="fingerprint" size={30} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Routes;
