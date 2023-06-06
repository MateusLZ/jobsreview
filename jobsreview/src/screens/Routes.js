import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomTabBar from "../components/CustomTabBar";

import Pesquisa from "./Pesquisa";
import TimeLineRoutes from "./TimeLine/TimeLineRoutes";
import Profile from "./Profile";

const Tab = createBottomTabNavigator();

const Routes = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="TimeLine" component={TimeLineRoutes} />
      <Tab.Screen name="Pesquisa" component={Pesquisa} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Routes;
