import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomTabBar from "../components/CustomTabBar";
import { Context } from "../context/dataContext";

import Pesquisa from "./Pesquisa";
import TimeLineRoutes from "./TimeLine/TimeLineRoutes";
import ProfileRoutes from "./Profile/ProfileRoutes";
import HomeRecruterRoutes from "../screensRecr/HomeRecruter/HomeRecruterRoutes";
import PerfilRecruter from "../screensRecr/PerfilRecruter/RotaPerfilRecrutes";

const Tab = createBottomTabNavigator();

function Routes() {
  const { state, dispatch } = useContext(Context);

  const isRecruiter = state.typeLogin;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      {isRecruiter ? (
        <>
          <Tab.Screen name="HomeRecruter" component={HomeRecruterRoutes} />
          <Tab.Screen name="Perfil" component={PerfilRecruter} />
        </>
      ) : (
        <>
          <Tab.Screen name="TimeLine" component={TimeLineRoutes} />
          <Tab.Screen name="Pesquisa" component={Pesquisa} />
          <Tab.Screen name="Profile" component={ProfileRoutes} />
        </>
      )}
    </Tab.Navigator>
  );
}

export default Routes;
