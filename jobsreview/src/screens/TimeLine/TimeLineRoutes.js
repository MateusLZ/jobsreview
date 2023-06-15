import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Vaga from "../Vaga";
import TimeLine from "./index";

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
