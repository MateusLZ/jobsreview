import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Vaga from "../Vaga";
import TimeLine from "./index";
import Pesquisa from "../Pesquisa";
import Perfil from "../Profile";

const Stack = createNativeStackNavigator();

const TimeLineRoutes = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTimeLine" component={TimeLine} />
      <Stack.Screen name="Vaga" component={Vaga} />
      <Stack.Screen name="Pesquisa" component={Pesquisa} />
      <Stack.Screen name="Perfil" component={Perfil} />
    </Stack.Navigator>
  );
};

export default TimeLineRoutes;
