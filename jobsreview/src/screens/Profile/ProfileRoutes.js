import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Habilidade from "../Habilidade";
import Profile from "./index";
import VagasAplicadas from "../VagasAplicadas";
import Vaga from "../Vaga";

const Stack = createNativeStackNavigator();

const ProfileRoutes = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainProfile" component={Profile} />
      <Stack.Screen name="Vaga" component={Vaga} />
      <Stack.Screen name="Habilidade" component={Habilidade} />
      <Stack.Screen name="VagasAplicada" component={VagasAplicadas} />
    </Stack.Navigator>
  );
};

export default ProfileRoutes;
