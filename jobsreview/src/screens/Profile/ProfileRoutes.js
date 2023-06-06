import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Habilidade from "../Habilidade";
import Profile from "./index";
import Pesquisa from "../Pesquisa";
import TimeLine from "../TimeLine/TimeLineRoutes";

const Stack = createNativeStackNavigator();

const ProfileRoutes = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainProfile" component={Profile} />
      <Stack.Screen name="Habilidade" component={Habilidade} />
      <Stack.Screen name="Pesquisa" component={Pesquisa} />
      <Stack.Screen name="MainTimeLine" component={TimeLine} />
    </Stack.Navigator>
  );
};

export default ProfileRoutes;
