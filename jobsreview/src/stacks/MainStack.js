import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Preload from "../screens/Preload";
import Login from "../screens/Login";
import RegisterUser from "../screens/RegisterUser";
import Home from "../screens/Home";
import MainTab from "../stacks/MainTab";
import { Context } from "../context/dataContext";

const Stack = createStackNavigator();

const MainStack = () => {
  const { state } = useContext(Context);

  return (
    <Stack.Navigator
      initialRouteName="Preload"
      screenOptions={{
        headerShown: false,
      }}
    >
      {state.Loading ? (
        <Stack.Screen name="Preload" component={Preload} />
      ) : state.isLogged ? (
        <>
          <Stack.Screen name="MainTab" component={MainTab} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="RegisterUser" component={RegisterUser} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainStack;
