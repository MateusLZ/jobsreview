import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Context, Provider } from "./src/context/dataContext";
import MainStack from "./src/stacks/MainStack";

const App = () => {
  const { state } = useContext(Context);

  return (
    <NavigationContainer>
      <MainStack />
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
