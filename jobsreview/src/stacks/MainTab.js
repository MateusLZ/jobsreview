import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomTabBar from "../components/CustomTabBar";

import Pesquisa from "../screens/Pesquisa";
import TimeLine from "../screens/TimeLine";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
    tabBar={(props) => <CustomTabBar {...props} />}
  >
    <Tab.Screen name="TimeLine" component={TimeLine} />
    <Tab.Screen name="Pesquisa" component={Pesquisa} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);
