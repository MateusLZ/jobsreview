import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Vaga from "../Vaga";
import Routes from "../Routes";
import TimeLine from "./index";
import Pesquisa from "../Pesquisa";
import Perfil from "../Profile";

const Stack = createNativeStackNavigator();

function TimeLineRoutes({ navigation }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTimeLine" component={TimeLine} />
      <Stack.Screen name="Vaga" component={Vaga} />
    </Stack.Navigator>
  );
}

export default TimeLineRoutes;
