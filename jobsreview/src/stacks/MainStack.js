import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Routes from "../screens/Routes";
import Preload from "../screens/Preload";
import Login from "../screens/Login";
import RegisterUser from "../screens/RegisterUser";
import { Context } from "../context/dataContext";

const Stack = createStackNavigator();

const MainStack = () => {
  const { state } = useContext(Context);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {state.Loading ? (
        <Stack.Screen name="Preload" component={Preload} />
      ) : state.isLogged ? (
        <>
          <Stack.Screen name="Preload" component={Preload} />
          <Stack.Screen name="Routes" component={Routes} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="RegisterUser" component={RegisterUser} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainStack;
