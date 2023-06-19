import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Vaga from "../Vaga";
import TimeLine from "./index";
import Aplicacao from "../../screensRecr/Aplicacao";

const Stack = createNativeStackNavigator();

function TimeLineRoutes({ navigation }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTimeLine" component={TimeLine} />
      <Stack.Screen name="Vaga" component={Vaga} />
      <Stack.Screen name="Aplicacao" component={Aplicacao} />
    </Stack.Navigator>
  );
}

export default TimeLineRoutes;
