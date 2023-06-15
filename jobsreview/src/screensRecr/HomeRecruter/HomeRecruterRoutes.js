import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Candidato from "../Candidato";
import HomeRecruterScreen from "./index";

const Stack = createNativeStackNavigator();

function HomeRecruterRoutes({ navigation }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeRecruter" component={HomeRecruterScreen} />
      <Stack.Screen name="Candidato" component={Candidato} />
    </Stack.Navigator>
  );
}

export default HomeRecruterRoutes;
