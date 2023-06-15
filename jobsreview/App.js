import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Context, Provider } from "./src/context/dataContext";

import Routes from "./src/screens/Routes";
import Preload from "./src/screens/PreLoad";
import Login from "./src/screens/Login";
import RegisterUser from "./src/screens/RegisterUser";

const Stack = createStackNavigator();

const App = () => {
  const { state } = useContext(Context);

  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};

export default () => {
  return (
    <Provider>
      <SafeAreaProvider>
        <App />
      </SafeAreaProvider>
    </Provider>
  );
};
