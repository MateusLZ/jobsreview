import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PerfilRecruter from "./index";
import CriarVaga from "../CriarVaga";
import Vaga from "../../screens/Vaga";
import Aplicacao from "../Aplicacao";
const Stack = createNativeStackNavigator();

const PerfilRecruterRoute = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Perfil" component={PerfilRecruter} />
      <Stack.Screen name="NewVaga" component={CriarVaga} />
      <Stack.Screen name="Vaga" component={Vaga} />
      <Stack.Screen name="Aplicacao" component={Aplicacao} />
    </Stack.Navigator>
  );
};

export default PerfilRecruterRoute;
